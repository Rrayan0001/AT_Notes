# Pavan Notes — Frontend Design Prompt

> **What this file is.** A complete design direction for the Pavan Notes frontend: the study desk for 82 pages of transcribed handwritten IT notes. It describes what the interface looks like, how it moves, how it speaks, and what it must never become.
>
> **What it deliberately does not contain.** No file paths, no framework names, no API or component references, no build or test commands. This is an art-direction brief for the interface — the kind of document that can be handed to a designer, an image direction, or a code generator, and produce the same result.
>
> **Companion file.** `BRAND_BRIEF.md` holds the analysis of the reference brief and the reasoning behind the choices made here. This file is the operative brief.

---

# BEGIN PROMPT

**PAVAN NOTES — FRONTEND DESIGN DIRECTION**

A quiet, elegant study desk for 82 pages of handwritten IT study notes — networking, Linux, cloud, databases, security, Terraform, prompt engineering, RAG. The interface lets a reader ask a question in their own words and read the answer beside the actual page it came from, with the transcription in full view and its errors left intact.

It should feel like a beautifully typeset archival journal that happens to answer questions. Not a chat app with a document viewer bolted on. Not an AI product. A reading experience with one extraordinary affordance.

---

## VISUAL STRATEGY

**Imagery — the manuscript, not the machine.**

The page is the image. Everything else supports it.

- A single scanned notebook page, lit by one low warm source, the paper faintly yellowed, the ink still wet in places
- Raking light across a page: the shadow of the spiral binding, the faint emboss of writing on the reverse
- Macro of a single handwritten line — the pressure variation where a pen lifted mid-stroke
- The physical book: spine, cover, worn corners, a page mid-turn with the sheet's curve catching light
- A pencil, a ruler, a margin of small corrections in a different hand
- Equipment and desk texture only as minor supporting notes: a laptop lid edge, a ceramic edge, folded paper
- Never: a screen showing a chat, a glowing interface, a hand holding a phone, an abstract "data" visual, a robot, a brain, a network of nodes

**Photography — high-key, warm, shallow.**

- Soft directional daylight or a single warm lamp, raking, never flat
- Warm white balance throughout; the coldest thing in any frame is a shadow
- Shallow depth of field, 85–135mm equivalent, the subject at the lower-left third
- Paper is always the lightest thing in frame; the shadow it casts is the darkest
- Fine grain, visible, welcome. Nothing retouched to glass
- Colour appears in exactly one place per frame — a rubric-red mark, an ochre tab, a pencil — and nowhere else
- Faces are not required. A hand turning a page is more honest than a portrait

**Composition — as a spread, not a screen.**

- The page sits slightly off-axis, never squared to the frame
- Type and image share the frame as two columns of unequal weight — roughly 2:3, never 1:1
- Generous air on one side, dense information on the other
- A thin rule is allowed to divide the frame; a hard border is not
- The reader's eye enters from the lower left and travels up

---

## COLOUR

**Ground and surface**

| | | |
|---|---|---|
| Paper | `#F4F1E9` | The desk. The default background. |
| Vellum | `#FBF9F3` | The leaf. Raised surfaces, the page, panels. |
| Bone | `#E6E0D2` | Rules, quiet fills, inactive elements, borders |

**Ink — the text hierarchy**

| | | |
|---|---|---|
| Ink | `#1C1A16` | Primary text. Full-strength, warm near-black. |
| Graphite | `#4C4740` | Secondary text, the assistant's voice, labels |
| Umber | `#847B6C` | Tertiary, metadata, mono labels, page furniture |

**Accent — used with discipline, one at a time**

| | | |
|---|---|---|
| **Rubric** | `#A63C24` | The scribe's red. Citations, the active state, one rule per screen. |
| Indigo | `#2B4A63` | Functional only: marks the semantic retrieval pass where Rubric marks the keyword pass. One place in the entire interface. |

**Rules and light**

- Hairlines: `rgba(28, 26, 22, 0.13)`. One pixel. These are the only borders.
- One exception to "no shadow": the page image carries a single soft, large, low-opacity shadow so it reads as a physical sheet lifting off the desk. Nothing else casts a shadow.
- Paper grain at 2–3% over the whole ground; a soft vignette at the screen edges, as though lit
- No pure white. No pure black. No grey that is not warm grey

**Dark mode, if present, is not an inversion.**

It is lamplight: a deep warm brown-black `#14120E` ground, bone text, the Rubric warmed to `#C05A3C`, the paper image glowing as though lit from behind. It should feel like the same desk at 1 a.m., not like a different product.

---

## TYPOGRAPHY

**Display — Newsreader**
The product's name, screen titles, section headings, the notebook's subject names. Light weight, large, generous line height. Old-style figures where numerals appear in prose.

**Reading — Newsreader at reading size**
The notebook's own words. The transcription, quoted passages, marginal notes, the colophon. 17–18px, line height 1.6, measure 62–68 characters. Italic is reserved exclusively for the notebook's annotations and marginalia — never for emphasis added by the app.

**Interface — Inter**
The assistant's voice and all chrome. Answers, questions, button labels, panel headings. 15–16.5px, line height 1.6. Tabular lining figures.

**Data — IBM Plex Mono**
Everything the machine knows: page numbers, retrieval scores, timings, counts, match counts, coordinates, timestamps. 11.5–12px. Tabular. Uppercase only for single-word labels.

**The provenance rule — the single most important typographic decision in the product.**

Three voices, three faces, never confused:

- **Serif = the notebook.** Verbatim. Transcribed text, quotations, anything the student actually wrote.
- **Sans = the assistant.** Anything generated, summarised, recommended, or written by the app.
- **Mono = the machine.** Anything numeric, measured, scored, or timed.

A reader should be able to tell at a glance, without reading a word, which words came from the notebook and which came from the model. This is the visual signature of the product and it must never be broken for convenience.

**Density.** Air at the edges, information inside. Long margins, tight columns. Two type sizes maximum per region. Nothing centred.

---

## INTERFACE STRUCTURE

**1 — The Desk (opening screen)**

A printed title page, not a splash screen and not a hero image.

- The product name in Newsreader, large, set left
- One sentence describing what it does, in Inter, Graphite, narrow measure
- The extent of the notebook stated as data in mono: 82 pages · 12 subjects · the subject list, running across the width like a contents line
- A single question field: one line, underlined by a hairline, no box, no border, placeholder in Umber
- Three starting questions drawn from the notebook, set as plain text links separated by middots
- The notebook itself appears as a physical object at one side — cover in Bone, the faint edge of the spiral binding, a slight rotation, the single soft paper-lift shadow. It is a real page of the manuscript, not an icon.

**2 — The Conversation**

One column, 62–68 characters, generous air above and below.

- **The question** — small, Inter, Graphite, preceded by a two-pixel Rubric rule in the margin. A marginal annotation, not a bubble. No filled container, no rounded shape, no alignment to a side.
- **The answer** — Inter at 16.5px, line height 1.62, Ink. Paragraph spacing generous enough to breathe. No headings inside the answer, no bullet lists unless the source itself lists.
- **Citations** — set as the Rubric colour, in Newsreader at reading size, raised slightly above the line, each a small bracketed page marker such as `[page 71]`. Hovering draws a one-pixel Rubric underline. Activating one opens that page in the evidence rail and marks the passage.
- **The refusal** — when the notebook cannot answer, the interface says so plainly and gives the general-knowledge answer separately and visibly. The refusal is set in a Bone-filled block with a one-pixel Bone border, labelled in Rubric mono, *"Not in these notes"*. Beneath it, the general answer in Graphite, labelled *"General knowledge"*, with no citations. The two must never be visually merged — the separation is the honesty.
- **Follow-up suggestions** — plain Inter text links, each preceded by a small Rubric square, separated by a hairline. Never chips, never pills, never a horizontal scroll of cards.
- **Sources** — a collapsed disclosure reading *"6 passages from the notebook"*, in mono. Expanding it lists the passages as short serif quotations with their page numbers, in mono, in Umber.

**3 — The Evidence Rail**

The right-hand panel. This is the product's soul and it must look like paper, not like a preview.

- The scanned page rendered as a physical sheet: warm edge, a two-pixel corner radius, the single soft paper-lift shadow, never cropped by its container, never zoomed past legibility
- The transcription of that page set directly beneath in Newsreader, at reading size, in a measure of about 58 characters
- The cited passage marked the way a careful reader marks a page: a faint Rubric wash across the passage and a one-pixel Rubric rule down its left margin
- Page navigation as small mono numerals — previous, current, next — with a slim vertical progress rule on the far edge, the current position marked in Rubric
- A page-jump field in mono, top right of the rail
- Where the manuscript is legible, a pencil annotation in the original sits in the margin of the scan. The app's own labels never mimic the notebook's handwriting. The two are clearly different hands.

**4 — The Index**

The whole notebook as a table of contents, and the most beautiful screen in the product.

- Twelve subjects, each with its page range in mono, set as a real contents list: subject in Newsreader, pages in mono Umber, one-pixel rules between groups, generous leading
- Hovering a subject raises a small thumbnail of its opening page in the outer margin, in a soft shadow
- No search box at the top. The list is the interface
- A single line at the top states what the index is, and what it is not — *"The transcription, as written. Spelling and errors preserved."*

**5 — The Retrieval Panel**

The instrument panel, and the product's honesty about how it found things.

- The query, in mono
- The ranked passages with three scores beside each — keyword, semantic, merged — as mono numerals, aligned on the decimal
- The two retrieval passes distinguished by exactly one thing: keyword results carry a Rubric marker, semantic results carry an Indigo marker, and the one that won carries both
- A short line at the top states the number of passages read and the number kept
- This panel may show numbers a marketing page would never admit. That is the point of it.

**6 — The Colophon**

- Where the transcription came from, and who made it
- What was preserved: original spelling, grammatical errors, broken formulas, struck-through lines, non-English marginalia, unfinished sentences
- The known physical defects, stated plainly: the blank page, the clipped page edge, the sentence abandoned at a page bottom, the final page that ends on a single word
- The tools used, in mono
- Set entirely in Newsreader, like the back of a book

---

## INTERACTION & STATES

**Streaming.** Answers reveal by paragraph, not by token — a page of text that shimmers into place is unreadable. The passage list appears immediately from the keyword pass, then cross-fades to the semantic pass when it lands.

**While refining.** A one-pixel Rubric progress hairline under the question. Never a spinner, never a skeleton block, never a pulsing dot. The user should never feel the product is busy.

**Empty states.** Instructive and calm. *"Ask about a topic, or open the index."* Never an illustration, never a mascot, never a "Try asking…" carousel.

**Errors.** Plain language, set in Graphite, with what to do next. No exclamation marks, no apology loops, no exclamation-marked apologies.

**Focus.** A one-pixel Rubric outline with two pixels of offset, on every interactive element. Always visible. The citation markers, the page navigation, the question field, the links.

**Hover.** One-pixel underlines and a slow change of colour. Nothing lifts, nothing scales, nothing glows.

---

## MOTION

Slow. Few. Editorial. The page should feel handled, not animated.

- Interface transitions 240–420ms. The page image settling 600ms. Nothing longer.
- Easing that decelerates hard and finishes softly.
- Only opacity and a small vertical offset ever animate. No scale, no rotation, no width, no background-position.
- One thing moves at a time. A page arriving may fade the rail content, and nothing else, at the same time.
- The refusal and general-knowledge blocks do not slide. They appear.
- The focus outline is instant. It must never fade in — a delayed focus ring is an accessibility failure.
- Reduced motion: everything instantaneous, everything still present. The streaming answer still streams, because that is content arriving rather than decoration.

**Forbidden:** parallax, scroll-jacking, counters that count up, marquees, cursor followers, magnetic buttons, animated gradients, background video, skeleton shimmer, staggered card cascades.

---

## VOICE

Quiet, precise, and specific. The confidence of a catalogue, not a pitch.

- Short sentences. No exclamation marks anywhere.
- Prefer the number to the adjective: "82 pages", not "comprehensive"
- State the limit before the benefit. If a passage is uncertain, say so
- The product already has three lines worth protecting, and they should be set beautifully rather than rewritten:
  - *"That isn't in these notes."*
  - *"General knowledge — not from these notes."*
  - *"Not from the notes: this explanation was generated from general knowledge, not the notebook transcription."*
- Labels are lowercase and plain: *"sources"*, *"page 71"*, *"not in these notes"*, *"general knowledge"*
- No emoji. No exclamation. No "Oops". No "Let's go!"

---

## AVOID — NON-NEGOTIABLE

**Against neo-brutalism**
- Thick borders, heavy rules, hard offset shadows, raw monospace blocks, sticker and badge grids, harsh flat colour panels, oversized display type set in a grotesque, visible layout grids

**Against generic AI product**
- Neon, gradients in the accent, glassmorphism, blur-backdrop cards, blue and purple palettes, glowing edges, sparkles, robot or brain iconography, chat-bubble UI, typing-indicator dots, "AI-powered" labelling

**Against generic everything else**
- Emoji, illustration mascots, isometric 3D, blueprint-grid backgrounds, infinite scroll, stock photography of people or laptops, uniform card grids of icon-plus-paragraph, centre-aligned sections, text with a gradient fill

**Against the product's own integrity**
- Do not silently correct the notebook's spelling, broken formulas, clipped lines, or unfinished sentences. Preserve them, and mark them where the reader needs to know
- Do not merge a general-knowledge answer into a notebook answer
- Do not render a citation without a page that opens

---

## MATERIAL & TEXTURE

- Paper grain over the entire ground, 2–3%, slightly stronger on the leaf
- A soft vignette at the screen edges — the desk is lit, the corners fall away
- The scanned page is the only object permitted a shadow
- No glass, no plastic, no chrome, no gradients on a surface
- Every surface is warm. Every shadow is warm. Nothing in the interface is cool grey

---

## DELIVERABLE

Six screens as described, in a 1.4:1 two-column arrangement — conversation at 58%, evidence rail at 42% — collapsing to a single column with the rail below the answer on small screens.

- Every colour, face, size, and spacing value named above is final
- The provenance typographic rule holds in every screen, including the retrieval panel and the colophon
- Contrast at or above WCAG AA for all text; hairlines and grain are decorative and exempt
- One Rubric element per screen, with the Indigo marker permitted only in the retrieval panel
- Every interactive element reachable and operable by keyboard, with a visible Rubric focus ring
- The interface readable and complete with animation and with the network degraded
- Nothing centred as a default. No screen is a grid of identical cards

# END PROMPT

---

## Rationale (not part of the prompt)

| Decision | Why |
|---|---|
| Warm paper ground, not dark | The subject is a paper manuscript. A dark app with a scanned page in it reads as a document viewer; a paper app reads as a study desk. It also avoids the dark-mode AI cliché entirely. |
| Rubric red as the only accent | Red is how scribes marked their authorities — initials, headings, marginal notes. The product's core mechanic is marking which words are authoritative. The accent *is* the provenance system. |
| Indigo as a second, functional accent | The retrieval panel already distinguishes two passes (keyword, then semantic). Giving them two colours solves a real problem and keeps the accent count at two instead of one. |
| Serif / Sans / Mono as three voices | Already the product's strongest idea. Promoting it from a convention to a stated typographic law is what makes the interface look designed rather than assembled. |
| Citations in the serif | A citation is a quotation from the notebook. Setting it in the notebook's own voice keeps the rule consistent: serif means verbatim. |
| The Colophon as a screen | The product's integrity is its differentiator. A product that states its own defects is more credible than one that hides them — and the screen is a strong, unusual place to end. |
| Paragraph-level streaming | Token-level streaming makes text shimmer and is genuinely harder to read. Paragraph reveal is a typographic decision, not a performance one. |
| One shadow in the whole interface | Restricting shadow to the single paper object keeps the illusion of a physical sheet without tipping into card-and-glow territory. |
