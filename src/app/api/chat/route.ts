import { CHAT_MODEL, getGroq } from "@/lib/groq";
import { embedQuery } from "@/lib/embed";
import { getIndex, retrieveHybrid, retrieveSparse, toSources } from "@/lib/retrieve";
import { rerankWithStatus } from "@/lib/rerank";
import {
  FALLBACK_SYSTEM_PROMPT,
  GENERAL_SYSTEM_PROMPT,
  SYSTEM_PROMPT,
  buildFallbackPrompt,
  buildGeneralPrompt,
  buildUserPrompt,
} from "@/lib/prompt";
import { isExplicitGeneralRequest, isMissingFromNotes, type ChatMode } from "@/lib/answers";
import {
  resolveExplicitGeneralQuestion,
  resolveRetrievalQuestion,
  type ConversationMemoryTurn,
} from "@/lib/memory";
import { buildFollowupSuggestions } from "@/lib/suggestions";
import type { RetrievedSource, ScoredChunk } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const TOP_K_FETCH = 20;
const TOP_K_CONTEXT = 5;
/** Rerank sees a smaller pool than retrieval, which keeps the full pool as fallback. */
const TOP_K_RERANK = 12;
const LEXICAL_TOP_K = 5;
const MAX_MEMORY_TURNS = 3;
const MAX_MEMORY_CHARS = 1200;
/** Tokens are coalesced into frames this often instead of one SSE frame per token. */
const FLUSH_INTERVAL_MS = 40;

function parseHistory(value: unknown, mode: ChatMode): ConversationMemoryTurn[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (turn): turn is { question: unknown; answer: unknown; mode: unknown } =>
        typeof turn === "object" && turn !== null
    )
    .filter((turn) => (mode === "general" ? true : turn.mode === "notes"))
    .slice(-MAX_MEMORY_TURNS)
    .map((turn): ConversationMemoryTurn => ({
      question: String(turn.question ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, MAX_MEMORY_CHARS),
      answer: String(turn.answer ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, MAX_MEMORY_CHARS),
      mode: turn.mode === "general" ? "general" : "notes",
    }))
    .filter((turn) => turn.question.length > 0 && turn.answer.length > 0);
}

export async function POST(req: Request) {
  let question: string;
  let mode: ChatMode;
  let history: ConversationMemoryTurn[];
  let explicitGeneral = false;
  try {
    const body = (await req.json()) as {
      query?: string;
      mode?: ChatMode;
      history?: unknown;
    };
    question = (body.query ?? "").trim();
    if (!question) throw new Error("empty query");
    mode = body.mode === "general" ? "general" : "notes";
    // A caller may explicitly ask for general knowledge inside a notes-mode
    // request. Route that intent around retrieval before any sources leak.
    explicitGeneral = mode === "notes" && isExplicitGeneralRequest(question);
    if (explicitGeneral) mode = "general";
    history = parseHistory(body.history, mode);
  } catch {
    return Response.json({ error: "query is required" }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // One SSE frame per token produced hundreds of frames per answer. Buffer
      // briefly and flush in batches; the rendered text is identical.
      let pending = "";
      let flushTimer: ReturnType<typeof setTimeout> | null = null;
      const flush = () => {
        if (flushTimer) {
          clearTimeout(flushTimer);
          flushTimer = null;
        }
        if (pending.length === 0) return;
        const text = pending;
        pending = "";
        send({ type: "delta", text });
      };
      const emit = (text: string) => {
        pending += text;
        if (!flushTimer) {
          flushTimer = setTimeout(flush, FLUSH_INTERVAL_MS);
        }
      };

      try {
        let messages: { role: "system" | "user"; content: string }[];
        let effectiveQuestion = question;
        let candidates: ScoredChunk[] = [];
        let ranked: ScoredChunk[] = [];
        let hadFallback = false;

        if (mode === "general") {
          // Retrieval is intentionally skipped so notebook passages cannot leak
          // into a general-knowledge answer.
          const { manifest } = getIndex();
          send({ type: "sources", phase: "none", sources: [], totalChunks: manifest.count, mode });
          if (explicitGeneral) {
            effectiveQuestion = resolveExplicitGeneralQuestion(question, history);
            messages = [
              { role: "system", content: GENERAL_SYSTEM_PROMPT },
              { role: "user", content: buildGeneralPrompt(effectiveQuestion, []) },
            ];
          } else {
            effectiveQuestion = resolveRetrievalQuestion(question, history);
            messages = [
              { role: "system", content: GENERAL_SYSTEM_PROMPT },
              { role: "user", content: buildGeneralPrompt(effectiveQuestion, history) },
            ];
          }
        } else {
          effectiveQuestion = resolveRetrievalQuestion(question, history);
          const { manifest } = getIndex();

          // BM25 needs no embedding call, so evidence can be shown immediately
          // while the ~600ms query embedding is still in flight. Skipped when the
          // query shares no vocabulary with the notes, since an empty panel is
          // worse than none.
          const lexical = retrieveSparse(effectiveQuestion, LEXICAL_TOP_K);
          if (lexical.length > 0) {
            send({
              type: "sources",
              phase: "lexical",
              sources: toSources(lexical),
              totalChunks: manifest.count,
              mode,
            });
          }

          const qVec = await embedQuery(effectiveQuestion);
          candidates = retrieveHybrid(effectiveQuestion, qVec, TOP_K_FETCH);
          // rerankWithStatus always returns `topK` chunks, falling back to the
          // head of the pool it was given, so the context window never shrinks.
          ranked = (
            await rerankWithStatus(
              effectiveQuestion,
              candidates.slice(0, TOP_K_RERANK),
              TOP_K_CONTEXT
            )
          ).chunks;

          const sources: RetrievedSource[] = toSources(ranked);

          send({
            type: "sources",
            phase: "semantic",
            sources,
            totalChunks: manifest.count,
            mode,
          });
          messages = [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: buildUserPrompt(effectiveQuestion, sources, history) },
          ];
        }

        const groq = getGroq();
        const completion = await groq.chat.completions.create({
          model: CHAT_MODEL,
          temperature: 0,
          stream: true,
          messages,
        });

        let notesAnswer: string | null = mode === "notes" ? "" : null;
        for await (const part of completion) {
          const delta = part.choices[0]?.delta?.content;
          if (delta) {
            if (notesAnswer !== null) notesAnswer += delta;
            emit(delta);
          }
        }
        flush();

        // The exact missing-note response is the automatic fallback trigger. It
        // is streamed above, then followed by a labeled general explanation.
        if (mode === "notes" && notesAnswer !== null && isMissingFromNotes(notesAnswer)) {
          hadFallback = true;
          send({ type: "fallback", mode: "general" });
          const fallback = await groq.chat.completions.create({
            model: CHAT_MODEL,
            temperature: 0,
            stream: true,
            messages: [
              { role: "system", content: FALLBACK_SYSTEM_PROMPT },
              { role: "user", content: buildFallbackPrompt(effectiveQuestion, history) },
            ],
          });

          emit("\n\n");
          for await (const part of fallback) {
            const delta = part.choices[0]?.delta?.content;
            if (delta) emit(delta);
          }
          emit(
            "\n\n> **Not from the notes:** This detailed explanation was generated from general knowledge, not the notebook transcription."
          );
        }
        flush();

        if (mode === "notes") {
          const { chunks } = getIndex();
          const suggestions = buildFollowupSuggestions({
            effectiveQuestion,
            candidates,
            ranked,
            chunks,
            hadFallback,
          });
          if (suggestions.length > 0) send({ type: "suggestions", suggestions });
        }

        send({ type: "done" });
      } catch (err) {
        // Stream errors arrive after headers are sent, so surface them as an
        // SSE event rather than relying on the HTTP status code.
        send({ type: "error", error: err instanceof Error ? err.message : "request failed" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
