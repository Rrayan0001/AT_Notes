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
      <aside className="px-7 pt-10 pb-2 lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-14">
        <div>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            AXIOM
          </Link>
          <h1
            className="mt-6 max-w-[16ch] font-serif text-4xl font-light leading-[1.08] tracking-[-0.02em] text-balance sm:text-5xl lg:mt-10"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
            {dust}
          </p>
        </div>
        {/* Machine facts, running across like a contents line */}
        <div className="mt-10 border-t border-leaf pt-4 lg:mt-0" aria-label="Facts">
          <p className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] tracking-[0.02em] text-muted-foreground">
            {facts.map((fact, i) => (
              <span key={fact} className="whitespace-nowrap">
                {i > 0 && <span className="mr-2 opacity-40">·</span>}
                {fact}
              </span>
            ))}
          </p>
        </div>
      </aside>

      {/* The form leaf */}
      <div className="bg-vellum lg:border-l lg:border-leaf">
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-7 py-12 lg:min-h-full lg:px-14 lg:py-14">
          {children}
          <div className="mt-7 border-t border-leaf pt-5 text-sm text-muted-foreground">{next}</div>
        </div>
      </div>
    </main>
  );
}

/** The form-leaf shared pieces. */
export function FormError({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="border border-leaf bg-leaf/30 px-4 py-3 text-[13px] leading-relaxed text-muted-foreground"
    >
      <span className="mr-2 font-mono text-[10px] tracking-[0.18em] text-rubric uppercase">
        notice
      </span>
      {children}
    </p>
  );
}

export const PRIMARY =
  "h-10 w-full rounded-none text-[15px] font-normal bg-(--rubric) text-[#F5EFE4] hover:bg-(--rubric-deep) focus-visible:ring-0 focus-visible:border-(--rubric)";

export const SECONDARY =
  "h-10 w-full rounded-none border border-leaf bg-transparent text-[15px] font-normal text-foreground hover:bg-leaf/30 focus-visible:ring-0 focus-visible:border-(--rubric)";

export const FIELD = "field-underline focus-rubric text-[15px] text-foreground";
export const LABEL = "text-sm text-muted-foreground";

/**
 * The session horizon, stated plainly: checked, the token is re-signed for
 * 180 days; unchecked, it lapses after 24 hours (POST /api/session). The
 * right-hand mono text is not decoration — it names the actual lifetime.
 */
export function KeepSignedIn({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 border-y border-leaf px-1 py-2.5 transition-colors focus-within:bg-leaf/30 hover:bg-leaf/40">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="peer-checked:border-(--rubric) peer-checked:bg-rubric size-3.5 shrink-0 border border-foreground/25 transition-colors"
      />
      <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase transition-colors peer-checked:text-foreground">
        Keep me signed in
      </span>
      <span className="ml-auto font-mono text-[10px] tracking-[0.14em] text-muted-foreground/70 uppercase">
        {checked ? "180 days" : "24 hours"}
      </span>
    </label>
  );
}

/** The plain-term agreement, identical on both leaves. */
export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="border border-leaf px-4 py-3 text-[13px] leading-relaxed text-muted-foreground">
      <span className="mr-2 font-mono text-[10px] tracking-[0.18em] text-rubric uppercase">
        disclaimer
      </span>
      {children}
    </p>
  );
}
