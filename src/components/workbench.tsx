"use client";

import { useCallback, useState } from "react";
import { Chat } from "@/components/chat";
import { ChatSidebar } from "@/components/chat-sidebar";
import { EvidenceRail } from "@/components/evidence";
import type { AppUser } from "@/components/coming-soon";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const openPage = useCallback((p: number, ids?: string[]) => {
    setPage(p);
    setHighlight(ids ?? []);
  }, []);

  const close = useCallback(() => {
    setPage(null);
    setHighlight([]);
  }, []);

  return (
    <div className="paper-field flex h-dvh overflow-hidden">
      <ChatSidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        activeId={sessionId}
        onSelect={setSessionId}
        onNew={() => setSessionId(null)}
      />
      <Chat
        onCite={openPage}
        onBrowsePages={() => openPage(1)}
        maxPage={maxPage}
        user={user}
        domainLabel={domainLabel}
        sessionId={sessionId}
        onSessionChange={setSessionId}
      />
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
