/**
 * Admin identification via the ADMIN_EMAILS environment variable
 * (comma-separated). No role column — membership in this list is the only
 * privilege, and it only exists to lift domain-switch cooldowns.
 */
export function adminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}
