import { getIndex } from "@/lib/retrieve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export interface PageNote {
  id: string;
  heading: string;
  sectionPath: string[];
  text: string;
}

/**
 * Transcription for one notebook page, so the evidence rail can show the page's
 * own text alongside its scan. Served per page rather than shipping the whole
 * 750KB index to the browser.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ n: string }> }
) {
  const { n } = await params;
  const page = Number(n);

  if (!Number.isInteger(page)) {
    return Response.json({ error: "page must be an integer" }, { status: 400 });
  }

  const { chunks } = getIndex();
  const notes: PageNote[] = chunks
    .filter((c) => c.page === page)
    .map((c) => ({ id: c.id, heading: c.heading, sectionPath: c.sectionPath, text: c.text }));

  if (notes.length === 0) {
    return Response.json({ error: `no transcription for page ${page}` }, { status: 404 });
  }

  return Response.json({ page, notes });
}