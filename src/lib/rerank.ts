import { RERANK_MODEL, getGroq } from "./groq";
import type { ScoredChunk } from "./types";

const RERANK_ATTEMPTS = 2;
/** Output is a short ordered list of ids, so this only guards runaway replies. */
const MAX_TOKENS = 256;
/**
 * Reranking is an ordering improvement, not a correctness requirement, so a slow
 * or failing call is abandoned in favour of retrieval order. This bounds latency
 * regardless of how the SDK's internal retries behave.
 */
const RERANK_BUDGET_MS = 1200;

/** Chunk ids look like `c140`. */
const ID_PATTERN = /\b[a-z]{1,4}\d{2,4}\b/gi;

function listing(candidates: ScoredChunk[]): string {
  return candidates
    .map((c) => `[${c.chunk.id}] page ${c.chunk.page} — ${c.chunk.heading}\n${c.chunk.text}`)
    .join("\n\n---\n\n");
}

/**
 * Pulls the ordered ids out of whatever the model returned.
 *
 * gpt-oss-20b on Groq fails server-side JSON validation most of the time when a
 * `response_format` is supplied (measured: 1/3 and 0/3 successes for strict and
 * non-strict schemas, versus 3/3 unconstrained), so the prompt asks for plain
 * text and the ids are read back positionally. Unknown ids are ignored and any
 * the model skipped are appended afterwards, which keeps the context window at
 * the requested size regardless of how reply.
 */
function extractOrder(raw: string, validIds: Set<string>): string[] {
  const ordered: string[] = [];
  for (const match of raw.matchAll(ID_PATTERN)) {
    const id = match[0];
    if (validIds.has(id) && !ordered.includes(id)) ordered.push(id);
  }
  return ordered;
}

export interface RerankOutcome {
  chunks: ScoredChunk[];
  /** "reranked" when the model replied, "fallback" when retrieval order was kept. */
  outcome: "reranked" | "fallback";
}

/**
 * Second-stage ordering over the hybrid candidates.
 *
 * Returns retrieval order unchanged when the model cannot be reached in time, so
 * a rate-limited Groq account costs a little ranking quality instead of tens of
 * seconds of waiting.
 */
export async function rerank(
  query: string,
  candidates: ScoredChunk[],
  topK = 5
): Promise<ScoredChunk[]> {
  return (await rerankWithStatus(query, candidates, topK)).chunks;
}

export async function rerankWithStatus(
  query: string,
  candidates: ScoredChunk[],
  topK = 5
): Promise<RerankOutcome> {
  const fallback: RerankOutcome = {
    chunks: candidates.slice(0, topK),
    outcome: "fallback",
  };
  if (candidates.length <= topK) return fallback;

  const deadline = Date.now() + RERANK_BUDGET_MS;
  const groq = getGroq();
  const body = listing(candidates);
  const validIds = new Set(candidates.map((c) => c.chunk.id));
  const byId = new Map(candidates.map((c) => [c.chunk.id, c]));

  for (let attempt = 1; attempt <= RERANK_ATTEMPTS; attempt++) {
    if (Date.now() >= deadline) return fallback;

    try {
      const completion = await groq.chat.completions.create({
        model: RERANK_MODEL,
        temperature: 0,
        max_tokens: MAX_TOKENS,
        messages: [
          {
            role: "system",
            content:
              "You order passage ids by how well each passage answers a question about a notebook of IT study notes. " +
              "Reply with the ids only, comma separated, best first. No other text. Judge only the passage text provided.",
          },
          {
            role: "user",
            content: `Question: ${query}\n\nPassages:\n\n${body}\n\nOrder these ids from most to least relevant: ${[...validIds].join(", ")}`,
          },
        ],
      });

      const raw = completion.choices[0]?.message?.content ?? "";
      const ids = extractOrder(raw, validIds);
      if (ids.length === 0) return fallback;

      const ordered = ids.map((id) => byId.get(id)!);
      for (const candidate of candidates) {
        if (ordered.length >= topK) break;
        if (!ordered.includes(candidate)) ordered.push(candidate);
      }

      return { chunks: ordered.slice(0, topK), outcome: "reranked" };
    } catch (err) {
      const detail = err instanceof Error ? err.message.split("\n")[0] : String(err);
      if (Date.now() >= deadline) {
        console.warn(`rerank abandoned after ${RERANK_BUDGET_MS}ms: ${detail.slice(0, 100)}`);
        return fallback;
      }
      if (attempt === RERANK_ATTEMPTS) {
        console.warn(`rerank failed, keeping retrieval order: ${detail.slice(0, 100)}`);
        return fallback;
      }
    }
  }

  return fallback;
}
