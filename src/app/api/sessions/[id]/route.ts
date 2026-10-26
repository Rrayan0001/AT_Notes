import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { guardDomainAccess } from "@/lib/session-guard";

/**
 * A session row can only be read or deleted while the caller's current
 * domain matches the domain the session was created in — history is patient,
 * and it comes back after switching domains again.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await guardDomainAccess();
  if (!guard.ok) return guard.response;
  const { id } = await params;
  const db = getDb();
  const [s] = await db
    .select()
    .from(schema.chatSessions)
    .where(and(eq(schema.chatSessions.id, id), eq(schema.chatSessions.userId, guard.userId), eq(schema.chatSessions.domain, guard.domainId)))
    .limit(1);
  if (!s) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const msgs = await db.select().from(schema.chatMessages).where(eq(schema.chatMessages.sessionId, id)).orderBy(schema.chatMessages.createdAt);
  return NextResponse.json({ session: s, messages: msgs });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await guardDomainAccess();
  if (!guard.ok) return guard.response;
  const { id } = await params;
  const db = getDb();
  const [s] = await db
    .select()
    .from(schema.chatSessions)
    .where(and(eq(schema.chatSessions.id, id), eq(schema.chatSessions.userId, guard.userId), eq(schema.chatSessions.domain, guard.domainId)))
    .limit(1);
  if (!s) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await db.delete(schema.chatSessions).where(eq(schema.chatSessions.id, id));
  return NextResponse.json({ ok: true });
}
