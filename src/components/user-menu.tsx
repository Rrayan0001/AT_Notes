"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { DOMAINS } from "@/lib/domains";
import type { AppUser } from "@/components/coming-soon";

/**
 * Session identity in the chat header: the locked domain badge, the
 * account identity, and the one way out.
 */
export function UserMenu({ user }: { user: AppUser }) {
  const domain = user.domain ? DOMAINS[user.domain] : null;
  const label = (user.name || user.email).trim();
  return (
    <div className="flex items-center gap-1.5">
      {domain && (
        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 border border-[var(--leaf)] px-2 py-0.5">
          {domain.label}
        </span>
      )}
      <button
        onClick={() => void signOut({ callbackUrl: "/login" })}
        title={`Signed in as ${user.email}\n(leave this session)`}
        className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors group px-1.5 py-1"
      >
        <span className="hidden max-w-24 truncate sm:inline">{label}</span>
        <LogOut className="size-3 opacity-50 group-hover:opacity-100 group-hover:text-rubric transition-all" />
      </button>
    </div>
  );
}
