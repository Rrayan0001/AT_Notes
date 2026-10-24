"use client";

import { useCallback, useRef, useState } from "react";
import type { ChatMode } from "@/lib/answers";
import type { ConversationMemoryTurn } from "@/lib/memory";
import { parseSuggestions } from "@/lib/suggestions";
import type { FollowupSuggestion, RetrievedSource } from "@/lib/types";

export interface Turn {
  id: string;
  question: string;
  mode: ChatMode;
  answer: string;
  sources: RetrievedSource[];
  /** "lexical" while keyword-only results are shown and refinement is pending. */
  sourcePhase: "none" | "lexical" | "semantic";
  suggestions: FollowupSuggestion[];
  status: "streaming" | "done" | "error";
  error?: string;
}

/**
 * Owns the `/api/chat` SSE stream: turns, streaming state and abort. Split out
 * of the chat component so the workbench layout can host the transcript
 * without duplicating the parser.
 */
export function useChatStream() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const ask = useCallback(
    async (
      question: string,
      options?: { mode?: ChatMode; history?: ConversationMemoryTurn[] }
    ) => {
    const q = question.trim();
    if (!q || busy) return;
    const mode = options?.mode ?? "notes";

    const id = `t${Date.now()}`;
    setBusy(true);
    setTurns((prev) => [
      ...prev,
      {
        id,
        question: q,
        mode,
        answer: "",
        sources: [],
        sourcePhase: "none",
        suggestions: [],
        status: "streaming",
      },
    ]);

    const controller = new AbortController();
    abortRef.current = controller;

    const patch = (fn: (t: Turn) => Turn) =>
      setTurns((prev) => prev.map((t) => (t.id === id ? fn(t) : t)));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, mode, history: options?.history ?? [] }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const detail = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(detail.error ?? `HTTP ${res.status}`);
      }
      if (!res.body) throw new Error("Empty response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        // The trailing fragment may be a partial event; hold it for next read.
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const line = part.split("\n").find((l) => l.startsWith("data: "));
          if (!line) continue;

          let evt: {
            type: string;
            text?: string;
            sources?: RetrievedSource[];
            phase?: Turn["sourcePhase"];
            suggestions?: unknown;
            mode?: ChatMode;
            fallback?: ChatMode;
            error?: string;
          };
          try {
            evt = JSON.parse(line.slice(6));
          } catch {
            continue; // ignore only parse failures
          }

          if (evt.type === "sources" && evt.sources) {
            // Lexical results arrive first and are replaced by the semantic set.
            patch((t) => ({
              ...t,
              sources: evt.sources!,
              sourcePhase: evt.phase ?? "semantic",
              mode: evt.mode ?? t.mode,
            }));
          } else if (evt.type === "suggestions") {
            patch((t) => ({ ...t, suggestions: parseSuggestions(evt.suggestions) }));
          } else if (evt.type === "fallback") {
            // The server sends the new mode under `mode`; accept `fallback` too
            // for older clients of the contract.
            const next = evt.fallback ?? evt.mode;
            if (next) patch((t) => ({ ...t, mode: next }));
          } else if (evt.type === "delta" && evt.text) {
            patch((t) => ({ ...t, answer: t.answer + evt.text }));
          } else if (evt.type === "error") {
            throw new Error(evt.error ?? "stream error");
          }
        }
      }

      patch((t) => ({ ...t, status: "done" }));
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        patch((t) => ({ ...t, status: "done" }));
      } else {
        patch((t) => ({ ...t, status: "error", error: (err as Error).message }));
      }
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy]
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const reset = useCallback((next: Turn[]) => {
    setTurns(next);
    setBusy(false);
  }, []);

  /**
   * Loads persisted history without discarding turns that are streaming right
   * now. Guards the slow-loader race: a question submitted while a previous
   * session's history fetch is still in flight would otherwise be wiped by
   * reset() the moment that fetch resolves.
   */
  const loadTurns = useCallback((next: Turn[]) => {
    setTurns((prev) => {
      const live = prev.filter((t) => t.status === "streaming");
      if (live.length === 0) return next;
      return [...next, ...live];
    });
  }, []);

  return { turns, busy, ask, stop, reset, loadTurns };
}