import type { Chunk, FollowupSuggestion, ScoredChunk } from "./types";

const MAX_SUGGESTIONS = 3;
const DETAIL_PATTERN = /\b(detail|detailed|comprehensive|thorough|elaborate|examples?)\b/i;
const GENERIC_HEADING_PATTERN = /^page \d+$/i;

interface SuggestionInput {
  effectiveQuestion: string;
  candidates: ScoredChunk[];
  ranked: ScoredChunk[];
  chunks: Chunk[];
  hadFallback: boolean;
}

function cleanHeading(heading: string): string {
  return heading
    .replace(/[`*_#>\[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Lines that are margin notes, separators, or clipped fragments rather than prose. */
const NOISE_LINE = /^(>|-{2,}|\||_{2,}|#+\s*$)/;
const NOISE_TEXT = /clipped at page edge|sentence unfinished|\[illegible\]|^\**$/i;

function cleanLine(text: string): string {
  return text.replace(/^[>\-*+\s]+/, "").replace(/\s+/g, " ").trim();
}

/**
 * Picks the most label-like sentence from a chunk whose heading carries no topic.
 * Margin notes and clipped fragments are rejected so suggestions do not read
 * "Jump to Date: 31/ on page 17?".
 */
function firstContentLine(text: string): string {
  for (const raw of text.split("\n")) {
    const line = cleanLine(raw);
    if (line.length < 8 || NOISE_LINE.test(raw.trim()) || NOISE_TEXT.test(line)) continue;
    const letters = line.match(/[a-z]/gi)?.length ?? 0;
    if (letters < 4) continue;
    if (line.split(/\s+/).length < 3) continue;
    return line.replace(/[.,;:]+$/, "").slice(0, 60);
  }
  return "";
}

/**
 * Generic page headings carry no topic, so prefer a section name and otherwise
 * fall back to the chunk's first substantive line.
 */
function displayTopic(chunk: Chunk): string {
  const heading = cleanHeading(chunk.heading);
  if (!GENERIC_HEADING_PATTERN.test(heading) && heading.length > 0) return heading;

  const section = (chunk.sectionPath ?? [])
    .map(cleanHeading)
    .filter((item) => item.length > 0 && !GENERIC_HEADING_PATTERN.test(item))
    .at(-1);
  if (section) return section;

  return firstContentLine(chunk.text) || `page ${chunk.page}`;
}

function normalizeKey(topic: string, page: number): string {
  return `${page}:${topic.toLowerCase()}`;
}

function addUnique(
  suggestions: FollowupSuggestion[],
  label: string,
  question: string
): boolean {
  const normalizedQuestion = question.toLowerCase();
  if (suggestions.some((item) => item.question.toLowerCase() === normalizedQuestion)) {
    return false;
  }
  if (suggestions.length >= MAX_SUGGESTIONS) return false;
  suggestions.push({ label, question });
  return true;
}

/**
 * Builds follow-up buttons from the current retrieval result instead of asking
 * the model for another completion. Detail and continuation options stay on
 * the current topic; jump options use the next-best distinct retrieved topics.
 */
export function buildFollowupSuggestions({
  effectiveQuestion,
  candidates,
  ranked,
  chunks,
  hadFallback,
}: SuggestionInput): FollowupSuggestion[] {
  const suggestions: FollowupSuggestion[] = [];
  const question = effectiveQuestion.replace(/\s+/g, " ").trim();
  if (question.length === 0) return suggestions;

  const selectedIds = new Set(ranked.map((item) => item.chunk.id));
  const usedTopics = new Set(
    ranked.map((item) => normalizeKey(displayTopic(item.chunk), item.chunk.page))
  );

  if (!hadFallback) {
    if (DETAIL_PATTERN.test(question)) {
      addUnique(
        suggestions,
        "Show concrete examples for this topic?",
        `${question} — with concrete examples from the notes`
      );
    } else {
      addUnique(
        suggestions,
        "Explain this in more detail?",
        `${question} — in detailed manner`
      );
    }

    const current = ranked[0]?.chunk;
    const next = current
      ? chunks[chunks.findIndex((chunk) => chunk.id === current.id) + 1]
      : undefined;
    if (next) {
      const topic = displayTopic(next);
      usedTopics.add(normalizeKey(topic, next.page));
      addUnique(
        suggestions,
        `Continue with ${topic}?`,
        `Explain ${topic} on page ${next.page}.`
      );
    }
  }

  for (const candidate of candidates) {
    if (suggestions.length >= MAX_SUGGESTIONS) break;
    if (selectedIds.has(candidate.chunk.id)) continue;

    const topic = displayTopic(candidate.chunk);
    const key = normalizeKey(topic, candidate.chunk.page);
    if (usedTopics.has(key)) continue;
    usedTopics.add(key);

    addUnique(
      suggestions,
      `Jump to ${topic} on page ${candidate.chunk.page}?`,
      `Explain ${topic} on page ${candidate.chunk.page}.`
    );
  }

  return suggestions;
}

export function parseSuggestions(value: unknown): FollowupSuggestion[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (item): item is { label: unknown; question: unknown } =>
        typeof item === "object" && item !== null
    )
    .map((item) => ({
      label: String(item.label ?? "").trim().slice(0, 120),
      question: String(item.question ?? "").trim().slice(0, 500),
    }))
    .filter((item) => item.label.length > 0 && item.question.length > 0)
    .slice(0, MAX_SUGGESTIONS);
}
