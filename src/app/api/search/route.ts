import { NextResponse } from "next/server";
import { embedQuery } from "@/lib/embed";
import { getIndex, retrieveHybrid } from "@/lib/retrieve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { query, topK = 8 } = (await req.json()) as { query?: string; topK?: number };
    if (!query?.trim()) {
      return NextResponse.json({ error: "query is required" }, { status: 400 });
    }

    const qVec = await embedQuery(query.trim());
    const candidates = retrieveHybrid(query.trim(), qVec, Math.max(1, Math.min(30, topK)));
    const { manifest } = getIndex();

    return NextResponse.json({
      query,
      count: candidates.length,
      totalChunks: manifest.count,
      results: candidates.map((c) => ({
        id: c.chunk.id,
        page: c.chunk.page,
        heading: c.chunk.heading,
        sectionPath: c.chunk.sectionPath,
        text: c.chunk.text,
        denseScore: Number(c.denseScore.toFixed(4)),
        bm25Score: Number(c.bm25Score.toFixed(4)),
        rrfScore: Number(c.rrfScore.toFixed(6)),
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "search failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
