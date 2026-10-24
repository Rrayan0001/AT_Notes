"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { DOMAINS } from "@/lib/domains";
import { Button } from "@/components/ui/button";
import {
  Disclaimer,
  FIELD,
  FormError,
  KeepSignedIn,
  LABEL,
  PRIMARY,
} from "@/components/auth/auth-shell";
import { PasswordField } from "@/components/auth/password-field";
import {
  PASSWORD_MIN,
  STRENGTH_LABELS,
  passwordRequirementMessage,
  passwordStrength,
} from "@/lib/password";

const DISCLAIMER =
  "Pavan Garu is a personal study aid. Answers come from transcribed notes, not authoritative sources — check them against your own material and syllabus.";

const strengthColor = (strength: 0 | 1 | 2 | 3 | 4): string =>
  strength <= 1 ? "bg-rubric" : strength === 2 ? "bg-amber-500" : "bg-emerald-500";

export function SignupForm({ oauthProviders }: { oauthProviders: string[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [keep, setKeep] = useState(false);
  const [domain, setDomain] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!domain) {
      setError("Choose the one domain you want to belong to — it can't be changed later.");
      return;
    }
    const requirement = passwordRequirementMessage(password);
    if (requirement) {
      setError(requirement);
      return;
    }
    if (confirm !== password) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, domain }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Signup failed.");
        return;
      }
      setCreated(true);
      // Then complete the login with the same credentials.
      const signInRes = await signIn("credentials", { redirect: false, email, password });
      if (signInRes?.error) {
        router.push("/login?created=1");
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
      router.push("/");
      router.refresh();
    } catch {
      setError("Signup failed. Is the server running with a configured database?");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="signup-name" className={LABEL}>
          Name
        </label>
        <input
          id="signup-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={FIELD}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="signup-email" className={LABEL}>
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={FIELD}
          placeholder="you@example.com"
        />
      </div>
      <div className="space-y-2">
        <PasswordField
          id="signup-password"
          label="Password"
          autoComplete="new-password"
          required
          minLength={PASSWORD_MIN}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`${PASSWORD_MIN}+ chars, upper/lower case, digit, symbol`}
        />
        {/* Live strength meter: four hairline segments fill as independent
            character classes appear — the machine voice, left aligned. */}
        <div aria-hidden="true" className="flex gap-1">
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className={
                "h-0.5 flex-1 transition-colors duration-300 " +
                (passwordStrength(password) >= step && password.length > 0
                  ? strengthColor(passwordStrength(password))
                  : "bg-foreground/10")
              }
            />
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          strength: {STRENGTH_LABELS[passwordStrength(password)]}
        </p>
      </div>
      <PasswordField
        id="signup-confirm"
        label="Confirm password"
        autoComplete="new-password"
        required
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Repeat the password"
      />
      {confirm.length > 0 && confirm !== password && (
        <p className="text-[12px] text-rubric">Passwords do not match.</p>
      )}
      <KeepSignedIn checked={keep} onChange={setKeep} />

      {/* The domain contents list: a table of contents, not a card grid.
          Selection is marked the way a reader marks an authority — the row's
          margin square fills with Rubric and a faint Rubric wash crosses the
          passage. The square is always present so the affordance reads. */}
      <fieldset>
        <legend className={LABEL}>Your domain</legend>
        <div className="mt-2 border-t border-leaf">
          {Object.values(DOMAINS).map((d) => {
            const selected = domain === d.id;
            return (
              <div
                key={d.id}
                className={
                  "group relative flex gap-4 border-b border-leaf pl-1 pr-2 transition-colors " +
                  (selected ? "bg-rubric/10" : "hover:bg-leaf/20")
                }
              >
                {/* The margin mark: empty hairline square until chosen. */}
                <span
                  aria-hidden="true"
                  className={
                    "mt-[1.35rem] ml-3 size-2 shrink-0 transition-colors duration-300 " +
                    (selected
                      ? "bg-rubric"
                      : "border border-foreground/25 group-hover:border-foreground/50")
                  }
                />
                <button
                  type="button"
                  onClick={() => setDomain(d.id)}
                  aria-pressed={selected}
                  className="focus-rubric flex w-full items-baseline justify-between gap-4 py-3.5 text-left"
                >
                  <span>
                    <span
                      className={
                        "block font-serif text-[17px] leading-snug transition-colors duration-300 " +
                        (selected ? "text-foreground" : "text-foreground/90")
                      }
                    >
                      {d.label}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">
                      {d.blurb}
                    </span>
                  </span>
                  <span
                    className={
                      "shrink-0 pt-0.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-300 " +
                      (selected ? "text-rubric" : "text-muted-foreground")
                    }
                  >
                    {d.ingested ? "live" : "soon"}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-2.5 flex items-start gap-1.5 text-[13px] leading-relaxed text-muted-foreground">
          <span aria-hidden="true" className="mt-[7px] size-1.5 shrink-0 bg-rubric" />
          One email belongs to one domain. It is locked at signup and cannot be changed.
        </p>
      </fieldset>

      {error && <FormError>{error}</FormError>}
      <Disclaimer>{DISCLAIMER}</Disclaimer>

      <Button type="submit" disabled={busy || created} className={PRIMARY}>
        {created ? "Signing you in…" : busy ? "Creating account…" : "Create account"}
      </Button>

      {oauthProviders.length > 0 && (
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Have Google? Sign in on the{" "}
          <a href="/login" className="focus-rubric text-foreground underline underline-offset-4">
            login page
          </a>{" "}
          — the email must already be registered here with a domain.
        </p>
      )}
    </form>
  );
}
