# Product

## Register

product

## Users

Students (and the note-taker himself) revising scanned handwritten study notes —
networking, Linux, cloud, DevOps, SAP. They arrive with a specific exam-style
question ("what is MRP?", "difference between hub and router"), short on time,
and need an answer they can trust without re-reading 82+ pages. Attention is
scarce; the product's entire value is trust-per-second.

## Product Purpose

Retrieval-augmented QA over the scanned notebook corpus. Ask a question, get an
answer that cites the exact scanned page it came from, shown beside its verbatim
transcription. Success = the user clicks a citation, sees the ink, and believes
the answer. It is a personal study aid, not an authoritative source — every
answer carries that disclaimer.

## Brand Personality

Scribe & ledger. Three words: attested, exact, lamplit. The interface borrows
the language of testimony and record-keeping ("sworn from the ink", "one
ledger", "attested", "sealed") because the product literally vouches for every
answer with page evidence. Serif (Newsreader) is the notebook's voice — verbatim
transcription and display lines. Sans (Geist) is the assistant. Mono is the
machine: counts, page numbers, stamps. Rubric red is the scribe's seal — one
saturated moment per screen.

## Anti-references

- Generic ChatGPT-style bubble chat UI.
- SaaS dashboards with card grids and metric blocks.
- "Startup landing" grammar: gradient text, glassmorphism, eyebrow kickers on
  every section, numbered 01/02/03 eyebrows.
- Anything cold/blue-gray; no cool grays (warm neutrals only).

## Design Principles

1. **Show the ink.** Whenever a claim can be traced to a page, the trace is one
   click away — provenance beats polish.
2. **The machine speaks mono.** Counts, scores, stamps, and metadata are set in
   mono so provenance is visible at a glance; serif stays reserved for the
   notebook's own voice.
3. **One rubric moment per screen.** The scribe's red appears once, at the most
   important element (CTA, active rule, or seal) — never distributed.
4. **Warmth is structural.** Warm neutrals, hairlines, and a lamplit dark mode;
   never a cold inversion.
5. **Product loads into a task.** Motion conveys state only; 240–420ms,
   opacity + small translate, instant focus.

## Accessibility & Inclusion

- Body text ≥ 4.5:1 contrast; muted text never below that.
- `prefers-reduced-motion`: everything instant.
- Focus always visible (2px Rubric outline, instant).
- Transcription (serif) and generated prose are visually distinct so
  provenance survives both color-blindness and grayscale printing.
