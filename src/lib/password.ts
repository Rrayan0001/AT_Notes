/**
 * Password policy shared by the signup API (zod refine) and the signup form
 * (live meter + client-side check), so the two never drift.
 */
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 200;

export function passwordIssues(password: string): string[] {
  const issues: string[] = [];
  if (password.length < PASSWORD_MIN) {
    issues.push(`at least ${PASSWORD_MIN} characters`);
  }
  if (password.length > PASSWORD_MAX) {
    issues.push(`at most ${PASSWORD_MAX} characters`);
  }
  if (!/[a-z]/.test(password)) issues.push("a lowercase letter");
  if (!/[A-Z]/.test(password)) issues.push("an uppercase letter");
  if (!/[0-9]/.test(password)) issues.push("a digit");
  if (!/[^A-Za-z0-9]/.test(password)) issues.push("a symbol");
  return issues;
}

export function passwordRequirementMessage(password: string): string | null {
  const issues = passwordIssues(password);
  if (issues.length === 0) return null;
  if (issues.length === 1) {
    return `Password needs ${issues[0]}.`;
  }
  const head = issues.slice(0, -1).join(", ");
  return `Password needs ${head} and ${issues[issues.length - 1]}.`;
}

/**
 * 0–4 strength score driven by independent character classes and length,
 * mirroring the requirement list.
 */
export function passwordStrength(password: string): 0 | 1 | 2 | 3 | 4 {
  if (password.length === 0) return 0;
  let score = 0;
  if (password.length >= PASSWORD_MIN) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;
}

export const STRENGTH_LABELS = ["empty", "weak", "fair", "good", "strong"] as const;
