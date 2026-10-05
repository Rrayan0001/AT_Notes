import { EMBED_DIM, geminiEmbed, type EmbedTask } from "./gemini";

function l2normalize(vec: number[]): number[] {
  let sum = 0;
  for (const v of vec) sum += v * v;
  const norm = Math.sqrt(sum);
  if (norm === 0) return vec;
  return vec.map((v) => v / norm);
}

/**
 * Gemini returns unnormalized vectors, so every embedding is scaled to unit
 * length here. That makes the dot product in denseScores a true cosine and
 * keeps document and query vectors comparable regardless of chunk length.
 */
async function embedBatch(inputs: string[], task: EmbedTask): Promise<number[][]> {
  const vectors = await geminiEmbed(inputs, task, "interactive");
  return vectors.map((vec) => {
    if (vec.length !== EMBED_DIM) {
      throw new Error(`Unexpected embedding dim ${vec.length}, expected ${EMBED_DIM}`);
    }
    return l2normalize(vec);
  });
}

export async function embedDocuments(texts: string[], batchSize = 32): Promise<number[][]> {
  const out: number[][] = [];
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    // Indexing is unattended, so it opts into the patient retry ladder.
    const vectors = await geminiEmbed(batch, "document", "index");
    out.push(
      ...vectors.map((vec) => {
        if (vec.length !== EMBED_DIM) {
          throw new Error(`Unexpected embedding dim ${vec.length}, expected ${EMBED_DIM}`);
        }
        return l2normalize(vec);
      })
    );
  }
  return out;
}

const QUERY_CACHE_LIMIT = 200;
const queryCache = new Map<string, number[]>();

function cacheKey(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * Repeated and near-identical questions are common while exploring a topic, and
 * each miss costs a ~600ms round trip plus Gemini quota. A small LRU turns those
 * repeats into a map read.
 */
export async function embedQuery(text: string): Promise<number[]> {
  const key = cacheKey(text);
  const cached = queryCache.get(key);
  if (cached) {
    // Refresh recency so hot queries survive eviction.
    queryCache.delete(key);
    queryCache.set(key, cached);
    return cached;
  }

  const [vec] = await embedBatch([text], "query");
  queryCache.set(key, vec);
  if (queryCache.size > QUERY_CACHE_LIMIT) {
    const oldest = queryCache.keys().next().value;
    if (oldest !== undefined) queryCache.delete(oldest);
  }
  return vec;
}
