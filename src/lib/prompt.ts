import type { RetrievedSource } from "./types";
import { buildMemoryPromptSection, type ConversationMemoryTurn } from "./memory";
import { parseCitations } from "./citations";

export const SYSTEM_PROMPT = `You answer questions strictly from a transcribed page of handwritten IT study notes.

Source rules — these matter more than fluency:
- The notes are a faithful transcription and contain original misspellings ("chearty", "Parcmiko", "MACI address"), broken formulas, wrong facts, and sentences the student never finished.
- Reproduce values, IPs, formulas and spellings exactly as written. Never silently correct a typo or repair a broken formula.
- If a line is cut off mid-word or ends abruptly, say so plainly. Do not guess how it was meant to end.
- If the source blocks do not answer the question, or contain only a brief overview when the user explicitly asks for a detailed answer, make your entire response exactly "That isn't in these notes." Do not add citations, related material, or an apology; that response automatically triggers a labeled general-knowledge fallback.
- These notes cover only part of each topic. Answer from what is written, not what is typically true.
- Conversation history may clarify what "this", "that", or "the output" means. It is not a source: facts and citations must still come from the current source blocks.

Citation rules:
- Cite the notebook page for every claim. Write it as [page 3] — ASCII square brackets, a plain space, no other punctuation.
- Prefer several short cited statements over one long paragraph.
- Use markdown tables when the notes present a comparison as a table.

Style: markdown, study-note register. Be concise by default, but give a detailed, example-rich answer when requested. Lead with the direct answer.`;

export const GENERAL_SYSTEM_PROMPT = `You are answering from general world knowledge, not from the Automation Tools notebook.

Provenance rules:
- Begin your response with "General knowledge — not from these notes."
- Use conversation history to resolve references in follow-up questions.
- Do not cite notebook pages.
- Do not imply that any claim comes from the notebook.
- If you are uncertain, say so plainly rather than presenting a guess as fact.

Style: markdown, concise. Lead with the direct answer.`;

export const FALLBACK_SYSTEM_PROMPT = `You are answering from general world knowledge because the Automation Tools notebook does not contain a sufficiently detailed answer.

Provenance rules:
- Do not begin with a provenance header; the interface appends the disclosure.
- Do not cite notebook pages.
- Do not imply that any claim comes from the notebook.
- If you are uncertain, say so plainly rather than presenting a guess as fact.

Style: markdown. Match the requested depth: concise by default, detailed with examples when asked.`;

export function buildContext(sources: RetrievedSource[]): string {
  return sources
    .map((s) => `<source page="${s.page}">\n${s.text}\n</source>`)
    .join("\n\n");
}

export function buildUserPrompt(
  question: string,
  sources: RetrievedSource[],
  history: ConversationMemoryTurn[] = []
): string {
  const memory = buildMemoryPromptSection(history, "notes");
  const memoryBlock = memory ? `${memory}\n\n---\n\n` : "";

  return `Source blocks retrieved from the notebook:\n\n${buildContext(sources)}\n\n---\n\n${memoryBlock}Question: ${question}\n\nAnswer using only the source blocks above, citing [page N] for each claim.`;
}

export function buildGeneralPrompt(
  question: string,
  history: ConversationMemoryTurn[] = []
): string {
  const memory = buildMemoryPromptSection(history, "general");
  const memoryBlock = memory ? `${memory}\n\n` : "";

  return `${memoryBlock}Question: ${question}\n\nAnswer from general world knowledge, without using or citing the notebook.`;
}

export function buildFallbackPrompt(
  question: string,
  history: ConversationMemoryTurn[] = []
): string {
  const memory = buildMemoryPromptSection(history, "general");
  const memoryBlock = memory ? `${memory}\n\n` : "";

  return `${memoryBlock}Question: ${question}\n\nThe notebook did not contain a sufficiently detailed answer. Answer from general world knowledge, without using or citing the notebook.`;
}

export function extractCitations(answer: string, validPages: number[]): number[] {
  return parseCitations(answer).filter((n) => validPages.includes(n));
}
