"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Disclaimer,
  FIELD,
  FormError,
  KeepSignedIn,
  LABEL,
  PRIMARY,
  SECONDARY,
} from "@/components/auth/auth-shell";
import { PasswordField } from "@/components/auth/password-field";

const DISCLAIMER =
  "AXIOM is a personal study aid. Answers come from transcribed notes, not authoritative sources — check them against your own material and syllabus.";

export function LoginForm({ oauthProviders }: { oauthProviders: string[] }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keep, setKeep] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await signIn("credentials", { redirect: false, email, password });
      if (res?.error) {
        setError("Email or password is incorrect.");
        return;
      }
      // Re-sign the session token for the chosen horizon before entering.
      // The fetch may race the signIn response's Set-Cookie, so retry briefly.
      for (let attempt = 0; attempt < 6; attempt++) {
        const res = await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keep }),
        }).catch(() => undefined);
        if (res?.ok) break;
        await new Promise((r) => setTimeout(r, 150));
      }
      // Refresh so the server session (and domain) are current, then enter.
      router.push("/");
      router.refresh();
    } catch {
      setError("Sign-in failed. Is the server running with a configured database?");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="email" className={LABEL}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={FIELD}
          placeholder="you@example.com"
        />
      </div>
      <PasswordField
        id="password"
        label="Password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      <KeepSignedIn checked={keep} onChange={setKeep} />

      {error && <FormError>{error}</FormError>}
      <Disclaimer>{DISCLAIMER}</Disclaimer>

      <Button type="submit" disabled={busy} className={PRIMARY}>
        {busy ? "Signing in…" : "Sign in"}
      </Button>

      {oauthProviders.length > 0 && (
        <>
          <div className="flex items-center gap-4" aria-hidden="true">
            <span className="h-px flex-1 bg-leaf" />
            <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              or
            </span>
            <span className="h-px flex-1 bg-leaf" />
          </div>
          <div className="space-y-2">
            {oauthProviders.includes("google") && (
              <Button type="button" variant="ghost" className={SECONDARY} onClick={() => signIn("google", { callbackUrl: "/" })}>
                Continue with Google
              </Button>
            )}
          </div>
        </>
      )}
    </form>
  );
}
