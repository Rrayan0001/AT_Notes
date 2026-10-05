import Groq from "groq-sdk";

// Chat and rerank only. Embeddings are served by Gemini, see ./gemini.
export const CHAT_MODEL = process.env.GROQ_CHAT_MODEL ?? "openai/gpt-oss-120b";
export const RERANK_MODEL = process.env.GROQ_RERANK_MODEL ?? "openai/gpt-oss-20b";

let client: Groq | null = null;

export function getGroq(): Groq {
  if (client) return client;
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not set. Add it to .env.local (server-side only, never NEXT_PUBLIC_)."
    );
  }
  // Kept low deliberately: rerank already retries at the application level, and
  // the previous 3x3 nesting could issue nine calls before giving up.
  client = new Groq({ apiKey, maxRetries: 2 });
  return client;
}
