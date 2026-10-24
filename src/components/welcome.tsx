"use client";

import { useEffect, useState } from "react";

/**
 * The welcome veil: a dramatic entrance sequence, once per browser session.
 * Dark lamplight field, wordmark settling with blur + tracking, hairline stage
 * lines, floating dust particles, and one Rubric scan light.
 * Any key or click skips it; prefers-reduced-motion skips it outright.
 */
export function WelcomeGate() {
  const [phase, setPhase] = useState<"idle" | "play" | "done">("idle");
  // Generated once per mount with a lazy initializer — deterministic per
  // visit, no ref writes during render.
  const [particles] = useState(() =>
    Array.from({ length: 18 }, () => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 1 + Math.random() * 2.5,
      tx: (Math.random() - 0.5) * 32,
      ty: -8 - Math.random() * 20,
      dur: 3 + Math.random() * 3,
      delay: Math.random() * 2,
    })),
  );

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
        /* private mode */
      }
      document.documentElement.classList.remove("axiom-welcome-pending");
      setPhase("done");
    };

    const end = setTimeout(finish, 3900);
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
      {/* Dust particles — ambient floating motes */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="welcome-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            "--dur": `${p.dur}s`,
            "--delay": `${p.delay}s`,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Stage lines: horizon + plumb, drawn from the center */}
      <span className="welcome-hline absolute top-[38%] left-1/2 h-px w-[88%] -translate-x-1/2" />
      <span className="welcome-vline absolute top-0 left-1/2 h-full w-px" />

      {/* The scan light: one Rubric beam sweeping the plumb */}
      <span className="welcome-scan absolute top-0 h-full w-px left-1/2" />

      <div className="relative flex h-full flex-col items-center justify-center">
        {/* The wordmark */}
        <h1 className="welcome-word font-serif text-[clamp(3.5rem,12vw,9rem)] font-light leading-none tracking-[0.06em] text-[oklch(0.94_0.01_85)]">
          Pavan Garu
        </h1>

        {/* Rubric rule expanding below the wordmark */}
        <span className="welcome-rule mt-6 h-px w-0 bg-(--rubric)" />

        {/* The machine line */}
        <p className="welcome-meta mt-6 flex flex-wrap items-center justify-center gap-x-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[oklch(0.58_0.01_75)]">
          <span>transcribed</span>
          <span aria-hidden="true" className="opacity-30">·</span>
          <span>retrieved</span>
          <span aria-hidden="true" className="opacity-30">·</span>
          <span>attested</span>
        </p>
      </div>

      <p className="welcome-skip absolute bottom-8 w-full text-center font-mono text-[9px] uppercase tracking-[0.35em] text-[oklch(0.42_0.01_75)]">
        press any key to continue
      </p>
    </div>
  );
}
