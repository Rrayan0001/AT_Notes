"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUp,
  BookOpen,
  Loader2,
  MessageCircleQuestion,
  Square,
  Sparkles,
  X,
} from "lucide-react";
import { BuiltinActionType, Renderer, type ActionEvent } from "@openuidev/react-lang";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MarkdownView } from "@/components/markdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { library } from "@/lib/openui";
import openuiSpec from "@/lib/openui.spec.json";
import type { AppUser } from "@/components/coming-soon";
import { useChatStream, type Turn } from "@/lib/use-chat-stream";
import { selectConversationMemory } from "@/lib/memory";
import { starterQuestionsFor } from "@/lib/syllabus";
import type { RetrievedSource } from "@/lib/types";

export interface ChatProps {
  onCite: (page: number, chunkIds?: string[]) => void;
  onBrowsePages: () => void;
  maxPage: number;
  user: AppUser | null;
  domainLabel?: string;
  sessionId: string | null;
  onSessionChange: (id: string) => void;
}

export function Chat({ onCite, onBrowsePages, user, domainLabel, sessionId, onSessionChange }: ChatProps) {
  const [input, setInput] = useState("");
  const [photoOpen, setPhotoOpen] = useState(false);
  const { turns, busy, ask, stop, reset, loadTurns } = useChatStream();
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const stickToBottomRef = useRef(true);
  const persistedRef = useRef<Set<string>>(new Set());
  const loadedSessionRef = useRef<string | null>(null);

  const submitQuestion = async (question: string) => {
    if (!question.trim() || busy) return;
    setInput("");
    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    let sid = sessionId;
    if (!sid) {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: question.slice(0, 60) }),
      });
      if (res.ok) {
        const j = await res.json();
        sid = j.session?.id ?? null;
        if (sid) {
          loadedSessionRef.current = sid;
          onSessionChange(sid);
        }
      }
    }
    ask(question, { mode: "notes", history: selectConversationMemory(turns, "notes", question) });
  };

  const submitInput = submitQuestion;

  // Load history when session changes
  useEffect(() => {
    if (!sessionId) {
      loadedSessionRef.current = null;
      persistedRef.current = new Set();
      reset([]);
      return;
    }
    if (loadedSessionRef.current === sessionId) return;
    loadedSessionRef.current = sessionId;
    persistedRef.current = new Set();
    let cancelled = false;
    fetch(`/api/sessions/${sessionId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        const msgs = d.messages ?? [];
        const turnsBuilt: Turn[] = [];
        let cur: Turn | null = null;
        for (const m of msgs) {
          if (m.role === "user") {
            if (cur) turnsBuilt.push(cur);
            cur = {
              id: m.id,
              question: m.content,
              mode: (m.mode as "notes" | "general") ?? "notes",
              answer: "",
              sources: [],
              sourcePhase: "none",
              suggestions: [],
              status: "done",
            };
          } else if (cur) {
            cur.answer = m.content;
          }
        }
        if (cur) turnsBuilt.push(cur);
        loadTurns(turnsBuilt);
        turnsBuilt.forEach((t) => persistedRef.current.add(t.id));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [sessionId, reset, loadTurns]);

  // Persist completed turns
  useEffect(() => {
    if (!sessionId) return;
    for (const t of turns) {
      if (t.status !== "done") continue;
      if (persistedRef.current.has(t.id)) continue;
      persistedRef.current.add(t.id);
      fetch(`/api/sessions/${sessionId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "user", content: t.question, mode: t.mode }),
      }).catch(() => {});
      if (t.answer) {
        fetch(`/api/sessions/${sessionId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "assistant", content: t.answer, mode: t.mode }),
        }).catch(() => {});
      }
    }
  }, [turns, sessionId]);

  // Sticky scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !stickToBottomRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [turns]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
      stickToBottomRef.current = nearBottom;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Photo preview keyboard
  useEffect(() => {
    if (!photoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhotoOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [photoOpen]);

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-[var(--leaf)] px-5 py-3.5 bg-background/70 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setPhotoOpen(true)}
          aria-label="Preview profile photo"
          title="Preview profile photo"
          className="shrink-0 cursor-zoom-in rounded-full outline-none transition-all ring-offset-background focus-visible:ring-2 focus-visible:ring-ring hover:opacity-90 hover:scale-105 hover:ring-2 hover:ring-rubric/30"
        >
          <Image
            src="/profile.png"
            alt="Profile"
            width={36}
            height={36}
            className="size-9 rounded-full border border-[var(--leaf)] object-cover object-top shadow-sm"
          />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-semibold tracking-tight">
            {domainLabel ?? "Notes"}
          </h1>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
            Every answer, attested.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {user && <UserMenu user={user} />}
          <Button
            onClick={onBrowsePages}
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs text-muted-foreground md:hidden hover:text-rubric hover:bg-rubric/8"
          >
            <BookOpen className="size-3.5" />
            Pages
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Conversation */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-5">
          {turns.length === 0 && (
            <div className="flex min-h-[calc(100vh-10rem)] items-center">
              <EmptyState onPick={submitQuestion} domainId={user?.domain} />
            </div>
          )}

          {turns.length > 0 && (
            <div className="space-y-10 py-6">
              {turns.map((turn, i) => (
                <TurnView
                  key={turn.id}
                  turn={turn}
                  onCite={onCite}
                  busy={busy}
                  onFollowup={submitQuestion}
                  index={i}
                />
              ))}
            </div>
          )}
          <div ref={bottomRef} className="pb-4" />
        </div>
      </div>

      {/* Composer */}
      <footer className="border-t border-[var(--leaf)] bg-background/80 px-5 py-3.5 backdrop-blur-md">
        <div className="mx-auto w-full max-w-2xl">
          <div className="composer-bar flex items-end gap-2 border border-border bg-card p-1.5">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                // Auto-grow
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitInput(input);
                }
              }}
              placeholder="Ask anything in the notes…"
              className="max-h-40 min-h-[38px] resize-none border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0 text-[14.5px] placeholder:text-muted-foreground/50"
              rows={1}
            />
            {busy ? (
              <Button
                onClick={stop}
                variant="outline"
                size="icon"
                aria-label="Stop generating"
                className="shrink-0 rounded-sm border-[var(--rubric-glow)] hover:bg-[color-mix(in_srgb,var(--rubric)_8%,transparent)] hover:text-rubric transition-all"
              >
                <Square className="size-3.5 fill-current" />
              </Button>
            ) : (
              <Button
                onClick={() => submitInput(input)}
                disabled={!input.trim()}
                size="icon"
                aria-label="Ask"
                className="shrink-0 rounded-sm bg-rubric text-[#F5EFE4] hover:bg-[var(--rubric-deep)] transition-all disabled:opacity-30 hover:shadow-[0_0_0_2px_var(--rubric-glow)]"
              >
                <ArrowUp className="size-4" />
              </Button>
            )}
          </div>
          <p className="mt-2 text-center font-mono text-[10px] tracking-wide text-muted-foreground/50">
            Enter to ask · Shift+Enter for a new line
          </p>
        </div>
      </footer>

      {/* Photo modal */}
      {photoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Profile photo preview"
          onClick={() => setPhotoOpen(false)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          style={{ animation: "turn-rise 240ms ease both" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-auto max-w-[92vw] cursor-default overflow-hidden rounded-sm border border-[var(--leaf)] bg-background shadow-2xl"
          >
            <Button
              onClick={() => setPhotoOpen(false)}
              variant="secondary"
              size="icon-sm"
              aria-label="Close photo preview"
              className="absolute right-2 top-2 z-10 rounded-full shadow"
            >
              <X className="size-4" />
            </Button>
            <Image
              src="/profile.png"
              alt="Profile photo preview"
              width={1034}
              height={1600}
              priority
              className="h-auto max-h-[85vh] w-auto max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({
  onPick,
  domainId,
}: {
  onPick: (q: string) => void;
  domainId?: string | null;
}) {
  return (
    <div className="pt-6 turn-enter">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-rubric mb-3">
          ready
        </p>
        <h2 className="font-serif text-3xl font-light tracking-tight leading-tight text-balance">
          What do you want to know?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[44ch]">
          Ask a question and I&rsquo;ll cite the exact notebook page it came from.
        </p>
      </div>

      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        Try one of these
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {starterQuestionsFor(domainId).map((ex, i) => (
          <button
            key={ex}
            onClick={() => onPick(ex)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
            }}
            className="example-card group rounded-lg border border-border bg-card px-3.5 py-3 text-left text-[13px] leading-snug"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <Sparkles className="mb-2 size-3.5 text-muted-foreground/50 transition-colors group-hover:text-rubric" />
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}

function TurnView({
  turn,
  onCite,
  busy,
  onFollowup,
  index,
}: {
  turn: Turn;
  onCite: ChatProps["onCite"];
  busy: boolean;
  onFollowup: (question: string) => void;
  index: number;
}) {
  const isGeneral = turn.mode === "general";
  const suggestions = turn.suggestions ?? [];

  return (
    <div
      className="space-y-3.5 turn-enter"
      style={{ animationDelay: `${Math.min(index * 40, 200)}ms` }}
    >
      {/* Question */}
      <div className="flex items-baseline gap-2.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-rubric/70 shrink-0">
          {isGeneral ? "general" : "ask"}
        </span>
        <p className="text-[15.5px] font-medium leading-snug">{turn.question}</p>
      </div>

      {/* Sources */}
      {turn.sources.length > 0 && (
        <div className="source-enter">
          <Sources sources={turn.sources} phase={turn.sourcePhase} onCite={onCite} />
        </div>
      )}

      {/* General knowledge badge */}
      {isGeneral && turn.answer && (
        <p className="flex items-center gap-2 rounded-sm border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
          <Sparkles className="size-3 shrink-0" />
          General knowledge — not from these notes.
        </p>
      )}

      {/* Answer */}
      {turn.answer && (
        <AnswerView
          answer={turn.answer}
          isStreaming={turn.status === "streaming"}
          onCite={
            isGeneral
              ? undefined
              : (page) =>
                  onCite(
                    page,
                    turn.sources.filter((s) => s.page === page).map((s) => s.id)
                  )
          }
          onFollowup={onFollowup}
        />
      )}

      {/* Suggestions */}
      {turn.status === "done" && suggestions.length > 0 && (
        <div className="suggestion-enter rounded-lg border border-[var(--leaf)] bg-card/60 p-3">
          <p className="mb-2.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <MessageCircleQuestion className="size-3.5" />
            Follow-ups
          </p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.question}
                size="sm"
                variant="outline"
                disabled={busy}
                onClick={() => onFollowup(suggestion.question)}
                className="source-chip h-auto max-w-full justify-start gap-1.5 whitespace-normal py-1.5 text-left text-xs font-normal rounded-sm"
                title={suggestion.question}
              >
                {suggestion.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Streaming placeholder */}
      {turn.status === "streaming" && !turn.answer && (
        <p className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="shimmer inline-block h-3 w-28 rounded-sm" />
          <span className="font-mono text-[11px] text-muted-foreground/60">
            {turn.sourcePhase === "lexical" ? "Refining…" : "Searching notes…"}
          </span>
        </p>
      )}

      {/* Error */}
      {turn.status === "error" && (
        <p className="rounded-sm border border-destructive/25 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
          <span className="mr-2 font-mono text-[10px] tracking-[0.18em] uppercase opacity-80">error</span>
          {turn.error}
        </p>
      )}
    </div>
  );
}

function looksLikeOpenuiLang(text: string): boolean {
  const specRoot = openuiSpec.root;
  const firstLine =
    text
      .slice(0, 200)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0)[0] ?? "";
  return (
    text.includes("]]>openui:") ||
    (typeof specRoot === "string" && new RegExp(`^${specRoot}\\s*(\\(|\\{)`).test(firstLine))
  );
}

function AnswerView({
  answer,
  isStreaming,
  onCite,
  onFollowup,
}: {
  answer: string;
  isStreaming: boolean;
  onCite?: (page: number, chunkIds?: string[]) => void;
  onFollowup: (question: string) => void;
}) {
  if (!looksLikeOpenuiLang(answer)) {
    return (
      <MarkdownView onCite={onCite} className={`text-[14px] ${isStreaming ? "typing-cursor" : ""}`}>
        {answer}
      </MarkdownView>
    );
  }

  const onAction = (event: ActionEvent) => {
    if (event.type === BuiltinActionType.ContinueConversation) {
      const lines = [`User clicked: ${event.humanFriendlyMessage}`];
      if (event.formState) lines.push(`Form values: ${JSON.stringify(event.formState)}`);
      onFollowup(lines.join("\n"));
    } else if (event.type === BuiltinActionType.OpenUrl) {
      const url = String(event.params?.url ?? "");
      if (/^https?:\/\//i.test(url)) window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="text-[14px]">
      <Renderer
        response={answer}
        library={library}
        isStreaming={isStreaming}
        onAction={onAction}
      />
    </div>
  );
}

function Sources({
  sources,
  phase,
  onCite,
}: {
  sources: RetrievedSource[];
  phase: Turn["sourcePhase"];
  onCite: ChatProps["onCite"];
}) {
  const [open, setOpen] = useState(false);
  const refining = phase === "lexical";

  return (
    <div className="rounded-lg border border-[var(--leaf)] bg-card/50 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/30"
      >
        <BookOpen className="size-3.5 shrink-0" />
        <span>
          {sources.length} {sources.length === 1 ? "match" : "matches"} from the notebook
        </span>
        <span className="ml-auto flex items-center gap-2">
          {refining && (
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-primary uppercase">
              <Loader2 className="size-3 animate-spin" />
              refining
            </span>
          )}
          {!refining && (
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
              {open ? "hide" : "show"}
            </span>
          )}
        </span>
      </button>

      {open && (
        <div className="space-y-px border-t border-[var(--leaf)]">
          {sources.map((s, i) => (
            <button
              key={`${s.page}-${i}`}
              onClick={() => onCite(s.page, [s.id])}
              className="source-chip flex w-full items-baseline gap-2.5 px-3.5 py-2 text-left"
            >
              <Badge
                variant="outline"
                className="shrink-0 font-mono text-[10px] border-[var(--leaf)] rounded-sm"
              >
                p{s.page}
              </Badge>
              <span className="min-w-0 flex-1 truncate text-xs">{s.heading}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}