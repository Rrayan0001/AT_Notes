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

const SYLLABUS_STRONG_PATTERN =
  /\b(?:syllabus|curriculum|road ?map|course (?:outline|plan)|module list|table of contents)\b/i;

const SYLLABUS_SOFT_PATTERN =
  /\b(?:first|opening|starting)\b[^.?!]{0,20}\b(?:topic|module|chapter|unit|lesson)\b|\bwhere\b[^.?!]{0,12}\b(?:to|should we|do we)\b[^.?!]{0,8}\b(?:start|begin)\b|\bwhat\b[^.?!]{0,24}\btopics?\b[^.?!]{0,24}\b(?:covers?|covered|include[sd]?|study|learn)\b/i;

/** Words that anchor a soft syllabus question to the domain as a whole. */
const SYLLABUS_DOMAIN_PATTERN =
  /\b(?:domain|course|track|training|programme?|syllabus|curriculum)\b/i;

/**
 * Curriculum questions ("syllabus", "what's the first topic of this domain")
 * are answered from the authored module graph, not the model over retrieval.
 * Strong markers answer anywhere; soft markers ("first topic", "where do we
 * start") need a domain-level anchor to avoid hijacking "first topic on page
 * 5" style retrieval questions.
 */
export function isSyllabusRequest(question: string): boolean {
  if (SYLLABUS_STRONG_PATTERN.test(question)) return true;
  return (
    SYLLABUS_SOFT_PATTERN.test(question) &&
    SYLLABUS_DOMAIN_PATTERN.test(question)
  );
}
