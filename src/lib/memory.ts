import { isExplicitGeneralRequest, type ChatMode } from "./answers";

export interface ConversationMemoryTurn {
  question: string;
  answer: string;
  mode: ChatMode;
}

export const MEMORY_TURNS = 3;
const MEMORY_FIELD_CHARS = 1200;

const FOLLOW_UP_PATTERN =
  /\b(this|that|these|those|it|they|them|he|she|his|her|its|their|above|previous|last|earlier|same|output|answer|response)\b/i;
const CONTINUATION_PATTERN =
  /\b(in (?:more |greater )?detail|detailed|comprehensive|thorough(?:ly)?|elaborate|expand|continue|go deeper|tell me more|more (?:detail|details|info|information))\b/i;
const GENERIC_WORDS = new Set(
  "please,explain,explaining,describe,tell,give,show,more,detail,details,detailed,manner,way,depth,comprehensive,thorough,thoroughly,elaborate,elaborated,elaboration,expand,expanded,continue,continued,go,deeper,deep,dive,about,on,me,us,it,this,that,these,those,a,an,the,in,of,and,or,for,to".split(
    ","
  )
);

function clean(text: string): string {
  return text.replace(/\s+/g, " ").trim().slice(0, MEMORY_FIELD_CHARS);
}

interface MemoryCandidate {
  question: string;
  answer: string;
  mode: ChatMode;
  status: string;
}

/**
 * Keeps only completed answers, newest last. General answers are excluded from
 * notes history so outside knowledge cannot become an implicit source. Memory
 * is returned only when the current input appears to continue or refer to that
 * history; otherwise a new topic starts without older answers in the prompt.
 */
export function selectConversationMemory(
  turns: MemoryCandidate[],
  mode: ChatMode,
  currentQuestion: string
): ConversationMemoryTurn[] {
  const recent = turns
    .filter(
      (turn) =>
        turn.status === "done" &&
        turn.answer.trim().length > 0 &&
        (mode === "general" || turn.mode === "notes")
    )
    .slice(-MEMORY_TURNS)
    .map((turn) => ({
      question: clean(turn.question),
      answer: clean(turn.answer),
      mode: turn.mode,
    }));

  if (recent.length === 0) return [];
  if (isExplicitGeneralRequest(currentQuestion)) return [recent[recent.length - 1]];
  if (isGenericContinuation(currentQuestion)) return [recent[recent.length - 1]];
  if (!usesFollowUpReference(currentQuestion, recent)) return [];
  return recent;
}

function contentWords(question: string): string[] {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0 && !GENERIC_WORDS.has(word));
}

function isGenericContinuation(question: string): boolean {
  const text = question.trim().toLowerCase();
  if (/^(why|how|what|which|when|where|who)\?*$/.test(text)) return true;
  return CONTINUATION_PATTERN.test(question) && contentWords(question).length === 0;
}

const GENERAL_INTENT_PREFIX_PATTERN =
  /^\s*(?:please\s+)?(?:forget|ignore|skip|set aside|leave aside)\s+(?:about\s+)?(?:the\s+)?(?:notes?|notebook)\b[.,:;!?\s]*/i;
const GENERAL_FUZZ_WORDS = new Set(["example", "examples", "general", "generally", "illustration"]);
const GENERAL_REQUEST_FILLER_WORDS = new Set([
  "i",
  "you",
  "want",
  "wants",
  "give",
  "gives",
  "get",
  "kind",
  "sort",
  "thing",
  "things",
  "something",
  "anything",
]);

function stripGeneralIntentPrefix(question: string): string {
  return question
    .replace(GENERAL_INTENT_PREFIX_PATTERN, "")
    .replace(/^(?:and|so|now)\b[.,:;!?\s]*/i, "")
    .trim();
}

function hasSubstantiveGeneralTopic(question: string): boolean {
  return contentWords(question).some(
    (word) =>
      !GENERIC_WORDS.has(word) &&
      !GENERAL_FUZZ_WORDS.has(word) &&
      !GENERAL_REQUEST_FILLER_WORDS.has(word) &&
      word !== "note" &&
      word !== "notes" &&
      word !== "notebook"
  );
}

/**
 * Preserves the topic of an underspecified general request without forwarding
 * prior notebook answers. Only the previous question is used as context, so
 * notebook facts cannot leak into the general response.
 */
export function resolveExplicitGeneralQuestion(
  question: string,
  history: ConversationMemoryTurn[]
): string {
  const cleaned = stripGeneralIntentPrefix(question);
  const latest = history.length > 0 ? history[history.length - 1].question : "";

  if (cleaned.length === 0) return latest || question;
  if (hasSubstantiveGeneralTopic(cleaned) || latest.length === 0) return cleaned;
  return `${cleaned} Context: the immediately preceding notebook topic was "${latest}". Give a general example of that same topic.`;
}

export function usesFollowUpReference(question: string, history: ConversationMemoryTurn[]): boolean {
  return history.length > 0 && FOLLOW_UP_PATTERN.test(question);
}

/**
 * Embeds an anaphoric question together with its antecedents. Standalone
 * questions are returned unchanged, preserving the existing retrieval behavior.
 */
export function buildContextualRetrievalQuery(
  question: string,
  history: ConversationMemoryTurn[]
): string {
  if (!usesFollowUpReference(question, history)) return question;

  const context = history
    .map(
      (turn, index) =>
        `Previous question ${index + 1}: ${turn.question}\nPrevious answer ${index + 1}: ${turn.answer}`
    )
    .join("\n\n");

  return `${context}\n\nCurrent follow-up question: ${question}`;
}

/**
 * Anchors a generic elaboration request to the latest notes topic. This keeps
 * "explain in detailed manner" from drifting into an older, unrelated answer.
 */
export function resolveRetrievalQuestion(
  question: string,
  history: ConversationMemoryTurn[]
): string {
  if (history.length > 0 && isGenericContinuation(question)) {
    return `${history[history.length - 1].question} — ${question}`;
  }
  return buildContextualRetrievalQuery(question, history);
}

export function buildMemoryPromptSection(
  history: ConversationMemoryTurn[],
  mode: ChatMode
): string {
  if (history.length === 0) return "";

  const transcript = history
    .map(
      (turn, index) =>
        `Previous question ${index + 1}: ${turn.question}\nPrevious answer ${index + 1}: ${turn.answer}`
    )
    .join("\n\n");

  if (mode === "general") {
    return `Conversation history:\n\n${transcript}\n\nUse that history to resolve references in the current question.`;
  }

  return (
    `Conversation history, supplied only to resolve references such as "this", ` +
    `"that", or "the output":\n\n${transcript}\n\nDo not treat that history as a ` +
    `notebook source. Every factual claim must come from the current source ` +
    `blocks and carry a page citation.`
  );
}
