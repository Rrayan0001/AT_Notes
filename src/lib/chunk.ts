import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Chunk } from "./types";

export const SOURCE_PATH = join(process.cwd(), "data", "Pavan_Notes_Transcription.md");

const MIN_WORDS = 40;
const MAX_WORDS = 300;
const FRONTMATTER_END = /^## Page 1$/m;

interface Block {
  page: number;
  heading: string;
  depth: number;
  sectionPath: string[];
  lines: string[];
}

function wordCount(text: string): number {
  const m = text.match(/[\p{L}\p{N}]+/gu);
  return m ? m.length : 0;
}

function cleanHeading(raw: string): string {
  return raw
    .replace(/^#+\s*/, "")
    .replace(/[:\-*]+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseBlocks(raw: string): Block[] {
  const start = raw.search(FRONTMATTER_END);
  const body = start === -1 ? raw : raw.slice(start);
  const lines = body.split("\n");

  const blocks: Block[] = [];
  let page = 0;
  const sectionPath: string[] = [];
  const pathDepth: number[] = [];
  let current: Block | null = null;
  let inFence = false;

  const flush = () => {
    if (current) blocks.push(current);
    current = null;
  };

  const startBlock = (depth: number, heading: string) => {
    current = { page, heading, depth, sectionPath: [...sectionPath], lines: [] };
  };

  for (const line of lines) {
    if (/^```/.test(line.trim())) inFence = !inFence;

    if (!inFence) {
      const pageMatch = /^##\s+Page\s+(\d+)\s*$/.exec(line);
      if (pageMatch) {
        flush();
        page = Number(pageMatch[1]);
        sectionPath.length = 0;
        pathDepth.length = 0;
        continue;
      }

      const h3 = /^###\s+(.*)$/.exec(line);
      const h4 = /^####\s+(.*)$/.exec(line);
      if (h3 || h4) {
        flush();
        const text = cleanHeading((h3 ?? h4)![1]);
        const depth = h3 ? 3 : 4;
        // Pop sections shallower than this heading, then descend. A repeated
        // `#### Advantages:-` under a new `###` becomes a sibling, not a
        // replacement of its own parent.
        while (pathDepth.length > 0 && pathDepth[pathDepth.length - 1] >= depth) {
          pathDepth.pop();
          sectionPath.pop();
        }
        sectionPath.push(text);
        pathDepth.push(depth);
        startBlock(depth, text);
        continue;
      }
    }

    if (!current) startBlock(0, `Page ${page}`);
    current!.lines.push(line);
  }
  flush();
  return blocks;
}

/** Strip lines that carry no lexical content (rules, blank padding). */
function meaningfulLines(lines: string[]): string[] {
  return lines.filter((l) => l.trim() !== "" && !/^-{3,}$/.test(l.trim()));
}

function splitByWords(text: string): string[] {
  const parts: string[] = [];
  let buf: string[] = [];
  let bufWords = 0;
  let fence = false;

  for (const line of text.split("\n")) {
    const isFence = /^```/.test(line.trim());
    const w = wordCount(line);
    if (!fence && bufWords + w > MAX_WORDS && buf.length > 0) {
      parts.push(buf.join("\n"));
      buf = [];
      bufWords = 0;
    }
    buf.push(line);
    bufWords += w;
    if (isFence) fence = !fence;
  }
  if (buf.length > 0) parts.push(buf.join("\n"));
  return parts.map((p) => p.trim()).filter((p) => wordCount(p) > 0);
}

export interface ChunkResult {
  chunks: Chunk[];
  sourceHash: string;
  stats: {
    blocks: number;
    chunks: number;
    merged: number;
    split: number;
    tiny: number;
    minWords: number;
    maxWords: number;
    avgWords: number;
  };
}

interface Pending {
  page: number;
  heading: string;
  depth: number;
  sectionPath: string[];
  parts: string[];
  words: number;
}

export function chunkMarkdown(raw: string): ChunkResult {
  const blocks = parseBlocks(raw);
  const pending: Pending[] = [];
  let merged = 0;
  let split = 0;

  const push = (block: Block, text: string) => {
    pending.push({
      page: block.page,
      heading: block.heading,
      depth: block.depth,
      sectionPath: block.sectionPath,
      parts: [text],
      words: wordCount(text),
    });
  };

  for (const block of blocks) {
    const body = meaningfulLines(block.lines).join("\n").trim();
    if (wordCount(body) === 0) continue;

    for (const piece of splitByWords(body)) {
      const w = wordCount(piece);
      const prev = pending[pending.length - 1];

      // A `####` subsection is a continuation of its parent `###`, so fold it
      // in. Page-level body text (depth 0) merges only while it stays small,
      // which repairs orphans like the abandoned Multi Head attention heading.
      const continuation =
        prev &&
        prev.page === block.page &&
        wordCount(prev.parts.join("\n")) < MAX_WORDS &&
        (block.depth === 4 || (block.depth === 0 && prev.words < MIN_WORDS));

      if (continuation) {
        prev.parts.push(piece);
        prev.words += w;
        merged++;
        continue;
      }

      if (pending.length > 0 && wordCount(piece) > MAX_WORDS) split++;
      push(block, piece);
    }
  }

  const chunks: Chunk[] = pending.map((p, i) => {
    const text = p.parts.join("\n\n");
    return {
      id: `c${String(i).padStart(3, "0")}`,
      page: p.page,
      heading: p.heading,
      sectionPath: p.sectionPath,
      text,
      embedText: [`Page ${p.page}`, ...p.sectionPath, "", text].join(" > "),
    };
  });

  const counts = chunks.map((c) => wordCount(c.text));
  return {
    chunks,
    sourceHash: createHash("sha256").update(raw).digest("hex"),
    stats: {
      blocks: blocks.length,
      chunks: chunks.length,
      merged,
      split,
      tiny: counts.filter((c) => c < MIN_WORDS).length,
      minWords: counts.length ? Math.min(...counts) : 0,
      maxWords: counts.length ? Math.max(...counts) : 0,
      avgWords: counts.length
        ? Math.round(counts.reduce((a, b) => a + b, 0) / counts.length)
        : 0,
    },
  };
}

export function chunkFromDisk(path = SOURCE_PATH): ChunkResult {
  return chunkMarkdown(readFileSync(path, "utf8"));
}

export { wordCount };
