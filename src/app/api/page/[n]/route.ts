import { spawn } from "node:child_process";
import { existsSync, mkdirSync, renameSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getIndex } from "@/lib/retrieve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PDF_PATH = join(process.cwd(), "pawan_notes.pdf");
const CACHE_DIR = join(process.cwd(), ".cache", "pages");

const ALLOWED_WIDTHS = new Set([360, 760, 1600]);
const CACHE_MAX_AGE = 60 * 60 * 24 * 365;

function run(
  cmd: string,
  args: string[],
  stdin?: Buffer
): Promise<{ code: number; stdout: Buffer; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["pipe", "pipe", "pipe"] });
    const out: Buffer[] = [];
    const err: Buffer[] = [];

    child.stdout.on("data", (d: Buffer) => out.push(d));
    child.stderr.on("data", (d: Buffer) => err.push(d));
    child.on("error", reject);
    child.on("close", (code) =>
      resolve({
        code: code ?? -1,
        stdout: Buffer.concat(out),
        stderr: Buffer.concat(err).toString(),
      })
    );

    if (stdin) child.stdin.end(stdin);
    else child.stdin.end();
  });
}

async function renderPage(page: number, width: number): Promise<Buffer> {
  // pdftocairo writes JPEG to stdout with `-`; ImageMagick re-encodes that
  // stream to WebP without either side touching the disk. This build of cwebp
  // has no -stdin, so magick is the converter.
  const jpeg = await run(
    "pdftocairo",
    ["-f", String(page), "-l", String(page), "-jpeg", "-singlefile", "-scale-to", String(width), PDF_PATH, "-"]
  );
  if (jpeg.code !== 0 || jpeg.stdout.length === 0) {
    throw new Error(`pdftocairo failed (${jpeg.code}): ${jpeg.stderr.slice(0, 200)}`);
  }

  const webp = await run("magick", ["jpeg:-", "-quality", "76", "webp:-"], jpeg.stdout);
  if (webp.code !== 0 || webp.stdout.length === 0) {
    throw new Error(`magick failed (${webp.code}): ${webp.stderr.slice(0, 200)}`);
  }
  return webp.stdout;
}

/**
 * Renders currently in flight, keyed by page and width. Concurrent requests for
 * the same uncached page share one render instead of each spawning pdftocairo,
 * which previously raced on a single shared temp path and 503'd the losers.
 */
const inflight = new Map<string, Promise<Buffer>>();
let renderCounter = 0;

/**
 * Cached by page and width. The write goes to a unique temp path before an
 * atomic rename, so a request arriving mid-render can neither read a partial
 * file nor collide on the temp name.
 */
async function cached(page: number, width: number): Promise<Buffer> {
  mkdirSync(CACHE_DIR, { recursive: true });
  const finalPath = join(CACHE_DIR, `${page}-${width}.webp`);

  if (existsSync(finalPath)) return readFileSync(finalPath);

  const key = `${page}-${width}`;
  const existing = inflight.get(key);
  if (existing) return existing;

  const job = renderPage(page, width).then(async (bytes) => {
    const tmpPath = `${finalPath}.${process.pid}.${renderCounter++}.${Math.random()
      .toString(36)
      .slice(2)}.tmp`;
    const { writeFile } = await import("node:fs/promises");
    await writeFile(tmpPath, bytes);
    renameSync(tmpPath, finalPath);
    return bytes;
  });
  // A failed render must not stay cached: the next request retries for real.
  job.then(
    () => {
      if (inflight.get(key) === job) inflight.delete(key);
    },
    () => {
      if (inflight.get(key) === job) inflight.delete(key);
    }
  );
  inflight.set(key, job);
  return job;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ n: string }> }
) {
  const { n } = await params;
  const page = Number(n);

  if (!Number.isInteger(page)) {
    return Response.json({ error: "page must be an integer" }, { status: 400 });
  }

  const { chunks } = getIndex();
  const maxPage = chunks.reduce((m, c) => Math.max(m, c.page), 0);
  if (page < 1 || page > maxPage) {
    return Response.json({ error: `page must be between 1 and ${maxPage}` }, { status: 400 });
  }

  const width = Number(new URL(req.url).searchParams.get("w") ?? 1600);
  if (!ALLOWED_WIDTHS.has(width)) {
    return Response.json(
      { error: `w must be one of ${[...ALLOWED_WIDTHS].join(", ")}` },
      { status: 400 }
    );
  }

  if (!existsSync(PDF_PATH)) {
    return Response.json({ error: `notebook scan not found at ${PDF_PATH}` }, { status: 503 });
  }

  try {
    const bytes = await cached(page, width);
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": String(bytes.length),
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}, immutable`,
      },
    });
  } catch (err) {
    // Poppler and cwebp are external binaries. If they are missing the rest of
    // the app still works, so degrade with a clear message instead of a 500.
    const message = err instanceof Error ? err.message : "unknown error";
    return Response.json(
      { error: `page render failed: ${message}. Install poppler and imagemagick: brew install poppler imagemagick` },
      { status: 503 }
    );
  }
}