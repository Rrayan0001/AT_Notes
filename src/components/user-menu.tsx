"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      {domain && <Badge variant="secondary">{domain.label}</Badge>}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => void signOut({ callbackUrl: "/login" })}
        title={`Signed in as ${user.email}\n(leave this session)`}
        className="gap-1.5 text-xs text-muted-foreground"
      >
        <LogOut className="size-3.5" />
        <span className="hidden max-w-24 truncate sm:inline">{label}</span>
      </Button>
    </div>
  );
}
