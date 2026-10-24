import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { oauthProviderNames } from "@/lib/oauth";

export const metadata: Metadata = { title: "Sign in — Pavan Garu" };

/** The signup form lands here with ?created=1 when auto sign-in needs a retry. */
const NOTICES: Record<string, string> = {
  "1": "Account created — sign in to continue.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>;
}) {
  const { created } = await searchParams;
  const notice = created ? NOTICES[created] : undefined;

  return (
    <AuthShell
      title="Every answer, attested."
      dust="Sign in to ask the notes a question. The answer arrives beside the scanned page it came from, with its transcription as written."
      facts={["275 pages transcribed", "4 domains", "citations to the exact page"]}
      next={
        <>
          New here?{" "}
          <Link href="/signup" className="focus-rubric text-foreground underline underline-offset-4">
            Create an account
          </Link>
        </>
      }
    >
      {notice && (
        <p className="mb-6 border border-leaf bg-leaf/30 px-4 py-3 text-[13px] leading-relaxed text-muted-foreground">
          <span className="mr-2 font-mono text-[10px] tracking-[0.18em] text-rubric uppercase">
            notice
          </span>
          {notice}
        </p>
      )}
      <LoginForm oauthProviders={oauthProviderNames()} />
    </AuthShell>
  );
}
