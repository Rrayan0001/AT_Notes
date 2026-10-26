import { NextResponse } from "next/server";
import { z } from "zod";
import { and, eq, desc } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb, schema } from "@/db";
import { guardDomainAccess } from "@/lib/session-guard";

const createSchema = z.object({ title: z.string().trim().max(120).optional() });

export async function GET() {
  // Sessions are domain-stamped, so the list is filtered to the current
  // domain: after a domain switch, the other domain's history hides until
  // the user switches back.
  const guard = await guardDomainAccess();
  if (!guard.ok) return guard.response;
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.chatSessions)
    .where(and(eq(schema.chatSessions.userId, guard.userId), eq(schema.chatSessions.domain, guard.domainId)))
    .orderBy(desc(schema.chatSessions.updatedAt));
  return NextResponse.json({ sessions: rows });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const guard = await guardDomainAccess();
  if (!guard.ok) return guard.response;

  let body: unknown = {};
  try { body = await request.json(); } catch { /* allow empty */ }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const db = getDb();
  const [row] = await db
    .insert(schema.chatSessions)
    .values({
      userId: session.user.id,
      title: parsed.data.title ?? "New chat",
      domain: guard.domainId,
    })
    .returning();
  return NextResponse.json({ session: row }, { status: 201 });
}
