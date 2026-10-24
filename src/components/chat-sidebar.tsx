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
  const [mounted, setMounted] = useState(false);

  async function load() {
    const res = await fetch("/api/sessions");
    if (res.ok) {
      const j = await res.json();
      setSessions(j.sessions ?? []);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    void load();
  }, [activeId]);

  async function remove(id: string) {
    await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    if (activeId === id) onNew();
    load();
  }

  if (!open) {
    return (
      <div className="hidden w-10 shrink-0 sidebar-panel md:flex md:flex-col md:items-center md:pt-3">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 transition-all hover:scale-110 hover:bg-rubric/10 hover:text-rubric"
          onClick={onToggle}
          aria-label="Open sidebar"
        >
          <PanelLeftOpen className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <aside
      className="hidden w-64 shrink-0 flex-col sidebar-panel md:flex"
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--leaf)]">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Sessions
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 transition-all hover:scale-110 hover:bg-rubric/10 hover:text-rubric"
          onClick={onToggle}
          aria-label="Close sidebar"
        >
          <PanelLeftClose className="size-3.5" />
        </Button>
      </div>

      {/* New chat button */}
      <div className="p-3">
        <button
          onClick={onNew}
          className="group flex w-full items-center gap-2 rounded-none border border-[var(--leaf)] bg-transparent px-3 py-2 text-[13px] text-muted-foreground transition-all hover:border-rubric/40 hover:bg-rubric/5 hover:text-foreground"
        >
          <Plus className="size-3.5 transition-transform group-hover:rotate-90" />
          <span className="font-mono tracking-wide">New chat</span>
        </button>
      </div>

      <div className="h-px bg-[var(--leaf)] mx-3" />

      {/* Session list */}
      <div className="min-h-0 flex-1 overflow-y-auto py-2 px-1.5">
        {sessions.length === 0 && (
          <p className="px-4 py-6 text-[11px] font-mono text-muted-foreground/60 tracking-wide uppercase">
            No sessions yet
          </p>
        )}
        {sessions.map((s) => (
          <div
            key={s.id}
            className={
              "session-row group flex items-center gap-1.5 rounded-sm px-2.5 py-2 mb-0.5 " +
              (s.id === activeId ? "active" : "")
            }
          >
            <button
              type="button"
              onClick={() => onSelect(s.id)}
              className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
            >
              <MessageSquare
                className={
                  "size-3.5 shrink-0 transition-colors " +
                  (s.id === activeId ? "text-rubric" : "text-muted-foreground")
                }
              />
              <span className="truncate text-[12.5px] leading-snug">
                {s.title}
              </span>
            </button>
            <button
              type="button"
              onClick={() => remove(s.id)}
              className="opacity-0 group-hover:opacity-100 transition-all hover:text-rubric rounded p-0.5"
              aria-label="Delete chat"
            >
              <Trash2 className="size-3 text-muted-foreground hover:text-rubric transition-colors" />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
