import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { chunkFromDisk } from "../src/lib/chunk";
import { EMBEDDING_MODEL } from "../src/lib/gemini";
import { embedDocuments } from "../src/lib/embed";
import { loadEnv } from "./env";
import type { IndexBundle } from "../src/lib/types";

loadEnv();

/**
 * One index bundle per domain. The automation bundle keeps its original
 * filename (`index.json`); the newer domains follow the `index-<domain>.json`
 * convention the domain registry promised. Without `--domain`, every domain is
 * checked, and an unchanged source + model short-circuits the build.
 */
const DOMAINS: Record<string, { source: string; out: string }> = {
  automation: {
    source: join(process.cwd(), "data", "Pavan_Notes_Transcription.md"),
    out: join(process.cwd(), "src", "data", "index.json"),
  },
  aws: {
    source: join(process.cwd(), "data", "AWS_Notes_Transcription.md"),
    out: join(process.cwd(), "src", "data", "index-aws.json"),
  },
  azure: {
    source: join(process.cwd(), "data", "Azure_Notes_Transcription.md"),
    out: join(process.cwd(), "src", "data", "index-azure.json"),
  },
};

const domainArg = (() => {
  const i = process.argv.indexOf("--domain");
  const value = i >= 0 ? process.argv[i + 1] : undefined;
  if (value && !DOMAINS[value]) {
    console.error(`unknown domain "${value}". Known: ${Object.keys(DOMAINS).join(", ")}`);
    process.exit(1);
  }
  return value;
})();

const force = process.argv.includes("--force");
const selected = domainArg ? [domainArg] : Object.keys(DOMAINS);

function encode(vectors: number[][]): string {
  const flat = new Float32Array(vectors.length * vectors[0].length);
  vectors.forEach((v, i) => flat.set(v, i * v.length));
  return Buffer.from(flat.buffer).toString("base64");
}

async function buildDomain(domain: string) {
  const { source, out } = DOMAINS[domain];
  const { chunks, sourceHash } = chunkFromDisk(source);

  if (existsSync(out) && !force) {
    const existing = JSON.parse(readFileSync(out, "utf8")) as IndexBundle;
    const unchanged =
      existing.manifest.sourceHash === sourceHash &&
      existing.manifest.embeddingModel === EMBEDDING_MODEL &&
      existing.manifest.count === chunks.length;
    if (unchanged) {
      console.log(
        `[${domain}] index up to date (${existing.manifest.count} chunks, built ${existing.manifest.builtAt}).`
      );
      return;
    }
    console.log(`[${domain}] source or model changed — rebuilding.`);
  }

  console.log(`[${domain}] embedding ${chunks.length} chunks with ${EMBEDDING_MODEL} ...`);
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

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(bundle));

  const kb = (Buffer.byteLength(JSON.stringify(bundle)) / 1024).toFixed(0);
  console.log(`\n[${domain}] wrote ${chunks.length} chunks x ${vectors[0].length} dims (${kb} KB)`);
  console.log(`-> ${out}`);
}

async function main() {
  for (const domain of selected) {
    await buildDomain(domain);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
