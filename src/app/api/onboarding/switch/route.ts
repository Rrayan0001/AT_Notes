import { NextResponse } from "next/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb, schema } from "@/db";
import { isRegistrableDomain, DOMAINS } from "@/lib/domains";
import { isAdminEmail } from "@/lib/admin";
import { COOLDOWN_MS, cooldownState } from "@/lib/domain-switch";

const switchSchema = z.object({
  domain: z.string().refine((value) => value in DOMAINS, "Unknown domain"),
});

/**
 * Live domain-switch capability. The first switch per account is free; after
 * a successful switch a cooldown applies (see domain-switch.ts). GET reports
 * the account's current switch state so the UI can render the countdown
 * without guessing; POST performs the guarded flip.
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getDb();
    const [row] = await db
      .select({ domain: schema.users.domain, domainChangedAt: schema.users.domainChangedAt })
      .from(schema.users)
      .where(eq(schema.users.id, session.user.id))
      .limit(1);
    if (!row) return NextResponse.json({ error: "Account not found." }, { status: 404 });

    const state = cooldownState(row.domainChangedAt);
    return NextResponse.json({
      current: row.domain,
      lastChangedAt: row.domainChangedAt?.toISOString() ?? null,
      canChangeNow: state.canChangeNow,
      cooldownEndsAt: state.cooldownEndsAt?.toISOString() ?? null,
      isAdmin: isAdminEmail(session.user.email),
    });
  } catch (error) {
    console.error("switch status failed:", error);
    return NextResponse.json({ error: "Could not read switch state." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = switchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid payload." },
      { status: 400 },
    );
  }

  const nextDomain = parsed.data.domain;
  if (!isRegistrableDomain(nextDomain)) {
    return NextResponse.json(
      { error: `${DOMAINS[nextDomain].label} is not open for registration yet.` },
      { status: 400 },
    );
  }

  try {
    const db = getDb();
    const [row] = await db
      .select({ domain: schema.users.domain, domainChangedAt: schema.users.domainChangedAt })
      .from(schema.users)
      .where(eq(schema.users.id, session.user.id))
      .limit(1);
    if (!row) return NextResponse.json({ error: "Account not found." }, { status: 404 });
    if (row.domain === nextDomain) {
      return NextResponse.json({ error: "That is already your domain." }, { status: 400 });
    }
    if (!row.domain) {
      return NextResponse.json({ error: "Seal your domain at signup first." }, { status: 400 });
    }

    const state = cooldownState(row.domainChangedAt);
    if (!state.canChangeNow) {
      return NextResponse.json(
        {
          error: `You can switch your domain again after ${state.cooldownEndsAt?.toLocaleString()}.`,
          retryAfterMs: state.cooldownEndsAt ? state.cooldownEndsAt.getTime() - Date.now() : COOLDOWN_MS,
          cooldownEndsAt: state.cooldownEndsAt?.toISOString() ?? null,
        },
        { status: 429 },
      );
    }

    // Guarded update: only flips when the old domain still matches, so a
    // stale tab racing itself can never double-switch.
    const switched = await db
      .update(schema.users)
      .set({ domain: nextDomain, domainChangedAt: new Date() })
      .where(and(eq(schema.users.id, session.user.id), eq(schema.users.domain, row.domain)))
      .returning();
    if (switched.length === 0) {
      return NextResponse.json({ error: "Switch already applied by another session." }, { status: 409 });
    }

    return NextResponse.json({ ok: true, domain: nextDomain }, { status: 200 });
  } catch (error) {
    console.error("domain switch failed:", error);
    return NextResponse.json({ error: "Switch failed. Is DATABASE_URL configured in .env?" }, { status: 500 });
  }
}
