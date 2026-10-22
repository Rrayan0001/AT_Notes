"use client";

import { signOut } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DOMAINS } from "@/lib/domains";

export interface AppUser {
  name: string;
  email: string;
  domain?: string | null;
}

export function ComingSoon({ domainLabel, user }: { domainLabel: string; user: AppUser | null }) {
  const domainRow = user?.domain ? DOMAINS[user.domain] : null;
  const label = domainRow?.label ?? "this domain";
  return (
    <main className="paper-field flex min-h-dvh items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">AXIOM</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{domainLabel || "Notes"}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your account is on the <strong className="text-foreground">{label}</strong> domain. Cross-domain
          access is blocked by design — one email belongs to one domain. The note corpus for{" "}
          {domainLabel || "this domain"} is not ingested yet; check back soon.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2">
          {domainRow && <Badge variant="secondary">{domainRow.label}</Badge>}
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              void signOut({ callbackUrl: "/login" });
            }}
          >
            Change account
          </Button>
        </div>
      </div>
    </main>
  );
}
