import syllabusData from "@/data/syllabus.json";
import type { Chunk, ScoredChunk } from "./types";

/**
 * Curriculum map per domain, authored from the NIIT training curricula
 * (AWS Core, CIS AWS DevOps HiPo, CIS CNAIP DevOps via AWS, Automation &
 * Analytics, SAP PP timetable). Modules form a directed graph: `prereqs`
 * are logical predecessors, `leadsTo` is the curriculum's next step in
 * order, `related` are lateral compare/review links. Follow-up questions
 * are generated from these edges, not from raw retrieval order.
 */
export interface SyllabusModule {
  id: string;
  title: string;
  stage?: string;
  topics: string[];
  keywords: string[];
  prereqs: string[];
  leadsTo: string[];
  related: string[];
  bridge?: {
    leads?: Record<string, string>;
    related?: Record<string, string>;
  };
}

export interface DomainSyllabus {
  modules: SyllabusModule[];
  starterQuestions: string[];
}

const SYLLABUS = syllabusData as unknown as Record<string, DomainSyllabus>;

export function syllabusFor(domain: string): DomainSyllabus | null {
  return SYLLABUS[domain] ?? null;
}

export function starterQuestionsFor(
  domain: string | null | undefined
): string[] {
  if (!domain) return [];
  return SYLLABUS[domain]?.starterQuestions ?? [];
}

/** Number of keywords a text matches. Multi-word keywords substring-match. */
function keywordHits(text: string, keywords: string[]): number {
  let hits = 0;
  for (const kw of keywords) {
    if (text.includes(kw)) hits++;
  }
  return hits;
}

const pagesCache = new Map<string, number[]>();

/**
 * Pages of a module, derived by matching its keywords against the domain's
 * chunk index. A page counts only when at least one keyword appears; pages
 * are ranked by distinct keyword hits and capped so a wide keyword keeps a
 * tight, on-topic set. Cached per domain+module — the index is immutable at
 * runtime.
 */
export function modulePages(
  domain: string,
  module: SyllabusModule,
  chunks: Chunk[]
): number[] {
  const cacheKey = `${domain}:${module.id}`;
  const cached = pagesCache.get(cacheKey);
  if (cached) return cached;

  const scores = new Map<number, number>();
  for (const chunk of chunks) {
    const text = `${chunk.heading}\n${chunk.sectionPath.join(" ")}\n${chunk.text}`.toLowerCase();
    const hits = keywordHits(text, module.keywords);
    if (hits > 0) scores.set(chunk.page, (scores.get(chunk.page) ?? 0) + hits);
  }
  const pages = [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([page]) => page);
  pagesCache.set(cacheKey, pages);
  return pages;
}

export function moduleById(domainSyllabus: DomainSyllabus, id: string): SyllabusModule | null {
  return domainSyllabus.modules.find((m) => m.id === id) ?? null;
}

/**
 * The module the current answer is about, judged by how many of each
 * module's keywords the top-ranked chunks hit. Requires a minimum number
 * of distinct hits so clerk-ing a topic never happens on one stray word.
 */
export function bestModuleForAnswer(
  domain: string,
  domainSyllabus: DomainSyllabus,
  ranked: ScoredChunk[]
): SyllabusModule | null {
  if (ranked.length === 0) return null;
  const text = ranked
    .slice(0, 5)
    .map((c) => `${c.chunk.heading}\n${c.chunk.text}`)
    .join("\n")
    .toLowerCase();

  let current: SyllabusModule | null = null;
  let bestHits = 0;
  for (const candidate of domainSyllabus.modules) {
    const hits = new Set(
      candidate.keywords.filter((kw) => text.includes(kw))
    ).size;
    if (hits > bestHits) {
      current = candidate;
      bestHits = hits;
    }
  }
  if (!current || bestHits < 2) return null;
  void domain;
  return current;
}

export interface SyllabusAnswer {
  text: string;
  /** Landing pages of the modules the answer walks through, in order. */
  landingPages: number[];
}

const FIRST_TOPIC_PATTERN = /\b(?:first|start(?:ing|s)?|begins?|beginning|opening)\b/i;

function moduleLine(
  domain: string,
  module: SyllabusModule,
  chunks: Chunk[],
  opts: { stage: boolean } = { stage: true }
): { line: string; page: number | null } {
  const page = modulePages(domain, module, chunks)[0] ?? null;
  const pageRef = page === null ? "" : ` [page ${page}]`;
  const note = page === null ? " *(not transcribed in these notes)*" : "";
  const stage = module.stage && opts.stage ? ` · ${module.stage}` : "";
  return {
    line: `**${module.title}**${stage}${pageRef}${note} — ${module.topics.join("; ")}.`,
    page,
  };
}

/**
 * Renders a syllabus/curriculum question ("what's the first topic", "walk me
 * through the syllabus") straight from the authored module graph. The syllabus
 * is the ground truth for these questions — the model over retrieved blocks
 * only guesses at course order.
 */
export function syllabusAnswer(
  question: string,
  domain: string,
  domainLabel: string,
  domainSyllabus: DomainSyllabus,
  chunks: Chunk[]
): SyllabusAnswer {
  const landingPages: number[] = [];

  if (FIRST_TOPIC_PATTERN.test(question)) {
    const opening = domainSyllabus.modules[0];
    const openingLine = moduleLine(domain, opening, chunks, { stage: false });
    if (openingLine.page !== null) landingPages.push(openingLine.page);
    const lines = [`The ${domainLabel} syllabus opens with ${openingLine.line}`];
    const next = opening.leadsTo[0] ? moduleById(domainSyllabus, opening.leadsTo[0]) : null;
    if (next) {
      const nextLine = moduleLine(domain, next, chunks, { stage: false });
      if (nextLine.page !== null) landingPages.push(nextLine.page);
      lines.push(`From there the track steps into ${nextLine.line}`);
    }
    return { text: lines.join("\n\n"), landingPages };
  }

  const lines = [`Here is the full ${domainLabel} syllabus in order:`];
  domainSyllabus.modules.forEach((module, index) => {
    const { line, page } = moduleLine(domain, module, chunks);
    if (page !== null) landingPages.push(page);
    lines.push(`${index + 1}. ${line}`);
  });
  lines.push(
    "",
    "Work through them in that order; each page reference marks where these notes pick up the module."
  );
  return { text: lines.join("\n"), landingPages };
}
