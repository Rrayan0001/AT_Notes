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
