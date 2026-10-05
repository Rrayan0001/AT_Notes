import { CHAT_MODEL, RERANK_MODEL, getGroq } from "../src/lib/groq";
import { embedQuery } from "../src/lib/embed";
import { getIndex, retrieveHybrid, toSources } from "../src/lib/retrieve";
import { rerank } from "../src/lib/rerank";
import { SYSTEM_PROMPT, buildUserPrompt } from "../src/lib/prompt";
import { CASES, type EvalCase } from "./cases";
import { loadEnv } from "./env";
import type { RetrievedSource } from "../src/lib/types";

// Scripts run outside Next.js, which is what normally loads .env. This must run
// before getGroq(), which reads the key on first call.
loadEnv();

const groq = getGroq();
const { manifest } = getIndex();

const TOP_K_FETCH = 20;
const TOP_K_CONTEXT = 5;
const TOP_K_RERANK = 12;

interface Metrics {
  contextPrecision: number;
  contextRecall: number;
  answerRelevancy: number;
  faithfulness: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Groq intermittently rejects a generation against a json_schema
 * (`json_validate_failed`) even when the same prompt has worked all run. One
 * such failure would otherwise abort a 44-case run after 20 minutes, so each
 * call is retried a few times before giving up.
 */
async function withRetry<T>(fn: () => Promise<T>, label: string, attempts = 4): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const detail = err instanceof Error ? err.message.split("\n")[0] : String(err);
      if (attempt >= attempts) throw err;
      console.warn(`  ${label} failed (${detail.slice(0, 90)}), retry ${attempt}/${attempts - 1}`);
      await sleep(1500 * attempt);
    }
  }
}

async function judge(
  schema: Record<string, unknown>,
  system: string,
  user: string
): Promise<Record<string, number>> {
  return withRetry(async () => {
    const completion = await groq.chat.completions.create({
      model: RERANK_MODEL,
      temperature: 0,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "judge", strict: true, schema },
      },
    });
    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as Record<string, number>;
    if (typeof parsed.score !== "number") throw new Error("judge returned no numeric score");
    return parsed;
  }, "judge");
}

const SCORE_SCHEMA = {
  type: "object",
  properties: { score: { type: "number" } },
  required: ["score"],
  additionalProperties: false,
} as const;

async function answer(question: string, sources: RetrievedSource[]): Promise<string> {
  return withRetry(async () => {
    const completion = await groq.chat.completions.create({
      model: CHAT_MODEL,
      temperature: 0,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(question, sources) },
      ],
    });
    return completion.choices[0]?.message?.content ?? "";
  }, "answer");
}

/** Share of retrieved chunks whose page is in the expected set. */
function contextPrecision(sources: RetrievedSource[], c: EvalCase): number {
  if (c.unanswerable) return sources.length === 0 ? 1 : 0;
  const hits = sources.filter((s) => c.expectPages.includes(s.page)).length;
  return sources.length === 0 ? 0 : hits / sources.length;
}

/** Share of expected pages that appear in the retrieved context. */
function contextRecall(sources: RetrievedSource[], c: EvalCase): number {
  if (c.unanswerable) return 1;
  const got = new Set(sources.map((s) => s.page));
  const hits = c.expectPages.filter((p) => got.has(p)).length;
  return c.expectPages.length === 0 ? 1 : hits / c.expectPages.length;
}

async function answerRelevancy(question: string, a: string): Promise<number> {
  const r = await judge(
    SCORE_SCHEMA,
    "Rate how well an answer addresses the question, from 0 (irrelevant) to 10 (directly and completely answers it). Output only the score.",
    `Question: ${question}\n\nAnswer: ${a}`
  );
  return r.score / 10;
}

/** Fraction of answer claims grounded in the provided sources. */
async function faithfulness(a: string, sources: RetrievedSource[]): Promise<number> {
  const ctx = sources.map((s) => `[page ${s.page}]\n${s.text}`).join("\n\n");
  const r = await judge(
    SCORE_SCHEMA,
    "Rate how many of the answer's claims are supported by the source text, from 0 (fully invented) to 10 (every claim traceable to a source). Output only the score.",
    `Source:\n${ctx}\n\nAnswer:\n${a}`
  );
  return r.score / 10;
}

function mean(xs: number[]): number {
  return xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;
}

interface Row {
  question: string;
  expect: number[];
  got: number[];
  m: Metrics;
  termsOk: boolean;
  missing: string[];
  answer: string;
}

interface EvalSelection {
  cases: EvalCase[];
  offset: number;
  verbose: boolean;
  retrievalOnly: boolean;
}

function parseEvalArgs(argv: string[]): EvalSelection {
  let start = 1;
  let limit: number | undefined;
  let verbose = false;
  let retrievalOnly = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--verbose") {
      verbose = true;
    } else if (arg === "--retrieval-only") {
      retrievalOnly = true;
    } else if (arg === "--start" || arg === "--from") {
      const value = Number(argv[++i]);
      if (!Number.isInteger(value) || value < 1) {
        throw new Error("--start requires a positive 1-based case number");
      }
      start = value;
    } else if (arg.startsWith("--start=") || arg.startsWith("--from=")) {
      const value = Number(arg.split("=", 2)[1]);
      if (!Number.isInteger(value) || value < 1) {
        throw new Error("--start requires a positive 1-based case number");
      }
      start = value;
    } else if (arg === "--limit") {
      const value = Number(argv[++i]);
      if (!Number.isInteger(value) || value < 1) {
        throw new Error("--limit requires a positive case count");
      }
      limit = value;
    } else if (arg.startsWith("--limit=")) {
      const value = Number(arg.split("=", 2)[1]);
      if (!Number.isInteger(value) || value < 1) {
        throw new Error("--limit requires a positive case count");
      }
      limit = value;
    } else if (/^\d+$/.test(arg) && limit === undefined && start === 1) {
      // Preserve the historical `npm run eval -- 5` shorthand for the first N cases.
      limit = Number(arg);
    } else {
      throw new Error(`Unknown eval argument: ${arg}`);
    }
  }

  if (start > CASES.length) {
    throw new Error(`--start ${start} is beyond ${CASES.length} cases`);
  }

  const offset = start - 1;
  const selected = limit === undefined ? CASES.slice(offset) : CASES.slice(offset, offset + limit);
  return { cases: selected, offset, verbose, retrievalOnly };
}

async function main() {
  const rows: Row[] = [];
  const { cases, offset, verbose, retrievalOnly } = parseEvalArgs(process.argv.slice(2));

  console.log(`Corpus: ${manifest.count} chunks, built ${manifest.builtAt}`);
  console.log(
    retrievalOnly
      ? `Evaluating ${cases.length} cases (retrieval only, rerank=${RERANK_MODEL})\n`
      : `Evaluating ${cases.length} cases (chat=${CHAT_MODEL}, judge=${RERANK_MODEL})\n`
  );

  for (const [selectedIndex, c] of cases.entries()) {
    const i = offset + selectedIndex;
    const qVec = await embedQuery(c.question);
    const candidates = retrieveHybrid(c.question, qVec, TOP_K_FETCH);
    const ranked = await rerank(c.question, candidates.slice(0, TOP_K_RERANK), TOP_K_CONTEXT);
    const sources: RetrievedSource[] = toSources(ranked);

    if (retrievalOnly) {
      // Retrieval-only mode skips generation and both judge calls, so a full
      // 44-case sweep fits inside a tight daily token quota.
      const m: Metrics = {
        contextPrecision: contextPrecision(sources, c),
        contextRecall: contextRecall(sources, c),
        answerRelevancy: 0,
        faithfulness: 0,
      };
      rows.push({
        question: c.question,
        expect: c.expectPages,
        got: [...new Set(sources.map((s) => s.page))],
        m,
        termsOk: true,
        missing: [],
        answer: "",
      });
      console.log(
        `[${String(i + 1).padStart(2)}/${CASES.length}] ${m.contextRecall >= 0.99 ? "ok  " : "MISS"} ` +
          `p=${m.contextPrecision.toFixed(2)} r=${m.contextRecall.toFixed(2)} ` +
          `expect=[${c.expectPages}] got=[${[...new Set(sources.map((s) => s.page))]}]`
      );
      continue;
    }

    const a = await answer(c.question, sources);
    const missing = (c.expectTerms ?? []).filter(
      (t) => !a.toLowerCase().includes(t.toLowerCase())
    );

    const m: Metrics = {
      contextPrecision: contextPrecision(sources, c),
      contextRecall: contextRecall(sources, c),
      answerRelevancy: await answerRelevancy(c.question, a),
      faithfulness: await faithfulness(a, sources),
    };

    rows.push({
      question: c.question,
      expect: c.expectPages,
      got: [...new Set(sources.map((s) => s.page))],
      m,
      termsOk: missing.length === 0,
      missing,
      answer: a,
    });

    const flag = m.contextRecall >= 0.99 && missing.length === 0 ? "ok  " : "MISS";
    console.log(
      `[${String(i + 1).padStart(2)}/${CASES.length}] ${flag} p=${m.contextPrecision.toFixed(2)} r=${m.contextRecall.toFixed(2)} ` +
        `rel=${m.answerRelevancy.toFixed(2)} fai=${m.faithfulness.toFixed(2)} ` +
        `expect=[${c.expectPages}] got=[${[...new Set(sources.map((s) => s.page))]}] ` +
        `${missing.length ? `missing=${JSON.stringify(missing)}` : ""}`
    );
  }

  const agg = {
    contextPrecision: mean(rows.map((r) => r.m.contextPrecision)),
    contextRecall: mean(rows.map((r) => r.m.contextRecall)),
    answerRelevancy: retrievalOnly ? NaN : mean(rows.map((r) => r.m.answerRelevancy)),
    faithfulness: retrievalOnly ? NaN : mean(rows.map((r) => r.m.faithfulness)),
  };

  console.log("\n" + "=".repeat(64));
  console.log("AGGREGATE");
  for (const [k, v] of Object.entries(agg)) {
    console.log(`  ${k.padEnd(18)} ${Number.isNaN(v) ? "n/a" : `${(v * 100).toFixed(1)}%`}`);
  }
  console.log(`  ${"term coverage".padEnd(18)} ${retrievalOnly ? "n/a" : `${((rows.filter((r) => r.termsOk).length / rows.length) * 100).toFixed(1)}%`}`);
  console.log(`  ${"page hit rate".padEnd(18)} ${((rows.filter((r) => r.m.contextRecall >= 0.99).length / rows.length) * 100).toFixed(1)}%`);
  console.log("=".repeat(64));

  if (verbose) {
    for (const r of rows.filter((x) => !x.termsOk || x.m.contextRecall < 0.99)) {
      console.log(`\n--- ${r.question}`);
      console.log(`    expected pages ${r.expect}, retrieved ${r.got}, missing ${r.missing}`);
      console.log(`    ${r.answer.replace(/\n/g, "\n    ")}`);
    }
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
