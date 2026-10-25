import { RERANK_MODEL, getGroq } from "./groq";
import type { ConversationMemoryTurn } from "./memory";

/**
 * The rewrite is a latency reduction, not a correctness requirement, so a slow
 * or failing Groq call falls back to a question-only anchor instead of hanging
 * the answer stream.
 */
const REWRITE_BUDGET_MS = 1200;
/** Guards against the model echoing the whole transcript back as the query. */
const MAX_REWRITE_CHARS = 300;
/** Answers can be long; only their topic-bearing head is useful for rewriting. */
const ANSWER_SNIPPET_CHARS = 600;

function clean(text: string): string {
  return text.replace(/\s+/g, " ").trim().slice(0, MAX_REWRITE_CHARS);
}

/**
 * Heuristic anchor used when the LLM rewrite cannot be trusted: the previous
 * question supplies the topic, the follow-up supplies the intent. Question-only
 * injection, without the previous answers, keeps older-topic vocabulary from
 * dominating retrieval while still resolving bare follow-ups.
 */
function fallbackAnchor(question: string, history: ConversationMemoryTurn[]): string {
  const last = history[history.length - 1].question;
  return clean(`${last} ${question}`);
}

/**
 * Turns a conversational follow-up into a standalone question.
 *
 * Retrieval (embedding, BM25 and the reranker) runs on the returned string, so
 * the previous answers are deliberately reduced to a short transcript instead
 * of being concatenated wholesale: those answers used to dominate the query
 * vector and drag retrieval back to an earlier topic.
 *
 * Returns `question` unchanged when history is empty, and a question-only
 * anchor when the model fails, so a new topic and a degraded Groq call both
 * cost zero extra latency beyond one fast call.
 */
export async function rewriteQuery(
  question: string,
  history: ConversationMemoryTurn[]
): Promise<string> {
  if (history.length === 0) return question;

  const transcript = history
    .map(
      (turn, index) =>
        `Question ${index + 1}: ${turn.question}\nAnswer ${index + 1}: ${turn.answer.slice(
          0,
          ANSWER_SNIPPET_CHARS
        )}`
    )
    .join("\n\n");

  try {
    const completion = await getGroq().chat.completions.create(
      {
        model: RERANK_MODEL,
        temperature: 0,
        max_tokens: 256,
        messages: [
          {
            role: "system",
            content:
              "You rewrite a follow-up question as a single self-contained question. " +
              "Resolve pronouns and references such as \"this\", \"it\", \"that\" or \"continue\" against the conversation transcript. " +
              "Keep the topic of the most recent question; never switch to a different topic or add a new one. " +
              "Do not mention the notebook, notes or study material in the rewritten question. " +
              "If the follow-up is already self-contained, return it unchanged. " +
              "Reply with the rewritten question only, no explanations.",
          },
          {
            role: "user",
            content: `Conversation:\n\n${transcript}\n\nFollow-up question: ${question}\n\nRewritten self-contained question:`,
          },
        ],
      },
      { timeout: REWRITE_BUDGET_MS, maxRetries: 0 }
    );

    const raw = completion.choices[0]?.message?.content ?? "";
    const rewritten = clean(raw.replace(/^["'`]+|["'`]+$/g, ""));
    if (!rewritten) return fallbackAnchor(question, history);
    return rewritten;
  } catch (err) {
    const detail = err instanceof Error ? err.message.split("\n")[0] : String(err);
    console.warn(`query rewrite failed, using question-only anchor: ${detail.slice(0, 100)}`);
    return fallbackAnchor(question, history);
  }
}
