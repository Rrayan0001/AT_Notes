import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { oauthProviderNames } from "@/lib/oauth";

export const metadata: Metadata = { title: "Create account — AXIOM" };

const OAUTH_ERRORS: Record<string, string> = {
  unlinked:
    "This email isn't registered yet. Create an account below with the same email to pick your domain — then sign in with Google.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <AuthShell
      title="One desk, four notebooks."
      dust="Pick the one domain your email belongs to. Access to the notes is scoped to it — permanently, and stated plainly."
      facts={["one email · one domain", "locked at signup", "1 notebook live"]}
      next={
        <>
          Already registered?{" "}
          <Link href="/login" className="focus-rubric text-foreground underline underline-offset-4">
            Sign in
          </Link>
        </>
      }
    >
      {error && (
        <p className="mb-6 border border-leaf bg-leaf/30 px-4 py-3 text-[13px] leading-relaxed text-muted-foreground">
          <span className="mr-2 font-mono text-[10px] tracking-[0.18em] text-rubric uppercase">
            notice
          </span>
          {OAUTH_ERRORS[error] ?? error}
        </p>
      )}
      <SignupForm oauthProviders={oauthProviderNames()} />
    </AuthShell>
  );
}
