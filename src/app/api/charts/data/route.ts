import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { guardDomainAccess } from "@/lib/session-guard";
import { chartData, type ChartMetric } from "@/lib/chart-data";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const guard = await guardDomainAccess();
  if (!guard.ok) return guard.response;

  const metric = new URL(request.url).searchParams.get("metric") as ChartMetric | null;
  if (!metric || !["chunksByVolume", "topHeadings"].includes(metric)) {
    return NextResponse.json({ error: "invalid metric" }, { status: 400 });
  }
  return NextResponse.json({ data: chartData(guard.domainId, metric) });
}
