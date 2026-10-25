import { NextResponse } from "next/server";
import { z } from "zod";
import { and, eq, isNull } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb, schema } from "@/db";
import { isRegistrableDomain, DOMAINS } from "@/lib/domains";

const booking = z.object({
  domain: z.string().refine((value) => value in DOMAINS, "Unknown domain"),
});

/**
 * One-time domain seal for first-time Google users. The session must exist
 * and its user row must still have no domain; the write is guarded at the
 * SQL level (WHERE domain IS NULL) so "one email = one domain, forever"
 * cannot be broken by a stale tab or a double submit.
 */
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

  const parsed = booking.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid payload." },
      { status: 400 },
    );
  }

  const { domain } = parsed.data;
  if (!isRegistrableDomain(domain)) {
    return NextResponse.json({ error: `${DOMAINS[domain].label} is not open for registration yet.` }, { status: 400 });
  }

  try {
    const db = getDb();
    const sealed = await db
      .update(schema.users)
      .set({ domain })
      .where(and(eq(schema.users.id, session.user.id), isNull(schema.users.domain)))
      .returning();

    if (sealed.length === 0) {
      // Row already owns a domain (stale tab racing itself), or the session
      // user is unknown to the database. Either way there is nothing to do.
      return NextResponse.json({ error: "This session already belongs to a domain." }, { status: 409 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("onboarding failed:", error);
    return NextResponse.json({ error: "Sealing failed. Is DATABASE_URL configured in .env?" }, { status: 500 });
  }
}
