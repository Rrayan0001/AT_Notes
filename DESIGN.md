# Design

Source of truth: `FRONTEND_PROMPT.md` (operative brief) + `BRAND_BRIEF.md`
(art-direction analysis). This file captures the implemented token mapping.

## Theme

Warm paper light mode and a **lamplight** dark mode (`#14120E` ground — the
same desk at 1 a.m.), never a cold inversion. Existing tokens live in
`src/app/globals.css` `:root` / `.dark` (OKLCH): warm `--background`,
`--primary` muted indigo ink, warm hairlines. Auth/brand surfaces add:

```css
--rubric: #A63C24;      /* dark: #C05A3C — the scribe's red, one element per screen */
--vellum: #FBF9F3;      /* dark: #1D1A14 — the leaf (raised form surface) */
--hairline: rgba(28 26 22 / 0.13);  /* dark: rgba(232 225 211 / 0.14) */
```

## Typography — the provenance law

| Voice | Face (token) | Where |
|---|---|---|
| the notebook (verbatim) | `--font-serif` → Newsreader | display lines, domain names, quoted transcription |
| the assistant | `--font-sans` → Geist (Inter role) | answers, labels, buttons, prose |
| the machine | `--font-mono` → Geist Mono | counts, scores, facts, metadata — garnish, never body |

Display sizes modest (product register): text-4xl–5xl Newsreader Light,
tracking ≥ -0.02em, `text-wrap: balance`.

## Color strategy — Restrained

Tinted warm neutrals carry ~100% of surface. Rubric red is the single accent:
one saturated element per screen (primary CTA **or** the one active rule).
Errors: Bone-filled block, 1px hairline border, mono Rubric label. Umber
(#847B6C) is decorative metadata only — small text stays Graphite or darker
(≥4.5:1). No cool grays anywhere.

## Layout

Full-height split on ≥lg: brand column (display line + mono facts strip,
left-aligned, justified between) beside a vellum form leaf; hairline 1px rule
between. Single column with the brand strip condensed on mobile. Nothing
centered by default; content column ≈ 24rem.

## Form controls (auth)

- Inputs: borderless fields with **one hairline underline**; placeholder in
  warm muted; focus = 1px Rubric underline + Rubric outline (2px offset,
  instant).
- Domain picker: a contents list — serif domain names, graphite blurbs, mono
  status, hairline rules between rows; selected row gets a faint Rubric wash
  and a 6px Rubric square in the margin. Never a card grid.
- Buttons: primary CTA filled Rubric (white text, 6.3:1); secondary
  transparent with hairline border. Hover = slow color change only.

## Motion

240–420ms, opacity + ≤16px translate only, `ease-out` decisive deceleration.
The focus outline is instant. `prefers-reduced-motion`: everything instant.
One thing moves at a time; no entrance orchestration.

## Components

Buttons/badges from `src/components/ui/*`. Auth shell in
`src/components/auth/auth-shell.tsx`. Forms are client components using
`signIn`/`signOut` from `next-auth/react`.
