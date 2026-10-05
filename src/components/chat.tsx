"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, BookOpen, Loader2, MessageCircleQuestion, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownView } from "@/components/markdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { useChatStream, type Turn } from "@/lib/use-chat-stream";
import { selectConversationMemory } from "@/lib/memory";
import type { RetrievedSource } from "@/lib/types";

const EXAMPLES = [
  "How do I calculate the number of valid hosts in a Class C subnet?",
  "Difference between hub and switch?",
  "What is an embedding and how is it used in RAG?",
  "IaaS vs PaaS vs SaaS?",
];

export interface ChatProps {
  onCite: (page: number, chunkIds?: string[]) => void;
  onBrowsePages: () => void;
  maxPage: number;
}

export function Chat({ onCite, onBrowsePages, maxPage }: ChatProps) {
  const [input, setInput] = useState("");
  const { turns, busy, ask, stop } = useChatStream();
  const bottomRef = useRef<HTMLDivElement>(null);

  const submitQuestion = (question: string) => {
    if (!question.trim() || busy) return;
    setInput("");
    ask(question, { mode: "notes", history: selectConversationMemory(turns, "notes", question) });
  };

  // Clear the composer as soon as its text becomes a question. Empty input is
  // left alone so an ignored Enter press does not erase whitespace being edited.
  const submitInput = (question: string) => submitQuestion(question);

  // Keep the newest token in view as the answer streams.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns]);

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col">
      <header className="flex items-start gap-3 border-b px-5 py-3.5">
        <div className="min-w-0">
          <h1 className="text-[15px] font-semibold tracking-tight">Automation Tools Notes</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {maxPage} pages of transcribed study notes. Every claim cites the notebook page.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button
            onClick={onBrowsePages}
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs text-muted-foreground md:hidden"
          >
            <BookOpen className="size-3.5" />
            Pages
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <ScrollArea className="min-h-0 flex-1">
        <div className="mx-auto w-full max-w-2xl px-5 py-6">
          {turns.length === 0 && <EmptyState onPick={submitQuestion} />}

          {turns.length > 0 && (
            <div className="space-y-9">
              {turns.map((turn) => (
                <TurnView
                  key={turn.id}
                  turn={turn}
                  onCite={onCite}
                  busy={busy}
                  onFollowup={submitQuestion}
                />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <footer className="border-t bg-background/80 px-5 py-3 backdrop-blur">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-1.5 shadow-sm transition-colors focus-within:border-primary/40">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitInput(input);
                }
              }}
              placeholder="Ask about anything in the notes…"
              className="max-h-40 min-h-[38px] resize-none border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0"
              rows={1}
            />
            {busy ? (
              <Button onClick={stop} variant="outline" size="icon" aria-label="Stop generating">
                <Square className="size-3.5 fill-current" />
              </Button>
            ) : (
              <Button
                onClick={() => submitInput(input)}
                disabled={!input.trim()}
                size="icon"
                aria-label="Ask"
                className="rounded-lg"
              >
                <ArrowUp className="size-4" />
              </Button>
            )}
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Enter to ask · Shift+Enter for a new line · If the notes lack detail, a labeled
            general explanation follows automatically
          </p>
        </div>
      </footer>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="pt-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight">What do you want to look up?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ask a question and the answer will cite the exact notebook page it came from.
        </p>
      </div>
      <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Try one of these
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => onPick(ex)}
            className="group rounded-lg border bg-card px-3 py-2.5 text-left text-[13px] leading-snug transition-colors hover:border-primary/40 hover:bg-accent/40"
          >
            <BookOpen className="mb-1.5 size-3.5 text-muted-foreground/60 transition-colors group-hover:text-primary" />
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
}: {
  turn: Turn;
  onCite: ChatProps["onCite"];
  busy: boolean;
  onFollowup: (question: string) => void;
}) {
  const isGeneral = turn.mode === "general";
  const suggestions = turn.suggestions ?? [];

  return (
    <div className="space-y-3.5">
      <div className="flex items-baseline gap-2.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
          {isGeneral ? "general" : "ask"}
        </span>
        <p className="text-[15px] font-medium leading-snug">{turn.question}</p>
      </div>

      {turn.sources.length > 0 && (
        <Sources sources={turn.sources} phase={turn.sourcePhase} onCite={onCite} />
      )}

      {isGeneral && turn.answer && (
        <p className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
          General knowledge — not from these notes.
        </p>
      )}

      {turn.answer && (
        <MarkdownView
          // A citation names a page, not a chunk, so highlight whichever of
          // this turn's sources came from that page. General answers have no
          // notebook citations, so their chips stay inert.
          onCite={
            isGeneral
              ? undefined
              : (page) =>
                  onCite(
                    page,
                    turn.sources.filter((s) => s.page === page).map((s) => s.id)
                  )
          }
          className="text-[14px]"
        >
          {turn.answer}
        </MarkdownView>
      )}

      {turn.status === "done" && suggestions.length > 0 && (
        <div className="rounded-lg border bg-card/60 p-2.5">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            <MessageCircleQuestion className="size-3.5" />
            Suggested follow-ups
          </p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.question}
                size="sm"
                variant="outline"
                disabled={busy}
                onClick={() => onFollowup(suggestion.question)}
                className="h-auto max-w-full justify-start gap-1.5 whitespace-normal py-1.5 text-left text-xs font-normal"
                title={suggestion.question}
              >
                {suggestion.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {turn.status === "streaming" && !turn.answer && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="shimmer inline-block h-3 w-24 rounded" />
          {turn.sourcePhase === "lexical" ? "Refining results…" : "Searching notes…"}
        </p>
      )}

      {turn.status === "error" && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {turn.error}
        </p>
      )}
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
    <div className="rounded-lg border bg-card/60">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <BookOpen className="size-3.5" />
        <span>
          {sources.length} keyword {sources.length === 1 ? "match" : "matches"} from the notebook
        </span>
        <span className="ml-auto flex items-center gap-2">
          {refining && (
            <span className="flex items-center gap-1 text-primary">
              <Loader2 className="size-3 animate-spin" />
              refining
            </span>
          )}
          {!refining && (open ? "Hide" : "Show")}
        </span>
      </button>

      {open && (
        <div className="space-y-1.5 border-t p-2">
          {sources.map((s, i) => (
            <button
              key={`${s.page}-${i}`}
              onClick={() => onCite(s.page, [s.id])}
              className="flex w-full items-baseline gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/60"
            >
              <Badge variant="outline" className="shrink-0 font-mono">
                p{s.page}
              </Badge>
              <span className="min-w-0 flex-1 truncate text-xs font-medium">{s.heading}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}