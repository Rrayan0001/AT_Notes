/**
 * Embeddings run on Google's Gemini API, not Groq. Groq's catalog has no
 * embedding model at all, so chat and rerank stay on Groq while vectors come
 * from here. Uses fetch rather than @google/genai so the project keeps a single
 * SDK dependency for chat.
 */
const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

export const EMBEDDING_MODEL = "gemini-embedding-001";

/** Pinned to 768 so vectors stay Float32-friendly and cheap to score. */
export const EMBED_DIM = 768;

/** Gemini takes the retrieval role as a parameter instead of a text prefix. */
export type EmbedTask = "document" | "query";

const TASK_TYPE: Record<EmbedTask, "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY"> = {
  document: "RETRIEVAL_DOCUMENT",
  query: "RETRIEVAL_QUERY",
};

export function getGoogleKey(): string {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_API_KEY is not set. Add it to .env (server-side only, never NEXT_PUBLIC_)."
    );
  }
  return apiKey;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Indexing is an unattended batch job, so a throttled batch is worth waiting
 * out: the long ladder recovers a run that would otherwise be wasted. Interactive
 * queries are latency-critical, so they get a single short retry and then fail.
 */
const PATIENCE = {
  index: [5_000, 10_000, 20_000, 40_000],
  interactive: [500],
} as const;

export type EmbedPatience = keyof typeof PATIENCE;

async function postWithRetry(body: unknown, patience: EmbedPatience): Promise<Response> {
  const delays = PATIENCE[patience];

  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`${API_BASE}/models/${EMBEDDING_MODEL}:batchEmbedContents`, {
      method: "POST",
      headers: { "x-goog-api-key": getGoogleKey(), "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt >= delays.length) return res;

    const wait = delays[attempt] + Math.random() * 500;
    console.warn(
      `  Gemini returned ${res.status}; retrying in ${Math.round(wait / 1000)}s (${attempt + 1}/${delays.length}).`
    );
    await sleep(wait);
  }
}

/**
 * batchEmbedContents returns embeddings positionally, with no index field to
 * sort on, so the order of the returned arrays matches the order of `inputs`.
 */
export async function geminiEmbed(
  inputs: string[],
  task: EmbedTask,
  patience: EmbedPatience = "index"
): Promise<number[][]> {
  const res = await postWithRetry(
    {
      requests: inputs.map((text) => ({
        model: `models/${EMBEDDING_MODEL}`,
        content: { parts: [{ text }] },
        outputDimensionality: EMBED_DIM,
        taskType: TASK_TYPE[task],
      })),
    },
    patience
  );

  if (!res.ok) {
    const detail = (await res.text()).slice(0, 300);
    throw new Error(`Gemini embeddings failed (${res.status}): ${detail}`);
  }

  const body = (await res.json()) as { embeddings?: { values?: number[] }[] };
  const vectors = body.embeddings ?? [];
  if (vectors.length !== inputs.length) {
    throw new Error(`Expected ${inputs.length} embeddings, got ${vectors.length}`);
  }
  return vectors.map((e) => e.values ?? []);
}