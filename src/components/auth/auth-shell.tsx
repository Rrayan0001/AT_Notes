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
  next: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="auth-ground min-h-dvh lg:grid lg:grid-cols-[1.15fr_1fr] lg:grid-rows-1">
      {/* The title page */}
      <aside className="px-7 pt-10 pb-6 lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-14 turn-enter">
        <div>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-rubric transition-colors"
          >
            AXIOM
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
        <div className="mt-10 border-t border-[var(--leaf)] pt-4 lg:mt-0" aria-label="Facts">
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
          <div className="mt-7 border-t border-[var(--leaf)] pt-5 text-[13px] text-muted-foreground">
            {next}
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
  "h-10 w-full rounded-none text-[14.5px] font-normal bg-(--rubric) text-[#F5EFE4] hover:bg-(--rubric-deep) focus-visible:ring-0 focus-visible:border-(--rubric) transition-all hover:shadow-[0_0_0_3px_var(--rubric-glow)] active:scale-[0.985]";

export const SECONDARY =
  "h-10 w-full rounded-none border border-[var(--leaf)] bg-transparent text-[14.5px] font-normal text-foreground hover:bg-[var(--leaf)] hover:border-rubric/30 focus-visible:ring-0 focus-visible:border-(--rubric) transition-all";

export const FIELD = "field-underline focus-rubric text-[15px] text-foreground";
export const LABEL = "text-[12px] font-mono uppercase tracking-[0.14em] text-muted-foreground";

/**
 * The session horizon, stated plainly: checked = 180 days, unchecked = 24 hours.
 */
export function KeepSignedIn({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 border-y border-[var(--leaf)] px-1 py-2.5 transition-colors focus-within:bg-[var(--leaf)]/50 hover:bg-[var(--leaf)]/40">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="peer-checked:border-(--rubric) peer-checked:bg-rubric size-3.5 shrink-0 border border-foreground/25 transition-all duration-200"
      />
      <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase transition-colors peer-checked:text-foreground">
        Keep me signed in
      </span>
      <span className="ml-auto font-mono text-[10px] tracking-[0.14em] text-muted-foreground/60 uppercase">
        {checked ? "180 days" : "24 hours"}
      </span>
    </label>
  );
}

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
