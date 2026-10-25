import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OnboardingForm, SignOutLink } from "@/components/signup-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { auth } from "@/auth";

export const metadata: Metadata = { title: "Seal your domain — Pavan Garu" };

/**
 * Onboarding desk for first-time Google users: the session exists, the
 * domain does not. Anyone without a session is bounced to the login page;
 * anyone whose domain is already sealed belongs on the workbench.
 */
export default async function SignupPage() {
  const session = await auth();
  const user = session?.user;

  if (!user?.email) redirect("/login");
  if (user.domain) redirect("/");

  return (
    <AuthShell
      title="One desk, four notebooks."
      dust="Your email is verified by Google. Now seal the one domain you belong to — access to the notes is scoped to it, permanently, and stated plainly."
      facts={["one email · one domain · sealed in the ledger", "bound once — no appeal", "this page opens once"]}
      next={
        <>
          Wrong identity?{" "}
          <SignOutLink>Sign in with another Google email</SignOutLink>
        </>
      }
    >
      <OnboardingForm
        user={{ name: user.name ?? "", email: user.email }}
      />
    </AuthShell>
  );
}
