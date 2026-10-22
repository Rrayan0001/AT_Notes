import { loadEnv } from "./env";
loadEnv();
import { embedQuery } from "@/lib/embed";
import { retrieveHybrid } from "@/lib/retrieve";
import { rerank } from "@/lib/rerank";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompt";
import { getGroq, CHAT_MODEL } from "@/lib/groq";

const Q = process.argv[2] || "What is RAG and what are the steps involved?";
const CHUNK = process.argv[3]; // json of chunk text override

async function main() {
  const vec = await embedQuery(Q);
  const cands = retrieveHybrid("automation", Q, vec, 20);
  const ranked = await rerank(Q, cands.slice(0, 12), 5);
  const sources = ranked.map((c) => ({
    id: c.chunk.id, page: c.chunk.page, heading: c.chunk.heading, text: c.chunk.text,
    rrfScore: c.rrfScore,
  }));
  const groq = getGroq();
  const res = await groq.chat.completions.create({
    model: CHAT_MODEL, temperature: 0,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(Q, sources) },
    ],
  });
  console.log("=== QUESTION ===\n" + Q);
  console.log("=== SOURCES ===\n" + JSON.stringify(sources, null, 1));
  console.log("=== ANSWER ===\n" + res.choices[0]?.message?.content);
}
main().catch((e) => { console.error("FAIL", e); process.exit(1); });
