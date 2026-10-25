import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The auth desk: a title page on the left, the form leaf on the right.
 * Per FRONTEND_PROMPT.md — nothing centered by default, serif = the product's
 * voice, mono = machine facts, hairline rules, one Rubric moment per screen.
 */
export function AuthShell({
  title,
  dust,
  facts,
  next,
  children,
}: {
  title: string;
  /** one plain sentence under the display line */
  dust: string;
  /** machine facts, set as the contents line */
  facts: string[];
  /** footer note under the form (the "other page" link) */
  next?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="auth-ground min-h-dvh lg:grid lg:grid-cols-[1.15fr_1fr] lg:grid-rows-1">
      {/* The title page */}
      <aside className="relative overflow-hidden px-7 pt-10 pb-6 lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-14 turn-enter">
        {/* Watermark — large serif "P" behind all content */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-8 -right-6 font-serif font-light leading-none text-foreground"
          style={{
            fontSize: "clamp(14rem, 28vw, 22rem)",
            opacity: 0.04,
            letterSpacing: "-0.04em",
          }}
        >
          P
        </span>

        <div className="relative z-10">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-rubric transition-colors"
          >
            PAVAN GARU
          </Link>

          {/* Rubric accent — the one saturated line on this screen */}
          <div className="mt-8 mb-1 h-px w-10 bg-rubric" />

          <h1
            className="mt-6 max-w-[16ch] font-serif text-4xl font-light leading-[1.08] tracking-[-0.02em] text-balance sm:text-5xl lg:mt-8"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-[48ch] text-[14.5px] leading-relaxed text-muted-foreground">
            {dust}
          </p>
        </div>

        {/* Machine facts strip */}
        <div className="relative z-10 mt-10 border-t border-[var(--leaf)] pt-4 lg:mt-0" aria-label="Facts">
          <p className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10px] tracking-[0.06em] text-muted-foreground">
            {facts.map((fact, i) => (
              <span key={fact} className="whitespace-nowrap">
                {i > 0 && <span className="mr-2 opacity-35">·</span>}
                {fact}
              </span>
            ))}
          </p>
        </div>
      </aside>

      {/* The form leaf */}
      <div
        className="bg-vellum lg:border-l lg:border-[var(--leaf)] turn-enter"
        style={{ animationDelay: "80ms" }}
      >
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-7 py-12 lg:min-h-full lg:px-14 lg:py-14">
          {children}
          {next && (
            <div className="mt-7 border-t border-[var(--leaf)] pt-5 text-[13px] text-muted-foreground">
              {next}
            </div>
          )}

          {/* Trust strip */}
          <div className="mt-10 border-t border-[var(--leaf)] pt-4" aria-label="Security assurances">
            <p className="flex flex-wrap items-center gap-x-1 gap-y-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
              <span>Secured</span>
              <span className="opacity-30">·</span>
              <span>Encrypted</span>
              <span className="opacity-30">·</span>
              <span>Private</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/** Form-leaf shared pieces */
export function FormError({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="border border-[var(--leaf)] bg-[var(--leaf)] px-4 py-3 text-[13px] leading-relaxed text-muted-foreground"
    >
      <span className="mr-2 font-mono text-[10px] tracking-[0.2em] text-rubric uppercase">
        notice
      </span>
      {children}
    </p>
  );
}

export const PRIMARY =
  "side-fill h-10 w-full rounded-none text-[14.5px] font-normal bg-(--rubric) text-[#F5EFE4] [--side-fill:var(--rubric-deep)] focus-visible:ring-0 focus-visible:border-(--rubric) transition-all hover:shadow-[0_0_0_3px_var(--rubric-glow)] active:scale-[0.985]";

export const SECONDARY =
  "side-fill h-10 w-full rounded-none border border-[var(--leaf)] bg-transparent text-[14.5px] font-normal text-foreground [--side-fill:color-mix(in_srgb,var(--foreground)_5%,transparent)] focus-visible:ring-0 focus-visible:border-(--rubric) transition-all hover:border-foreground/40 active:scale-[0.985]";

export const FIELD = "field-underline focus-rubric text-[15px] text-foreground";
export const LABEL = "text-[12px] font-mono uppercase tracking-[0.14em] text-muted-foreground";

/** The plain-term disclaimer, identical on both form leaves. */
export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="border border-[var(--leaf)] px-4 py-3 text-[13px] leading-relaxed text-muted-foreground">
      <span className="mr-2 font-mono text-[10px] tracking-[0.2em] text-rubric uppercase">
        note
      </span>
      {children}
    </p>
  );
}
