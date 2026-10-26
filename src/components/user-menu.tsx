"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, Repeat } from "lucide-react";
import { DOMAINS } from "@/lib/domains";
import { SwitchDomainDialog } from "@/components/switch-domain";
import type { AppUser } from "@/components/coming-soon";

/**
 * Session identity in the chat header: the domain badge (which opens the
 * switch dialog), the account identity, and the one way out.
 */
export function UserMenu({ user }: { user: AppUser }) {
  const [switching, setSwitching] = useState(false);
  const domain = user.domain ? DOMAINS[user.domain] : null;
  const label = (user.name || user.email).trim();
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setSwitching(true)}
        title={`Domain: ${domain?.label ?? user.domain ?? "none"}\n(click to switch — once every 3 days)`}
        className="focus-rubric hidden sm:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 border border-[var(--leaf)] px-2 py-0.5 hover:text-foreground hover:border-foreground/40 transition-colors group"
      >
        {domain?.label ?? user.domain ?? "no domain"}
        <Repeat
          aria-hidden="true"
          className="size-2.5 opacity-40 group-hover:opacity-100 group-hover:text-rubric transition-all"
        />
      </button>
      <button
        onClick={() => void signOut({ callbackUrl: "/login" })}
        title={`Signed in as ${user.email}\n(leave this session)`}
        className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors group px-1.5 py-1"
      >
        <span className="hidden max-w-24 truncate sm:inline">{label}</span>
        <LogOut className="size-3 opacity-50 group-hover:opacity-100 group-hover:text-rubric transition-all" />
      </button>
      {switching && <SwitchDomainDialog user={user} onClose={() => setSwitching(false)} />}
    </div>
  );
}
