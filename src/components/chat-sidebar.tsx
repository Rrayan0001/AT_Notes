"use client";

import { useEffect, useState } from "react";
import { Plus, MessageSquare, Trash2, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Session {
  id: string;
  title: string;
  updatedAt: string;
}

export function ChatSidebar({
  open,
  onToggle,
  activeId,
  onSelect,
  onNew,
}: {
  open: boolean;
  onToggle: () => void;
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
}) {
  const [sessions, setSessions] = useState<Session[]>([]);

  async function load() {
    const res = await fetch("/api/sessions");
    if (res.ok) {
      const j = await res.json();
      setSessions(j.sessions ?? []);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [activeId]);

  async function remove(id: string) {
    await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    if (activeId === id) onNew();
    load();
  }

  if (!open) {
    return (
      <div className="hidden w-10 shrink-0 border-r bg-card/40 md:flex md:flex-col md:items-center md:pt-3">
        <Button variant="ghost" size="icon" className="size-8" onClick={onToggle} aria-label="Open sidebar">
          <PanelLeftOpen className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-card/40 md:flex">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Chats</span>
        <Button variant="ghost" size="icon" className="size-7" onClick={onToggle} aria-label="Close sidebar">
          <PanelLeftClose className="size-4" />
        </Button>
      </div>
      <div className="p-2">
        <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={onNew}>
          <Plus className="size-3.5" /> New chat
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        {sessions.map((s) => (
          <div
            key={s.id}
            className={
              "group flex items-center gap-1 rounded-md px-2 py-1.5 text-sm " +
              (s.id === activeId ? "bg-accent" : "hover:bg-accent/50")
            }
          >
            <button
              type="button"
              onClick={() => onSelect(s.id)}
              className="flex min-w-0 flex-1 items-center gap-2 text-left"
            >
              <MessageSquare className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="truncate">{s.title}</span>
            </button>
            <button
              type="button"
              onClick={() => remove(s.id)}
              className="opacity-0 group-hover:opacity-100"
              aria-label="Delete chat"
            >
              <Trash2 className="size-3.5 text-muted-foreground" />
            </button>
          </div>
        ))}
        {sessions.length === 0 && (
          <p className="px-2 py-4 text-xs text-muted-foreground">No chats yet.</p>
        )}
      </div>
    </aside>
  );
}
