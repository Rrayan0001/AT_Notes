import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { oauthProviderNames } from "@/lib/oauth";

export const metadata: Metadata = { title: "Sign in — Pavan Garu" };

/** Auth.js lands here with ?error=<code> when a sign-in attempt cannot be honored. */
const OAUTH_ERRORS: Record<string, string> = {
  OAuthAccountNotLinked:
    "That Google account is still tied to your previous session. The session has been cleared — sign in again with the same Google account.",
  AccessDenied: "Sign-in was denied. Try again with the same Google account.",
  Configuration: "Sign-in is misconfigured on the server. Check the Google keys in .env.",
  Verification: "The sign-in link has expired. Try again.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const oauthError = error ? (OAUTH_ERRORS[error] ?? "Sign-in failed. Try again.") : undefined;

  return (
    <AuthShell
      title="Every answer, attested."
      dust="Sign in to ask the notes a question. The answer arrives beside the scanned page it came from, with its transcription as written."
      facts={["275 pages sworn from the ink", "4 domains, one ledger", "every answer traced to its page"]}
    >
      <LoginForm googleReady={oauthProviderNames().includes("google")} oauthError={oauthError} />
    </AuthShell>
  );
}
