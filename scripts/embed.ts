import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { chunkFromDisk } from "../src/lib/chunk";
import { EMBEDDING_MODEL } from "../src/lib/gemini";
import { embedDocuments } from "../src/lib/embed";
import { loadEnv } from "./env";
import type { IndexBundle } from "../src/lib/types";

loadEnv();

const outPath = join(process.cwd(), "src", "data", "index.json");
const { chunks, sourceHash } = chunkFromDisk();

function encode(vectors: number[][]): string {
  const flat = new Float32Array(vectors.length * vectors[0].length);
  vectors.forEach((v, i) => flat.set(v, i * v.length));
  return Buffer.from(flat.buffer).toString("base64");
}

if (existsSync(outPath) && !process.argv.includes("--force")) {
  const existing = JSON.parse(readFileSync(outPath, "utf8")) as IndexBundle;
  const unchanged =
    existing.manifest.sourceHash === sourceHash &&
    existing.manifest.embeddingModel === EMBEDDING_MODEL;
  if (unchanged) {
    console.log(
      `Index up to date (${existing.manifest.count} chunks, built ${existing.manifest.builtAt}). Pass --force to rebuild.`
    );
    process.exit(0);
  }
  console.log("Source or model changed — rebuilding.");
}

async function main() {
  console.log(`Embedding ${chunks.length} chunks with ${EMBEDDING_MODEL} ...`);
  const vectors = await embedDocuments(chunks.map((c) => c.embedText));

  const bundle: IndexBundle = {
    manifest: {
      version: 1,
      sourceHash,
      embeddingModel: EMBEDDING_MODEL,
      dim: vectors[0].length,
      count: chunks.length,
      builtAt: new Date().toISOString(),
    },
    chunks,
    vectorsB64: encode(vectors),
  };

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(bundle));

  const kb = (Buffer.byteLength(JSON.stringify(bundle)) / 1024).toFixed(0);
  console.log(`\nWrote ${chunks.length} chunks x ${vectors[0].length} dims (${kb} KB)`);
  console.log(`-> ${outPath}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
