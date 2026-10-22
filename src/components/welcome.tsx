"use client";

import { useEffect, useState } from "react";

/**
 * The welcome veil: a single short entrance sequence, shown once per browser
 * session before any page's content becomes interactive. Dark lamplight field,
 * the wordmark settling from a wide tracking, hairline stage lines and one
 * Rubric scan light. Any key or click skips it; prefers-reduced-motion skips it
 * outright. Plays nowhere else afterwards.
 */
export function WelcomeGate() {
  const [phase, setPhase] = useState<"idle" | "play" | "done">("idle");

  useEffect(() => {
    let skip = false;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const clearPending = () => {
      document.documentElement.classList.remove("axiom-welcome-pending");
    };

    const start = () => {
      if (skip) return;
      skip = true;
      if (reduced) {
        clearPending();
        setPhase("done");
        return;
      }
      if (sessionStorage.getItem("axiom-welcome") === "1") {
        clearPending();
        setPhase("done");
        return;
      }
      setPhase("play");
    };

    start();
    return () => {
      skip = true;
    };
  }, []);

  useEffect(() => {
    if (phase !== "play") return;

    const finish = () => {
      try {
        sessionStorage.setItem("axiom-welcome", "1");
      } catch {
        /* private mode: the veil simply won't persist */
      }
      document.documentElement.classList.remove("axiom-welcome-pending");
      setPhase("done");
    };

    const end = setTimeout(finish, 3600);
    const onKey = () => finish();
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onKey);
    return () => {
      clearTimeout(end);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onKey);
    };
  }, [phase]);

  if (phase !== "play") return null;

  return (
    <div
      aria-hidden="true"
      className="welcome-veil fixed inset-0 z-[60] select-none overflow-hidden"
    >
      {/* Stage lines: one horizon, one plumb, drawn from the center. */}
      <span className="welcome-hline absolute top-[38%] left-1/2 h-px w-[86%] -translate-x-1/2" />
      <span className="welcome-vline absolute top-0 left-1/2 h-full w-px" />

      {/* The scan light: one 1px Rubric rule sweeping the plumb. */}
      <span className="welcome-scan absolute top-0 h-full w-px left-1/2" />

      <div className="relative flex h-full flex-col items-center justify-center">
        {/* The wordmark */}
        <h1 className="welcome-word font-serif text-[clamp(4rem,15vw,10rem)] font-light leading-none text-[oklch(0.94_0.01_85)]">
          AXIOM
        </h1>
        <span className="welcome-rule mt-7 h-px w-0 bg-(--rubric)" />

        {/* The machine line */}
        <p className="welcome-meta mt-7 flex flex-wrap items-center justify-center gap-x-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[oklch(0.62_0.01_75)]">
          <span>transcribed</span>
          <span aria-hidden="true" className="opacity-40">
            ·
          </span>
          <span>retrieved</span>
          <span aria-hidden="true" className="opacity-40">
            ·
          </span>
          <span>attested</span>
        </p>
      </div>

      <p className="welcome-skip absolute bottom-8 w-full text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[oklch(0.45_0.01_75)]">
        press any key to continue
      </p>
    </div>
  );
}
