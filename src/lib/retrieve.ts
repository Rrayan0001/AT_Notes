// No `server-only` import here: scripts/eval.ts loads this module outside
// Next.js, and the `server-only` guard throws in a plain Node context.
// Only the two route handlers reach this module in the app itself.
import bundle from "@/data/index.json";
import { Bm25Index } from "./bm25";
import type { Chunk, IndexBundle, RetrievedSource, ScoredChunk } from "./types";

const RRF_K = 60;

let state: { chunks: Chunk[]; vectors: Float32Array; bm25: Bm25Index; dim: number } | null = null;

/** The JSON import is untyped, so treat it as the validated shape at runtime. */
function loadBundle(): IndexBundle {
  return bundle as unknown as IndexBundle;
}

export function getIndex(): {
  chunks: Chunk[];
  vectors: Float32Array;
  bm25: Bm25Index;
  dim: number;
  manifest: IndexBundle["manifest"];
} {
  if (state) return { ...state, manifest: loadBundle().manifest };

  const data = loadBundle();
  if (!data.chunks?.length || !data.vectorsB64) {
    throw new Error(
      "Vector index is missing or empty. Run: npm run index (needs GOOGLE_API_KEY in .env)."
    );
  }

  const { count, dim } = data.manifest;

  const raw = Buffer.from(data.vectorsB64, "base64");
  const vectors = new Float32Array(
    raw.buffer,
    raw.byteOffset,
    raw.byteLength / Float32Array.BYTES_PER_ELEMENT
  );

  if (vectors.length !== count * dim) {
    throw new Error(
      `Vector store mismatch: expected ${count * dim} floats, got ${vectors.length}. Re-run: npm run index`
    );
  }

  const bm25 = new Bm25Index();
  bm25.build(
    data.chunks.map((c) => c.id),
    // Headings are indexed alongside body text so a query like "3NF" or
    // "Tunneling Protocols" matches even when the body is terse.
    data.chunks.map((c) => `${c.heading} ${c.sectionPath.join(" ")} ${c.text}`)
  );

  state = { chunks: data.chunks, vectors, bm25, dim };
  return { ...state, manifest: data.manifest };
}

export function denseScores(queryVec: number[], chunks: Chunk[], vectors: Float32Array, dim: number): Map<string, number> {
  const out = new Map<string, number>();
  for (let i = 0; i < chunks.length; i++) {
    let dot = 0;
    const base = i * dim;
    for (let j = 0; j < dim; j++) dot += queryVec[j] * vectors[base + j];
    out.set(chunks[i].id, dot);
  }
  return out;
}

export function retrieveHybrid(query: string, queryVec: number[], topK = 20): ScoredChunk[] {
  const { chunks, vectors, bm25, dim } = getIndex();
  const dense = denseScores(queryVec, chunks, vectors, dim);
  const sparse = bm25.search(query);

  const denseRanked = [...dense.entries()].sort((a, b) => b[1] - a[1]);
  const sparseRanked = [...sparse.entries()].sort((a, b) => b[1] - a[1]);
  const denseRank = new Map(denseRanked.map(([id], i) => [id, i + 1]));
  const sparseRank = new Map(sparseRanked.map(([id], i) => [id, i + 1]));

  const scored: ScoredChunk[] = chunks.map((chunk) => {
    const dr = denseRank.get(chunk.id);
    const sr = sparseRank.get(chunk.id);
    // Reciprocal Rank Fusion. A chunk found by either retriever can surface,
    // which is what rescues terse pages that share no vocabulary with a query.
    const rrf = (dr ? 1 / (RRF_K + dr) : 0) + (sr ? 1 / (RRF_K + sr) : 0);
    return {
      chunk,
      denseScore: dense.get(chunk.id) ?? 0,
      bm25Score: sparse.get(chunk.id) ?? 0,
      rrfScore: rrf,
    };
  });

  return scored
    .filter((s) => s.rrfScore > 0)
    .sort((a, b) => b.rrfScore - a.rrfScore)
    .slice(0, topK);
}

/**
 * Keyword-only ranking. BM25 runs against the in-memory index in a few
 * milliseconds and needs no embedding call, so the UI can paint evidence while
 * the semantic query embedding is still in flight.
 */
export function retrieveSparse(query: string, topK = 5): ScoredChunk[] {
  const { chunks, bm25 } = getIndex();
  const sparse = bm25.search(query);
  const byId = new Map(chunks.map((chunk) => [chunk.id, chunk]));

  return [...sparse.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topK)
    .map(([id, score]) => {
      const chunk = byId.get(id);
      return chunk
        ? { chunk, denseScore: 0, bm25Score: score, rrfScore: score }
        : null;
    })
    .filter((item): item is ScoredChunk => item !== null);
}

/** Wire format shared by the SSE sources event and `/api/search`. */
export function toSources(candidates: ScoredChunk[]): RetrievedSource[] {
  return candidates.map((item) => ({
    id: item.chunk.id,
    page: item.chunk.page,
    heading: item.chunk.heading,
    text: item.chunk.text,
    rrfScore: Number(item.rrfScore.toFixed(6)),
  }));
}
