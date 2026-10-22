"use client";

import { useCallback, useState } from "react";
import { Chat } from "@/components/chat";
import { EvidenceRail } from "@/components/evidence";
import type { AppUser } from "@/components/coming-soon";

/**
 * Two-pane layout: the conversation on the left, the notebook scan plus its
 * transcription on the right. Citation clicks drive the right pane, so an answer
 * and its evidence sit side by side. Below md the rail becomes a full-screen
 * overlay instead. `shelf` names which notebook occupies which page range, for
 * domains whose corpus spans several scans.
 */
export function Workbench({
  user,
  maxPage,
  shelf = [],
  domainLabel,
}: {
  user: AppUser | null;
  maxPage: number;
  shelf?: { from: number; to: number; label: string }[];
  domainLabel?: string;
}) {
  const [page, setPage] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<string[]>([]);

  const openPage = useCallback((p: number, chunkIds?: string[]) => {
    setPage(p);
    setHighlight(chunkIds ?? []);
  }, []);

  const close = useCallback(() => {
    setPage(null);
    setHighlight([]);
  }, []);

  return (
    <div className="paper-field flex h-dvh overflow-hidden">
      <Chat onCite={openPage} onBrowsePages={() => openPage(1)} maxPage={maxPage} user={user} domainLabel={domainLabel} />
      <EvidenceRail
        page={page}
        maxPage={maxPage}
        onPageChange={(p) => openPage(p, [])}
        onClose={close}
        highlight={highlight}
        shelf={shelf}
      />
    </div>
  );
}