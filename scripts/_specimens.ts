import { loadEnv } from "./env";
loadEnv();
import fs from "node:fs";
import { embedQuery } from "@/lib/embed";
import { retrieveHybrid } from "@/lib/retrieve";
import { rerank } from "@/lib/rerank";
import { SYSTEM_PROMPT, buildUserPrompt, buildFallbackPrompt, fallbackSystemPrompt } from "@/lib/prompt";
import { getGroq, CHAT_MODEL } from "@/lib/groq";
import type { RetrievedSource } from "@/lib/types";

const QS = [
  "What is RAG and what are the steps involved?",
  "What are the prompt design strategies like zero shot and few shot?",
  "How does RAGAS evaluate a RAG application?",
  "Who won the FIFA World Cup in 2018 and how many goals did they score?",
];

async function answer(messages: { role: "system" | "user"; content: string }[]) {
  const g = getGroq();
  const r = await g.chat.completions.create({ model: CHAT_MODEL, temperature: 0, messages });
  return r.choices[0]?.message?.content ?? "";
}

async function main() {
  const out: { q: string; sources: RetrievedSource[]; answer: string; general: string | null }[] = [];
  for (const q of QS) {
    const vec = await embedQuery(q);
    const cands = retrieveHybrid("automation", q, vec, 20);
    const ranked = await rerank(q, cands.slice(0, 12), 5);
    const sources = ranked.map((c) => ({
      id: c.chunk.id, page: c.chunk.page, heading: c.chunk.heading, text: c.chunk.text,
      rrfScore: c.rrfScore,
    }));
    const a = await answer([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(q, sources) },
    ]);
    let general: string | null = null;
    if (/that\s+isn[’']?t\s+in\s+these\s+notes/i.test(a)) {
      general = await answer([
        { role: "system", content: fallbackSystemPrompt("the notes") },
        { role: "user", content: buildFallbackPrompt(q, []) },
      ]);
    }
    out.push({ q, sources, answer: a, general });
    console.error("captured:", q, "general:", !!general);
  }
  fs.writeFileSync("/tmp/specimens.json", JSON.stringify(out, null, 1));
  console.log("written");
}
main().catch((e) => { console.error("FAIL", e); process.exit(1); });
