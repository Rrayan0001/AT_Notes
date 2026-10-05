import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { chunkFromDisk } from "../src/lib/chunk";
import type { IndexManifest } from "../src/lib/types";

const outPath = join(process.cwd(), "src", "data", "chunks.json");
const result = chunkFromDisk();

const manifest: IndexManifest = {
  version: 1,
  sourceHash: result.sourceHash,
  embeddingModel: "nomic-embed-text-v1.5",
  dim: 0,
  count: result.chunks.length,
  builtAt: new Date().toISOString(),
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify({ manifest, chunks: result.chunks }, null, 2)}\n`);

console.log(`blocks parsed   : ${result.stats.blocks}`);
console.log(`chunks written  : ${result.chunks.length}`);
console.log(`merged forward  : ${result.stats.merged}`);
console.log(`oversize splits : ${result.stats.split}`);
console.log(
  `words min/avg/max: ${result.stats.minWords} / ${result.stats.avgWords} / ${result.stats.maxWords}`
);
console.log(`\n-> ${outPath}`);

if (process.argv.includes("--inspect")) {
  const limit = Number(process.env.INS_LIMIT ?? 5);
  const start = Number(process.env.INS_START ?? 0);
  for (const c of result.chunks.slice(start, start + limit)) {
    console.log(`\n${"=".repeat(70)}`);
    console.log(`id=${c.id} page=${c.page} heading=${JSON.stringify(c.heading)}`);
    console.log(`path=[${c.sectionPath.join(" > ")}]`);
    console.log(`embedText:\n${c.embedText}`);
  }
}
