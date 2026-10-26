"use client";

import { useSyncExternalStore, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { signIn } from "next-auth/react";
import { DOMAINS } from "@/lib/domains";
import { COOLDOWN_MS } from "@/lib/domain-switch";
import { Button } from "@/components/ui/button";
import type { AppUser } from "@/components/coming-soon";

interface SwitchStatus {
  current: string;
  lastChangedAt: string | null;
  canChangeNow: boolean;
  cooldownEndsAt: string | null;
  isAdmin: boolean;
}

/**
 * Domain switch modal. The picker mirrors the signup one; the switch is
 * guarded by a 3-day cooldown — first one free — and admins get an unlock
 * control. After a successful switch the Google flow reruns instantly so the
 * session's JWT carries the new domain (the same pattern signup uses).
 */
export function SwitchDomainDialog({
  user,
  onClose,
}: {
  user: AppUser;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<SwitchStatus | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [unlockEmail, setUnlockEmail] = useState("");
  // Fixed positioning breaks inside the header's backdrop-filter containing
  // block (it shrinks to the navbar), so the dialog portals to <body>. The
  // false-on-server / true-on-client snapshot gates hydration cleanly.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/api/onboarding/switch")
      .then((r) => (r.ok ? (r.json() as Promise<SwitchStatus>) : null))
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setError("Could not load your switch state.");
          return;
        }
        setStatus(data);
        setSelected(null);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load your switch state.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async () => {
    if (!selected) {
      setError("Choose a domain to switch to.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: selected }),
      });
      if (res.status === 429) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Switch cooldown is still running.");
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Switching your domain failed.");
        return;
      }
      // Rerun the Google mint so the fresh JWT carries the new domain —
      // instant, no consent prompt, same pattern as signup sealing.
      setNotice("Domain switched. Updating your session…");
      await new Promise((r) => setTimeout(r, 900));
      await signIn("google", { callbackUrl: "/" });
    } catch {
      setError("Switching your domain failed. Is the server running with a configured database?");
    } finally {
      setBusy(false);
    }
  };

  const unlock = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/domain-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: unlockEmail.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; email?: string };
      if (!res.ok) {
        setError(data.error ?? "Unlock failed.");
        return;
      }
      setError(null);
      setNotice(`Cooldown cleared for ${data.email}.`);
      const refreshed = await fetch("/api/onboarding/switch");
      if (refreshed.ok) {
        const data2 = (await refreshed.json()) as SwitchStatus;
        setStatus(data2);
        setSelected(null);
      }
    } catch {
      setError("Unlock failed.");
    } finally {
      setBusy(false);
    }
  };

  const targets = Object.values(DOMAINS).filter((d) => d.id !== user.domain);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/40 px-4 py-6 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Switch domain"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="turn-enter flex max-h-[calc(100dvh-3rem)] w-full max-w-md flex-col border border-[var(--leaf)] bg-background shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--leaf)] px-5 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Switch domain
            </p>
            <p className="mt-1 font-serif text-lg leading-snug text-foreground">
              {user.domain ? DOMAINS[user.domain]?.label : "Your domain"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="focus-rubric font-mono text-[11px] text-muted-foreground hover:text-rubric transition-colors"
          >
            esc
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {status && !status.canChangeNow && (
            <div className="mb-4 border border-[var(--rubric)]/40 bg-rubric/10 px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rubric">
                cooldown running
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                You switched recently. Another switch unlocks at{" "}
                <strong className="text-foreground">
                  {status.cooldownEndsAt && new Date(status.cooldownEndsAt).toLocaleString()}
                </strong>
                .
              </p>
            </div>
          )}

          <div className="mt-2 border-t border-leaf">
            {targets.map((d) => {
              const rowSelected = !status?.canChangeNow ? false : selected === d.id;
              return (
                <div
                  key={d.id}
                  className={
                    "group relative flex gap-4 border-b border-leaf pl-1 pr-2 transition-colors " +
                    (rowSelected ? "bg-rubric/10" : !status?.canChangeNow ? "opacity-60" : "hover:bg-leaf/20")
                  }
                >
                  <span
                    aria-hidden="true"
                    className={
                      "mt-[1.35rem] ml-3 size-2 shrink-0 transition-colors duration-300 " +
                      (rowSelected
                        ? "bg-rubric"
                        : "border border-foreground/25 group-hover:border-foreground/50")
                    }
                  />
                  <button
                    type="button"
                    disabled={!status?.canChangeNow}
                    onClick={() => setSelected(d.id)}
                    aria-pressed={rowSelected}
                    className="focus-rubric flex w-full items-baseline justify-between gap-4 py-3.5 text-left disabled:cursor-not-allowed"
                  >
                    <span>
                      <span
                        className={
                          "block font-serif text-[17px] leading-snug transition-colors duration-300 " +
                          (rowSelected ? "text-foreground" : "text-foreground/90")
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
                        (rowSelected ? "text-rubric" : "text-muted-foreground")
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
            You can switch your domain once every{" "}
            {Math.round(COOLDOWN_MS / (24 * 60 * 60 * 1000))} days. Chats made in this domain stay
            saved but become hidden until you switch back.
          </p>

          {error && (
            <p role="alert" className="mt-3 text-[13px] text-rubric">
              {error}
            </p>
          )}
          {notice && <p className="mt-3 text-[13px] text-foreground">{notice}</p>}
        </div>

        <div className="flex items-center gap-3 border-t border-[var(--leaf)] px-5 py-4">
          <Button
            onClick={submit}
            disabled={busy || !status?.canChangeNow || !selected}
            className="side-fill rounded-none border-[var(--leaf)] text-[13px] font-normal [--side-fill:color-mix(in_srgb,var(--foreground)_5%,transparent)]"
          >
            {busy ? "Switching…" : "Switch my domain"}
          </Button>
          <span className="ml-auto text-[12px] text-muted-foreground">
            {status?.current ? DOMAINS[status.current]?.label : ""}
          </span>
        </div>

        {status?.isAdmin && (
          <div className="border-t border-[var(--leaf)] px-5 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              admin — clear cooldown
            </p>
            <div className="mt-2 flex gap-2">
              <input
                value={unlockEmail}
                onChange={(e) => setUnlockEmail(e.target.value)}
                placeholder="account email"
                type="email"
                className="w-full border border-[var(--leaf)] bg-transparent px-2 py-1.5 text-[13px] text-foreground outline-none focus:border-foreground/40"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => void unlock()}
                disabled={busy || !unlockEmail.trim()}
                className="side-fill shrink-0 rounded-none border-[var(--leaf)] text-[12px] [--side-fill:color-mix(in_srgb,var(--foreground)_5%,transparent)]"
              >
                Unlock
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
