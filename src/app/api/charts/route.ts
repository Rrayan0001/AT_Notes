import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb, schema } from "@/db";
import { guardDomainAccess } from "@/lib/session-guard";
import { chartData, type ChartMetric } from "@/lib/chart-data";

const createSchema = z.object({
  title: z.string().trim().min(1).max(120),
  type: z.enum(["bar", "pie", "line"]),
  metric: z.enum(["chunksByVolume", "topHeadings"]),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.charts)
    .where(eq(schema.charts.userId, session.user.id));
  return NextResponse.json({ charts: rows });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const guard = await guardDomainAccess();
  if (!guard.ok) return guard.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid payload." },
      { status: 400 }
    );
  }

  const db = getDb();
  const [row] = await db
    .insert(schema.charts)
    .values({
      userId: session.user.id,
      title: parsed.data.title,
      type: parsed.data.type,
      metric: parsed.data.metric,
    })
    .returning();
  // Attach preview data for immediate render.
  const data = chartData(guard.domainId, parsed.data.metric as ChartMetric);
  return NextResponse.json({ chart: row, data }, { status: 201 });
}
