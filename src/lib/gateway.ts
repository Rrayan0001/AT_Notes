import OpenAI from "openai";
import { generateSystemPrompt, type LibrarySpec } from "@openuidev/lang-core";
import library from "./openui.spec.json";
import { promptOptions } from "./prompt-options";

/**
 * OpenUI Gateway serves the final answer model. Retrieval is done locally; this
 * client replaces only the Groq chat-completion call that turns context into
 * an answer. Through Gateway the model streams OpenUI Lang, which the browser
 * renders as generative UI.
 */
const GATEWAY_BASE_URL = "https://api.thesys.dev/v1/embed";

/** Any Gateway model id ({provider}/{model}); free Gemini variants need no paid plan. */
export const GATEWAY_MODEL = process.env.GATEWAY_MODEL ?? "google/gemini-3.6-flash-free";

let client: OpenAI | null = null;

export function getGateway(): OpenAI {
  if (client) return client;
  const apiKey = process.env.THESYS_API_KEY;
  if (!apiKey) {
    throw new Error(
      "THESYS_API_KEY is not set. Run `npx @openuidev/cli@latest generate-api-key` or add the key to .env (server-side only, never NEXT_PUBLIC_)."
    );
  }
  client = new OpenAI({
    apiKey,
    baseURL: GATEWAY_BASE_URL,
    maxRetries: 2,
  });
  return client;
}

/**
 * Wraps app instructions in the managed Cloud system prompt for the same
 * component library the browser renders with. Call once per request.
 */
export function answerSystemPrompt(instructions: string): string {
  return generateSystemPrompt({
    cloud: true,
    library: library as LibrarySpec,
    promptOptions,
    instructions,
  });
}
