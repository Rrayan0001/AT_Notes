import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb, schema } from "@/db";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const db = getDb();
  await db
    .delete(schema.charts)
    .where(and(eq(schema.charts.id, id), eq(schema.charts.userId, session.user.id)));
  return NextResponse.json({ ok: true });
}
