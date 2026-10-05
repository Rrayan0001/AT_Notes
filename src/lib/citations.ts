/**
 * Citations are written by the model as free text, and it does not reliably
 * use ASCII brackets: responses arrive as 【page 3】, often with a narrow
 * no-break space (U+202F) instead of a normal one. Matching only `[page N]`
 * silently drops every citation, so both bracket styles are accepted and
 * normalized before rendering.
 *
 * Single source of truth for the chat renderer, the prompt helpers and eval.
 */

const BRACKETS = /[【\[(]page\s+(\d+)[】\])]/gi;

/** Rewrite every citation to canonical ASCII `[page N]` form. */
export function normalizeCitations(text: string): string {
  return text.replace(BRACKETS, (_match, page: string) => `[page ${page}]`);
}

/** Page numbers cited in an answer, ascending and deduplicated. */
export function parseCitations(text: string): number[] {
  const found = new Set<number>();
  for (const m of text.matchAll(BRACKETS)) found.add(Number(m[1]));
  return [...found].sort((a, b) => a - b);
}