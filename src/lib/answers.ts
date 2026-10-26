export type ChatMode = "notes" | "general";

/**
 * Only questions that explicitly ask for a long-form, expressive answer
 * should unlock the OpenUI canvas; every other reply stays plain markdown.
 * Kept deliberately strict — "detailed manner" (the ordinary follow-up)
 * is plain detail, while "very detailed and expressive" is the trigger.
 */
const EXPRESSIVE_PATTERN =
  /\b(?:very\s+detail(?:ed)?|detailed\s+(?:and\s+expressive\s+)?(?:output|answer|answer|response|explanation|breakdown|version)|detail(?:ed)?\s+and\s+expressive\b|expressive|expressively|elaborate|elaborately|in\s+(?:great|full|complete)\s+detail|exhaustively|exhaustive|highly\s+detailed|deep\s+dive|visually\s+(?:rich|detailed|appealing))\b/i;

export function wantsExpressiveAnswer(question: string): boolean {
  return EXPRESSIVE_PATTERN.test(question);
}

export const MISSING_FROM_NOTES = "That isn't in these notes.";

const MISSING_PATTERN = /that\s+isn[’']t\s+in\s+these\s+notes/i;

/**
 * Detects the exact missing-note response even when the model uses a curly
 * apostrophe or varies nearby punctuation. Notes-mode answers are checked so
 * the UI can offer an explicitly labeled general-knowledge follow-up.
 */
export function isMissingFromNotes(answer: string): boolean {
  return MISSING_PATTERN.test(answer);
}

const EXPLICIT_GENERAL_PATTERN =
  /\b(?:forget|ignore|skip|set aside|leave aside)\b[^.?!]{0,80}\bnotes?\b|\bwithout\b[^.?!]{0,80}\bnotes?\b|\boutside\b[^.?!]{0,80}\bnotes?\b|\boutside\b[^.?!]{0,40}\bsources?\b|\bexternal\b[^.?!]{0,40}\bsources?\b|\bnot\b[^.?!]{0,20}\bfrom\b[^.?!]{0,20}\bnotes?\b|\bfrom\b[^.?!]{0,20}\bgeneral knowledge\b|\bgeneral (?:answer|example|explanation)\b/i;

/**
 * Detects an instruction to bypass the notebook, such as "forget about the
 * notes." Generic uses of "in general" alone do not qualify.
 */
export function isExplicitGeneralRequest(question: string): boolean {
  return EXPLICIT_GENERAL_PATTERN.test(question);
}
