"use client";

import { useEffect, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FormError, PRIMARY, SECONDARY } from "@/components/auth/auth-shell";

/**
 * Google-only sign-in. An active session at this page is the poison pill of
 * the whole flow: with one present, Auth.js throws OAuthAccountNotLinked on
 * the callback and the sign-in page loops forever. So the form clears any
 * live session on mount and only reveals the buttons when the desk is clean.
 */
export function LoginForm({
  googleReady = true,
  oauthError,
}: {
  googleReady?: boolean;
  oauthError?: string | null;
}) {
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    let stale = false;
    (async () => {
      try {
        const session = await getSession();
        if (session && !stale) await signOut({ redirect: false });
      } catch {
        /* nothing to clear */
      }
      if (!stale) setCleared(true);
    })();
    return () => {
      stale = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      {oauthError && <FormError>{oauthError}</FormError>}

      {googleReady ? (
        <div className="space-y-2.5">
          <Button
            disabled={!cleared}
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className={PRIMARY}
          >
            {cleared ? "Continue with Google" : "Preparing sign-in…"}
          </Button>
          <Button
            disabled={!cleared}
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className={SECONDARY}
          >
            Sign up with Google
          </Button>
        </div>
      ) : (
        <FormError>Google sign-in is not configured on this server yet.</FormError>
      )}

      <p className="text-[12.5px] leading-relaxed text-muted-foreground">
        Signing up seals your one domain at the very next step — once sealed,
        it never opens again.
      </p>
    </div>
  );
}
