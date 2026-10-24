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
  /** Which notebook occupies which shelf range, for multi-scan domains. */
  shelf?: { from: number; to: number; label: string }[];
  /** Session domain; sent on image fetches so one URL maps to one domain's
   * scan and a shared cache can never serve another domain's page. */
  domainId?: string | null;
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
  shelf = [],
  domainId,
}: EvidenceRailProps) {
  const [notesState, setNotesState] = useState<NotesState>(EMPTY);
  // Holds the page whose image failed, so switching pages clears it.
  const [imageFailedFor, setImageFailedFor] = useState<number | null>(null);
  // Bumped by the retry button so the image remounts and refetches instead of
  // sitting in its failed state. The nonce also defeats any cached failure.
  const [imageRetry, setImageRetry] = useState(0);
  // The scan loads only after the reader asks for it: the rail opens with a
  // "View PDF" button, and once pressed scans stay on for the session.
  const [scanEnabled, setScanEnabled] = useState(false);
  const [jumpValue, setJumpValue] = useState("");

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
      <aside
        className="hidden w-[26rem] shrink-0 evidence-panel md:flex md:flex-col overflow-hidden"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 47px, color-mix(in srgb, var(--foreground) 3%, transparent) 48px), var(--card)",
        }}
      >
        <div className="flex flex-1 flex-col justify-end px-10 pb-14">
          {/* Rubric accent */}
          <div className="mb-6 h-px w-8 bg-rubric" />
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground/50 mb-5">
            Evidence rail
          </p>
          <p
            className="font-serif text-2xl font-light leading-[1.12] tracking-[-0.01em] text-balance text-foreground/80 mb-4"
            style={{ fontVariationSettings: '"opsz" 24' }}
          >
            The source,
            <br />open beside the answer.
          </p>
          <p className="text-[12.5px] leading-relaxed text-muted-foreground max-w-[34ch]">
            Click a citation like{" "}
            <span className="font-mono text-[11px] border border-[var(--leaf)] px-1 py-px">
              p25
            </span>{" "}
            in an answer to open the original handwritten notebook page here.
          </p>
        </div>
      </aside>
    );
  }

  const loading = notesState.notes.length === 0 && notesState.error === null;
  const imageFailed = imageFailedFor === page;
  // For multi-notebook shelves, name the scan a page physically lives in.
  const book = shelf.find((v) => page >= v.from && page <= v.to)?.label;

  return (
    // Below md there is no room for two columns, so the rail covers the
    // transcript. The close button in its header returns to the answer.
    <aside className="fixed inset-0 z-30 flex w-full flex-col bg-background md:static md:z-auto md:w-[26rem] evidence-panel turn-enter">
      <div className="flex items-center gap-2 border-b border-[var(--leaf)] px-3.5 py-2.5">
        <span className="font-mono text-[11px] tracking-wide">
          <span className="text-rubric">p</span>{page}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/50">of {maxPage}</span>
        {book && (
          <span className="ml-1 hidden truncate text-xs text-muted-foreground lg:inline">
            · {book}
          </span>
        )}

        <div className="ml-auto flex items-center gap-0.5">
          <input
            type="number"
            min={1}
            max={maxPage}
            value={jumpValue}
            placeholder={String(page)}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const n = Number(jumpValue);
                if (Number.isInteger(n) && n >= 1 && n <= maxPage) {
                  onPageChange(n);
                  setJumpValue("");
                }
              }
            }}
            className="h-7 w-12 rounded-md border bg-background px-1 text-center font-mono text-xs outline-none focus:ring-1 focus:ring-ring"
            aria-label="Jump to page"
          />
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
            {!scanEnabled ? (
              <button
                type="button"
                onClick={() => setScanEnabled(true)}
                className="focus-rubric flex w-full flex-col items-center gap-2 px-3 py-10 text-center"
              >
                <FileText className="size-6 text-rubric" />
                <span className="text-sm font-medium">
                  View PDF — page {page}
                  {book ? ` (${book})` : ""}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  opens the scanned notebook page
                </span>
              </button>
            ) : imageFailed ? (
              <div className="space-y-2 px-3 py-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Page image unavailable. It may not have deployed — try again.
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
              </div>
            ) : (
              <Image
                key={`${page}-${imageRetry}`}
                src={`/api/page/${page}?w=760${domainId ? `&d=${domainId}` : ""}${imageRetry > 0 ? `&r=${imageRetry}` : ""}`}
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
                    "rounded-sm border p-3 transition-all duration-300 " +
                    (isHighlighted
                      ? "border-rubric/30 bg-rubric/5 shadow-[inset_3px_0_0_var(--rubric)]"
                      : "border-[var(--leaf)] bg-background/80")
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