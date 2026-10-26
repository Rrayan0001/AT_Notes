"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { DOMAINS } from "@/lib/domains";
import { Button } from "@/components/ui/button";
import {
  Disclaimer,
  FormError,
  LABEL,
  PRIMARY,
} from "@/components/auth/auth-shell";

const DISCLAIMER =
  "Pavan Garu is a personal study aid. Answers come from transcribed notes, not authoritative sources — check them against your own material and syllabus.";

export function SignOutLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => void signOut({ callbackUrl: "/login" })}
      className="focus-rubric text-foreground underline underline-offset-4"
    >
      {children}
    </button>
  );
}

export interface AppUser {
  name: string;
  email: string;
}

export function OnboardingForm({ user }: { user: AppUser }) {
  const router = useRouter();
  const [domain, setDomain] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!domain) {
      setError("Choose the one domain you want to belong to — it can't be changed later.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Sealing your domain failed.");
        return;
      }
      // The onboarding route bakes the freshly sealed domain straight into
      // the session token, so the workbench is one client-side hop away —
      // no second Google round-trip.
      router.push("/");
      router.refresh();
    } catch {
      setError("Sealing your domain failed. Is the server running with a configured database?");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div className="border-y border-[var(--leaf)] py-4">
        <p className={LABEL}>Sealed to</p>
        <p className="mt-1 font-serif text-[17px] leading-snug text-foreground">
          {user.name || "You"}
        </p>
        <p className="text-[13px] text-muted-foreground">{user.email}</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-rubric">
          verified by google
        </p>
      </div>

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
                    {!d.open ? "closed" : d.ingested ? "live" : "soon"}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-2.5 flex items-start gap-1.5 text-[13px] leading-relaxed text-muted-foreground">
          <span aria-hidden="true" className="mt-[7px] size-1.5 shrink-0 bg-rubric" />
          One email belongs to one domain. It is sealed here once and cannot be changed.
        </p>
      </fieldset>

      <Disclaimer>{DISCLAIMER}</Disclaimer>

      {error && <FormError>{error}</FormError>}

      <Button type="submit" disabled={busy} className={PRIMARY}>
        {busy ? "Sealing…" : "Seal my domain"}
      </Button>
    </form>
  );
}
