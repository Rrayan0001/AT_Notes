"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FileText, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownView } from "@/components/markdown";
import type { PageNote } from "@/app/api/notes/[n]/route";

interface EvidenceRailProps {
  page: number | null;
  maxPage: number;
  onPageChange: (page: number) => void;
  onClose: () => void;
  highlight?: string[];
}

interface NotesState {
  page: number | null;
  notes: PageNote[];
  error: string | null;
}

const EMPTY: NotesState = { page: null, notes: [], error: null };

/**
 * The provenance half of the app: the scanned page beside its transcription, so
 * any claim in an answer can be checked by eye.
 */
export function EvidenceRail({
  page,
  maxPage,
  onPageChange,
  onClose,
  highlight,
}: EvidenceRailProps) {
  const [notesState, setNotesState] = useState<NotesState>(EMPTY);
  // Holds the page whose image failed, so switching pages clears it.
  const [imageFailedFor, setImageFailedFor] = useState<number | null>(null);
  // Bumped by the retry button so the image remounts and refetches instead of
  // sitting in its failed state. The nonce also defeats any cached failure.
  const [imageRetry, setImageRetry] = useState(0);

  // Adjusting state during render is React's documented alternative to an
  // effect that only exists to reset state on a prop change.
  if (notesState.page !== page) setNotesState({ page, notes: [], error: null });
  if (imageFailedFor !== null && imageFailedFor !== page) {
    setImageFailedFor(null);
    setImageRetry(0);
  }

  useEffect(() => {
    if (page === null) return;
    let cancelled = false;

    fetch(`/api/notes/${page}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d: { notes: PageNote[] }) => {
        if (!cancelled) setNotesState({ page, notes: d.notes, error: null });
      })
      .catch(() => {
        if (!cancelled) {
          setNotesState({
            page,
            notes: [],
            error: "Transcription unavailable for this page.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  if (page === null) {
    return (
      <aside className="hidden w-[26rem] shrink-0 border-l bg-card/40 md:flex md:flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 text-center">
          <FileText className="size-6 text-muted-foreground/50" />
          <p className="text-sm font-medium">No page selected</p>
          <p className="text-xs text-muted-foreground">
            Click a citation like <span className="font-mono">p25</span> in an answer, or open a
            source, to see the original handwritten page here.
          </p>
        </div>
      </aside>
    );
  }

  const loading = notesState.notes.length === 0 && notesState.error === null;
  const imageFailed = imageFailedFor === page;

  return (
    // Below md there is no room for two columns, so the rail covers the
    // transcript. The close button in its header returns to the answer.
    <aside className="fixed inset-0 z-30 flex w-full flex-col bg-background md:static md:z-auto md:w-[26rem] md:border-l md:bg-card/40">
      <div className="flex items-center gap-1 border-b px-3 py-2">
        <span className="font-mono text-xs font-medium">page {page}</span>
        <span className="text-xs text-muted-foreground">of {maxPage}</span>

        <div className="ml-auto flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            disabled={page >= maxPage}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={onClose}
            aria-label="Close evidence panel"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-3">
          <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
            {imageFailed ? (
              <div className="space-y-2 px-3 py-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Page image unavailable. This can happen if the server was
                  restarting — try again before reinstalling anything.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImageFailedFor(null);
                    setImageRetry((n) => n + 1);
                  }}
                >
                  Retry
                </Button>
                <p className="text-[11px] text-muted-foreground/70">
                  Still failing? The server needs poppler and ImageMagick:{" "}
                  <span className="font-mono">brew install poppler imagemagick</span>
                </p>
              </div>
            ) : (
              <Image
                key={`${page}-${imageRetry}`}
                src={`/api/page/${page}?w=760${imageRetry > 0 ? `&r=${imageRetry}` : ""}`}
                alt={`Scanned notebook page ${page}`}
                width={760}
                height={985}
                unoptimized
                onError={() => setImageFailedFor(page)}
                className="h-auto w-full"
              />
            )}
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Transcription
            </p>

            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="size-3 animate-spin" /> Loading…
              </div>
            )}

            {notesState.error && (
              <p className="text-xs text-destructive">{notesState.error}</p>
            )}

            {notesState.notes.map((note) => {
              const isHighlighted = highlight?.includes(note.id);
              return (
                <section
                  key={note.id}
                  className={
                    "rounded-lg border p-3 transition-colors " +
                    (isHighlighted
                      ? "border-primary/40 bg-accent/50"
                      : "border-border bg-background")
                  }
                >
                  <h3 className="mb-1.5 text-sm font-semibold">
                    {note.heading}
                    {isHighlighted && (
                      <span className="ml-2 align-middle text-[10px] font-medium uppercase tracking-wide text-accent-foreground">
                        cited
                      </span>
                    )}
                  </h3>
                  {note.sectionPath.length > 1 && (
                    <p className="mb-1.5 text-[11px] text-muted-foreground">
                      {note.sectionPath.join(" › ")}
                    </p>
                  )}
                  {/* Serif marks this as the notebook's own words rather than
                      generated prose. Rendered as markdown because the
                      transcription contains tables and code fences that would
                      otherwise show as raw pipes. */}
                  <MarkdownView className="font-serif text-[13px] leading-relaxed text-foreground/90">
                    {note.text}
                  </MarkdownView>
                </section>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}