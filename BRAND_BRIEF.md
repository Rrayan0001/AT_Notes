# AXIOM — Official Brand Website Brief

> **"Every answer, attested."**
>
> An enterprise retrieval engine that cites the artifact, preserves the original, and is allowed to say no.

This document contains two parts: an **analysis of the source brief** (the fitness-studio brief) that informed the structure, and the **AXIOM brief** itself — a full art-direction and build direction for the official website.

---

# Part 1 — Analysis of the Source Brief

## 1.1 What it is structurally

Seven blocks, each doing one job, written as a mood board rather than a spec:

| Block | Lever | Function |
|---|---|---|
| Visual Strategy | Imagery / Photography / Composition | Three *independent* axes — a designer can satisfy them separately without contradiction |
| Color Palette | Primary / Accent / Background | Tiered by **role**, not by hex value: ground → 2 metals → textural field |
| Typography | Headings / Body | Split by *attitude* vs. *job*, then smuggles a layout rule ("minimal whitespace, high information density") into the type section where it reads as craft, not clutter |
| Page Structure | 5 named sections | A conversion funnel with a distinct job per section: attitude → offering → credibility → proof → CTA |
| Overall Vibe | 4 adjectives | A deliberate tension: three professional terms closed by one emotional one (belonging) |

## 1.2 The technique that makes it work

Every directive is *negotiable in execution but not in direction*.

- "High-contrast black and white" is a decision a photographer can honor in five different ways.
- "Athletic poses, sweat, muscle definition" tells the art director what the world of the brand is made of.

There is no tech stack, no component names, no hex codes — because it is an **art-direction brief for a human**, not a build spec.

## 1.3 What it omits — and the fixes applied here

| Omission | Fix in the AXIOM brief |
|---|---|
| No typefaces named (unimplementable) | Named display / body / data faces with sizes, leading, tracking |
| No motion rules | Dedicated Motion block: duration, easing, permitted properties, reduced-motion |
| No grid | 12-column grid, 1440 max, content column 10, editorial asymmetry |
| No responsive / accessibility | Stated in Deliverable, down to the 768 breakpoint and WCAG 2.2 AA |
| **No "avoid" list** | The single biggest omission — a brief like that drifts into neo-brutalism on any given day. An explicit avoid list is the reliable guardrail. |
| No tone-of-voice block | Added — premium sites live on copy, not just layout |
| No content examples | Hero copy candidates and fact-strip pattern supplied |

---

# Part 2 — The AXIOM Brief

```
AXIOM — Official Brand Website Brief
"Every answer, attested."

────────────────────────────────────────────
VISUAL STRATEGY

Imagery — the artifact and the act of verification.
Not technology imagery. Evidence imagery.
  · A single page under raking light; ink bleeding into paper fibre
  · Macro graphite, pressure marks, the ghost of an erased line
  · A margin in someone's own hand, correcting the text
  · Cold server aisles falling out of focus behind glass
  · Printed reports, field notebooks, unbranded equipment surfaces
  · Human presence is rare and partial: hands, a shoulder, the back of a
    head at a terminal. Never a posed portrait, never a stock handshake.

Photography — high-contrast, low-key, monochrome still life.
  · One hard key light, deep falloff, subjects emerging from shadow
  · Surfaces: paper fibre, matte aluminium, brushed steel, cold glass
  · Wide negative space. Objects at 70% of frame, never crowded
  · Colour photographed only where it is earned: one warm object
    (a lamp, a tab, a certificate) in a cold frame
  · Shot at 85–135mm equivalent. Shallow depth of field
  · Forbid: glowing brains, circuit-board holograms, blue-purple
    gradient data, abstract particle fields, anyone pointing at a screen

Composition — the artifact is the principal subject.
  · Subject placed on the lower-left third or centred, weighted low
  · Everything else dissolves to tone. Backgrounds read as atmosphere,
    never as information
  · Long horizontal compositions, thin bands of negative space
  · A page of type or a table of figures may act as the "subject" in
    place of a photograph — the grid IS the image
  · Editorial asymmetry. Nothing centred by default

────────────────────────────────────────────
COLOUR PALETTE

Primary
  Ink        #08090A   near-black, the ground
  Graphite   #14161A   panels, surfaces
  Warm Slate #1E2126   raised surfaces, hairline fills

Accent
  Bone       #E8E1D3   the colour of paper — highest-contrast type
  Champagne  #C9A45C   the only saturated light. CTAs, key numerals,
                       active states, one hairline per viewport
  Platinum   #9AA3AD   metadata, labels, borders, secondary type

Background
  Near-black with paper-grain / film noise texture, soft radial
  vignette, no flat fills, no pure #000 anywhere

Discipline
  Accent occupies under 5% of any viewport. Type is the primary visual
  instrument, not colour. No neon. No gradient in the accent.
  Champagne appears once per screen. If it appears twice, one is wrong.

────────────────────────────────────────────
TYPOGRAPHY

Display   Instrument Serif (or Fraunces at optical size 144)
          High-contrast editorial serif. Tight leading (0.92–1.0).
          One display moment per viewport.
          Hero at clamp(3.5rem, 9vw, 8.5rem)

Body      Inter Tight (or Archivo / Söhne)
          Compact, tall x-height, tabular numerals. Body 16–17px,
          line-height 1.55, measure 62–72ch

Data      JetBrains Mono, 11–12px, uppercase, 0.16em tracking
          For metrics, section indices, provenance tags, timestamps.
          Mono is a garnish, not a voice — never set body copy in it

Density   Minimal whitespace at the margins, high information density
          inside. Density arrives as alignment, rhythm, and spec-sheet
          tables — not as boxes, not as clutter.
  · 12-column grid, 1440 max, content column 10
  · Hairline rules at 8–12% opacity. No hard borders, no card grids
  · Two type sizes maximum per component. One accent rule per section

────────────────────────────────────────────
PAGE STRUCTURE

1. HERO — brand attitude + the system, demonstrated live
   Display line, single-sentence subhead, one CTA, and a working
   artifact: a question is asked, the answer streams, citations resolve
   to page thumbnails, the scanned source opens beside the answer.
   Not a video — the real product, running.
   Beneath: a thin mono strip of deployment facts — corpus size, model,
   regions, p95 latency, uptime. Facts, not adjectives.
   Hero copy candidates:
     "Every answer, attested."
     "It is allowed to say no."
     "The engine that shows its work."

2. THE METHOD — the offering, organised by what the team needs to achieve
   Four tracks, each with what it is, what it replaces, what it proves:
     GROUNDING  — answers bound to the source artifact
     RETRIEVAL  — hybrid lexical + semantic, reranked under a budget
     ASSURANCE  — evaluation, faithfulness, abstention
     DEPLOYMENT — cloud-native, observable, scaled on demand
   Present as a divided editorial list with a spec-sheet table per
   track, not as four equal cards.

3. THE ENGINE — credibility
   Profiles of the six components (platform, model, prompt, retrieval,
   service, observability) as you'd profile a team: what it is, what
   it has been proven to do, its measured characteristics.
   Then the people: named engineers and solution architects with real
   backgrounds, years, and certifications. Photograph them the way the
   brief photographs everything else — in the same monochrome, same
   light, same darkness. A team page that shares the product's
   discipline, not a separate stock aesthetic.

4. FIELD REPORTS — proof
   Real transformation case studies, before/after, with the limits
   disclosed: duration, scale, region, what was out of scope.
   Credibility comes from disclosed limits, not superlatives.
   Each report carries a mono metadata line and one dominant image.

5. REQUEST ACCESS — the CTA
   One form. Three intentions: technical deep-dive, architecture
   review, or a scoped pilot. Trust markers — data residency, no
   training on your data, retention, audit trail — stated plainly.
   Restrained footer: no social feeds, no newsletter, no noise.

────────────────────────────────────────────
TONE

Composed. Exacting. Quiet. The confidence of a lab report.
Short declarative sentences. Numbers preferred to adjectives.
We state limits before benefits. We never say "revolutionary".

────────────────────────────────────────────
MOTION

Slow, few, editorial. 600–900ms, cubic-bezier(0.16, 1, 0.3, 1).
One element at a time. Opacity and 8–16px translate only.
No parallax, no scroll-jacking, no count-up counters, no marquees.
Content reveals on entry and then holds still.
Respect prefers-reduced-motion: everything readable without it.

────────────────────────────────────────────
AVOID — non-negotiable

  ✗ Neo-brutalism: thick borders, hard offset shadows, raw monospace
    blocks, sticker/badge grids, harsh flat panels, oversized display
    type set in a grotesque, visible grid rules
  ✗ Neon, gradients in accent colours, glassmorphism
  ✗ 3D isometric illustration, floating UI collages, glowing networks
  ✗ Emoji. Particle fields. Blueprint-grid backgrounds
  ✗ Blue-purple AI clichés, stock-photo handshakes, everyone smiling
  ✗ Uniform card grids. Icon+label+paragraph triplets
  ✗ Centre alignment as a default. Invented testimonials

────────────────────────────────────────────
DELIVERABLE

Single long-form landing page, five sections above.
Responsive: 1440 → 390, content column collapses to 1 at 768.
Accessibility: WCAG 2.2 AA contrast, semantic landmarks, visible focus,
keyboard-operable citations, prefers-reduced-motion honoured.
Ship a type and colour token file alongside the page.
```

---

# Part 3 — Provenance: where each directive comes from

The brief is not a reskin of the source brief's content. Every section is derived from what actually exists in the codebase.

| Brief element | Source of truth in this repository |
|---|---|
| **Hero demo** is the real product | `/api/chat` SSE stream — `sources{phase:lexical→semantic}` → `delta` → `fallback` → `suggestions` → `done` (`src/app/api/chat/route.ts:85-256`) |
| **"It is allowed to say no"** | The literal refusal sentinel `That isn't in these notes.` (`src/lib/answers.ts:3`), which triggers a labelled general-knowledge fallback rather than a fabrication (`src/app/api/chat/route.ts:201-224`) |
| **THE METHOD → four tracks** | The platform / model / prompt / RAG / service / observability layers, compressed into customer-facing outcomes, with the real engineering as the "what it proves" column: hybrid BM25 + dense cosine fused by RRF (`src/lib/retrieve.ts:71`), rerank under a 1,200 ms budget with abort-and-fallback (`src/lib/rerank.ts:63`), faithfulness evaluation (`scripts/eval.ts:120`) |
| **Mono deployment-facts strip** | Measured facts: 82 pages, 162 chunks, 768-dim embeddings, ~3 ms retrieval, ~1,300 ms time-to-first-token (README latency table) |
| **"We state limits before benefits"** | The repo's own discipline — transcription errors are preserved rather than silently corrected (`src/lib/prompt.ts:8-13`), and the system abstains instead of inventing |
| **Bone `#E8E1D3` as the primary accent** | The colour of paper. The answer is rendered in the colour of the source it came from. |
| **Chrome/Platinum hairlines at 8–12%** | The provenance rail's citation pills and section rules, which already carry the page-level trace |
| **"Never a posed portrait"** | The evidence rail is the human presence in this product — the page scan beside the answer (`src/components/evidence.tsx`) |

---

# Part 4 — Design Tokens

> **The authoritative, build-ready version of this section lives in `FRONTEND_PROMPT.md` §3.2** — it maps these tokens into the repository's existing Tailwind 4 `@theme inline` block and the app's `:root`, with the naming (`--color-ax-*`, `--font-ax-*`) and the one additive edit to `src/app/globals.css`. This block below is the design reference; the prompt file is what gets implemented.

Ship alongside the page as `tokens.css` (or an equivalent Tailwind theme extension).

```css
:root {
  /* Primary */
  --ax-ink:        #08090A;
  --ax-graphite:   #14161A;
  --ax-slate:      #1E2126;

  /* Accent */
  --ax-bone:       #E8E1D3;
  --ax-champagne:  #C9A45C;
  --ax-platinum:   #9AA3AD;

  /* Hairlines */
  --ax-rule:       rgb(232 225 211 / 0.10);
  --ax-rule-faint: rgb(232 225 211 / 0.06);

  /* Type scale */
  --ax-display: clamp(3.5rem, 9vw, 8.5rem);
  --ax-h2:      clamp(2.25rem, 4vw, 3.75rem);
  --ax-h3:      clamp(1.5rem, 2vw, 2rem);
  --ax-body:    1rem;          /* 16px */
  --ax-body-lg: 1.0625rem;     /* 17px */
  --ax-data:    0.6875rem;     /* 11px */
  --ax-data-lg: 0.75rem;       /* 12px */

  /* Motion */
  --ax-ease:    cubic-bezier(0.16, 1, 0.3, 1);
  --ax-dur:     700ms;
  --ax-dur-fast: 400ms;

  /* Grid */
  --ax-max:     1440px;
  --ax-cols:    10;
  --ax-gutter:  clamp(1.25rem, 4vw, 4rem);
}

@media (prefers-reduced-motion: reduce) {
  :root { --ax-dur: 0ms; --ax-dur-fast: 0ms; }
}
```

**Font stack (self-host via `next/font`):**

| Role | Face | Fallback |
|---|---|---|
| Display | Instrument Serif | `ui-serif, Georgia, serif` |
| Body | Inter Tight | `ui-sans-serif, system-ui, sans-serif` |
| Data | JetBrains Mono | `ui-monospace, SFMono-Regular, monospace` |

All three are SIL Open Font License — safe to self-host.

---

# Part 5 — Acceptance Checklist

A build is done when every line holds.

**Visual**
- [ ] No element exceeds the avoid list. No thick borders, no hard shadows, no glow, no gradient fills, no emoji.
- [ ] Champagne appears at most once per viewport.
- [ ] Background carries visible grain; no flat `#000` fill anywhere.
- [ ] One dominant image per viewport; backgrounds read as tone.
- [ ] Nothing is centre-aligned by default.

**Type**
- [ ] Exactly one display moment per viewport.
- [ ] Maximum two type sizes per component.
- [ ] No body copy set in mono.
- [ ] Measure capped at 72ch; line-height ≥ 1.5 for body.

**Density**
- [ ] Outer margins generous; interior information dense.
- [ ] No uniform card grid anywhere on the page.
- [ ] Hairlines at 8–12% opacity only.

**Motion**
- [ ] Duration 400–900 ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- [ ] Opacity and ≤16 px translate only.
- [ ] `prefers-reduced-motion` disables all of it, content stays readable.

**Content**
- [ ] Every claim in Field Reports is a measured number with a stated limit.
- [ ] The refusal behaviour is shown, not described.
- [ ] No superlatives. No "revolutionary", "seamless", "next-generation".

**Engineering**
- [ ] 1440 → 390 responsive; content column collapses to 1 at 768.
- [ ] WCAG 2.2 AA contrast verified on every text/background pair.
- [ ] Semantic landmarks; one `h1`; heading order unbroken.
- [ ] Visible focus ring on all interactive elements.
- [ ] Citations keyboard-operable and announced to screen readers.
- [ ] Token file shipped; no hard-coded hex in components.
