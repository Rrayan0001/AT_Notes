# Automation Tools Notes RAG

Retrieval-augmented QA over `data/Pavan_Notes_Transcription.md` — 82 pages of
handwritten IT study notes (networking, Linux, cloud, databases, security,
Terraform, prompt engineering, RAG), with the original scan kept alongside for
verification.

Built with Next.js 16. Chat and reranking run on Groq; embeddings run on
Google's Gemini API.

## Setup

```bash
npm install
printf 'GROQ_API_KEY=gsk_...\nGOOGLE_API_KEY=AIza...\n' > .env
npm run index     # chunk + embed, writes src/data/index.json
npm run dev
```

Two keys are required: Groq serves the chat and rerank models, Gemini serves
embeddings. Groq's catalog contains no embedding model at all, so the two
cannot be combined.

`npm run index` is idempotent — it re-embeds only when the markdown or the
embedding model changes. It also runs automatically on `npm run build`, so a
fresh clone or a Vercel deploy needs no manual step.

### Page images

The evidence panel renders the scanned page on demand from `pawan_notes.pdf`
using poppler and ImageMagick. Without them the app still works, just without
scans:

```bash
brew install poppler imagemagick
```

`pawan_notes.pdf` is not committed — it is a 116MB scan. Drop it in the project
root (alongside `package.json`) to enable the evidence panel; everything else,
including transcription search and chat, works without it.

Renders are cached in `.cache/pages/` as WebP at three widths.

## How retrieval works

1. **Chunking** (`src/lib/chunk.ts`) — heading-scoped, not fixed-size. Splits on
   `## Page N` → `###` → `####`, folds `####` subsections into their parent
   `###`, and keeps code fences atomic. Produces ~162 chunks averaging 33
   words, all 82 pages covered.

2. **Embedding** (`src/lib/embed.ts`, `src/lib/gemini.ts`) —
   `gemini-embedding-001` at 768 dims, L2-normalised. Gemini takes the
   retrieval role as a parameter (`RETRIEVAL_DOCUMENT` / `RETRIEVAL_QUERY`)
   rather than as a text prefix, so documents and queries are embedded
   differently on purpose. Free-tier quota is enforced per minute, so calls
   retry with backoff.

3. **Hybrid retrieval** (`src/lib/retrieve.ts`) — BM25 (`src/lib/bm25.ts`) plus
   dense cosine, fused with Reciprocal Rank Fusion. No vector database: 162 ×
   768 floats is ~750 KB and scans in under a millisecond. Follow-up references
   such as “that output” are resolved against the previous three completed notes
   answers before retrieval.

   Keyword-only ranking is also available on its own via `retrieveSparse`. BM25
   needs no embedding call, so `/api/chat` streams those results first and the
   evidence panel paints in milliseconds while the ~600ms query embedding is
   still in flight. The semantic results replace them when ready.

4. **Rerank** (`src/lib/rerank.ts`) — `gpt-oss-20b` orders the top 12 candidates,
   keeping the best 5. Two deliberate choices:

   - **No `response_format`.** gpt-oss-20b on Groq fails server-side JSON schema
     validation most of the time (measured 1/3 strict, 0/3 non-strict, 3/3
     unconstrained), so the prompt asks for comma-separated ids and they are read
     back positionally. Ids the model skips are appended so the context window is
     never short.
   - **A 1,200ms budget.** Reranking improves ordering but is not required for
     correctness, so a slow or throttled call falls back to retrieval order
     instead of holding the response.

5. **Answer** (`src/lib/prompt.ts`) — `gpt-oss-120b`, temperature 0, streamed
   over SSE. Answer tokens are coalesced into ~40ms frames rather than one frame
   per token. The system prompt forbids silently correcting the notes'
   transcription artifacts (misspellings, broken formulas, truncated lines) and
   requires citing `[page N]`. If the retrieved passages do not answer the
   question, the model must reply exactly `That isn't in these notes.` That
   response automatically triggers a labeled general-knowledge fallback in the
   same answer. An explicit request such as “forget about the notes” bypasses
   retrieval entirely and does not show notebook sources. Previous answers supply
   follow-up context, but facts and citations must still come from the newly
   retrieved passages.

## Latency

Measured against the 82-page corpus. The vector scan was never the bottleneck.

| Stage | Time |
|---|---|
| Dense scan + BM25 + RRF | 3ms |
| Keyword-only results streamed | 0–22ms |
| Query embedding (Gemini, cached after first) | ~600ms cold, ~0ms warm |
| Rerank | ~670ms |
| Chat time-to-first-token | ~1,300ms |

An interactive query waits ~0.5s for sources and ~2.5s for the first token.
Interactive embedding retries are capped at one 500ms attempt, so a rate-limited
query fails fast; the patient 5/10/20/40s retry ladder is reserved for batch
indexing. Repeated queries are served from a 200-entry LRU embedding cache.

## Interface

Two panes. The left is the conversation; the right is the evidence rail showing
the scanned page beside its transcription. Clicking a `[page N]` citation in an
answer opens that page and highlights the passage the answer came from. Below
`md` the rail becomes a full-screen overlay. Completed notebook answers also
include follow-up buttons for more detail, continuing to the next chunk, and
jumping to related retrieved topics.

Transcribed notebook text is set in a serif and generated prose in Geist, so
provenance is visible at a glance.

## Endpoints

| Route | Method | Purpose |
|---|---|---|
| `/api/chat` | POST | SSE stream: `sources` with `phase` `lexical` then `semantic`, then `delta` events, an optional `suggestions` event, then `done`. A notes-mode missing answer automatically streams a labeled general-knowledge fallback before `done`. Accepts relevant completed turns as `history` for follow-up questions. |
| `/api/search` | POST | Ranked chunks only, no LLM call — for inspecting retrieval |
| `/api/page/[n]` | GET | Page scan as WebP, `?w=` one of 360, 760, 1600 |
| `/api/notes/[n]` | GET | Transcription for one page |

## Scripts

```bash
npm run chunk          # regenerate chunks.json and print stats
npm run index          # build/refresh vector index
npm run index:force    # force re-embed
npm run eval           # RAGAS-style scoring over 44 questions
npm run eval -- 5 --verbose   # first 5 cases, dump answers for failures
npm run eval -- --start=19 --limit=5  # cases 19-23 only, for resuming after quota errors
npm run eval -- --retrieval-only      # retrieval metrics only, no chat or judge calls
npm run typecheck
npm run lint
```

`npm run eval` reports context precision, context recall, answer relevancy and
faithfulness — the same four metrics the notes describe on page 78.

## Notes

- `src/data/index.json` is git-ignored and generated. It is imported statically
  rather than read from disk, so no `outputFileTracingIncludes` config is needed
  for Vercel deployment.
- `src/lib/retrieve.ts` deliberately does **not** import `server-only`.
  `scripts/eval.ts` loads it outside Next.js, where that guard throws at
  import time. Only the two route handlers reach it inside the app.
- `.env` / `.env.local` hold `GROQ_API_KEY` and `GOOGLE_API_KEY`. Never rename
  either to `NEXT_PUBLIC_*` — that would ship the key to the browser.
- `/api/page/[n]` shells out to `pdftocairo` and `magick`, so it needs the
  `nodejs` runtime and cannot run on a serverless target without those binaries.