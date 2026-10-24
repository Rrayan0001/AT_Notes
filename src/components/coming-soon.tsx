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
    <main className="coming-soon-field flex min-h-dvh items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative lined background is handled by .coming-soon-field::before */}

      {/* Content card */}
      <div className="turn-enter relative z-10 max-w-sm">
        {/* Rubric accent line */}
        <div className="mb-6 h-px w-12 bg-rubric" />

        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-4">
          AXIOM
        </p>

        <h1
          className="font-serif text-4xl font-light leading-[1.08] tracking-[-0.02em] text-balance mb-4"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {domainLabel || "Notes"}
        </h1>

        <p className="text-[13.5px] leading-relaxed text-muted-foreground mb-2 max-w-[46ch]">
          Your account is on the{" "}
          <strong className="text-foreground font-medium">{label}</strong> domain. Cross-domain
          access is blocked by design — one email belongs to one domain.
        </p>
        <p className="text-[13.5px] leading-relaxed text-muted-foreground mb-8 max-w-[46ch]">
          The note corpus for {domainLabel || "this domain"} is not yet ingested. Check back soon.
        </p>

        <div className="border-t border-[var(--leaf)] pt-6 flex items-center gap-3">
          {domainRow && (
            <Badge
              variant="secondary"
              className="font-mono text-[10px] tracking-wide rounded-sm border border-[var(--leaf)]"
            >
              {domainRow.label}
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              void signOut({ callbackUrl: "/login" });
            }}
            className="rounded-none border-[var(--leaf)] text-[13px] font-normal hover:border-rubric/40 hover:bg-rubric/5 hover:text-foreground transition-all"
          >
            Change account
          </Button>
        </div>
      </div>
    </main>
  );
}
