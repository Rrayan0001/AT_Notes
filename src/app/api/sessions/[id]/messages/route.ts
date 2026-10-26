import { NextResponse } from "next/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { guardDomainAccess } from "@/lib/session-guard";

const msgSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
  mode: z.string().optional(),
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = msgSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const [row] = await db
    .insert(schema.chatMessages)
    .values({ sessionId: id, role: parsed.data.role, content: parsed.data.content, mode: parsed.data.mode ?? null })
    .returning();

  // bump session updatedAt + title from first user message if still default
  await db
    .update(schema.chatSessions)
    .set({ updatedAt: new Date() })
    .where(eq(schema.chatSessions.id, id));

  return NextResponse.json({ message: row }, { status: 201 });
}
