import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb, schema } from "@/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const db = getDb();
  const [s] = await db.select().from(schema.chatSessions).where(eq(schema.chatSessions.id, id)).limit(1);
  if (!s || s.userId !== session.user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const msgs = await db.select().from(schema.chatMessages).where(eq(schema.chatMessages.sessionId, id)).orderBy(schema.chatMessages.createdAt);
  return NextResponse.json({ session: s, messages: msgs });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const db = getDb();
  const [s] = await db.select().from(schema.chatSessions).where(eq(schema.chatSessions.id, id)).limit(1);
  if (!s || s.userId !== session.user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await db.delete(schema.chatSessions).where(eq(schema.chatSessions.id, id));
  return NextResponse.json({ ok: true });
}
