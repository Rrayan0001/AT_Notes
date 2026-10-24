/**
 * Assembles the per-domain transcription files from the extracted page-range
 * markdown, renumbering pages into one continuous sequence per domain ("the
 * shelf") so chunk.page, citations, and the page renderer share one space.
 *
 *   AWS   : Cloud Practitioner 1–43, Notes 44–61            (61 pages)
 *   AZURE : Ansible 1–16, Docker & K8s 17–41, GitHub 42–51,
 *           Jenkins 52–91, Maven 92–110, Terraform 111–131,
 *           Splunk (single sheet) 132                       (132 pages)
 *
 * Verified page counts from pdfinfo match the extracted ranges exactly, so the
 * rewrite is an offset arithmetic; any gap or duplicate aborts the build.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface Volume {
  id: string;
  label: string;
  files: string[];
  pages: number;
  /** for SPLUNK, the whole sheet is one page of the one file */
  full?: boolean;
}

interface DomainSpec {
  domain: string;
  title: string;
  out: string;
  volumes: Volume[];
}

const ROOT = process.cwd();

const SPECS: DomainSpec[] = [
  {
    domain: "aws",
    title: "AWS Notes — Full Transcription (Cloud Practitioner + Notes + EventBridge)",
    out: join(ROOT, "data", "AWS_Notes_Transcription.md"),
    volumes: [
      {
        id: "cp",
        label: "AWS Cloud Practitioner Notes",
        files: [
          "AWS_notes/extracted/CP_pages_001-006.md",
          "AWS_notes/extracted/CP_pages_007-012.md",
          "AWS_notes/extracted/CP_pages_013-018.md",
          "AWS_notes/extracted/CP_pages_019-024.md",
          "AWS_notes/extracted/CP_pages_025-030.md",
          "AWS_notes/extracted/CP_pages_031-036.md",
          "AWS_notes/extracted/CP_pages_037-043.md",
        ],
        pages: 43,
      },
      {
        id: "notes",
        label: "AWS Notes",
        files: [
          "AWS_notes/extracted/Notes_pages_001-009.md",
          "AWS_notes/extracted/Notes_pages_010-018.md",
        ],
        pages: 18,
      },
      {
        id: "eventbridge",
        label: "EventBridge Notes",
        files: ["AWS_notes/extracted/EVENTBRIDGE_pages_001-003.md"],
        pages: 3,
      },
    ],
  },
  {
    domain: "azure",
    title: "Azure / DevOps Notes — Full Transcription",
    out: join(ROOT, "data", "Azure_Notes_Transcription.md"),
    volumes: [
      {
        id: "ansible",
        label: "Ansible",
        files: [
          "azure/extracted/ANSIBLE_pages_001-008.md",
          "azure/extracted/ANSIBLE_pages_009-016.md",
        ],
        pages: 16,
      },
      {
        id: "dkr",
        label: "Docker & Kubernetes",
        files: [
          "azure/extracted/DKR_pages_001-009.md",
          "azure/extracted/DKR_pages_010-018.md",
          "azure/extracted/DKR_pages_019-025.md",
        ],
        pages: 25,
      },
      {
        id: "github",
        label: "GitHub",
        files: [
          "azure/extracted/GITHUB_pages_001-005.md",
          "azure/extracted/GITHUB_pages_006-010.md",
        ],
        pages: 10,
      },
      {
        id: "jenkins",
        label: "Jenkins",
        files: [
          "azure/extracted/JENKINS_pages_001-008.md",
          "azure/extracted/JENKINS_pages_009-016.md",
          "azure/extracted/JENKINS_pages_017-024.md",
          "azure/extracted/JENKINS_pages_025-032.md",
          "azure/extracted/JENKINS_pages_033-040.md",
        ],
        pages: 40,
      },
      {
        id: "maven",
        label: "Maven",
        files: [
          "azure/extracted/MAVEN_pages_001-007.md",
          "azure/extracted/MAVEN_pages_008-013.md",
          "azure/extracted/MAVEN_pages_014-019.md",
        ],
        pages: 19,
      },
      {
        id: "terraform",
        label: "Terraform",
        files: [
          "azure/extracted/TERRAFORM_pages_001-007.md",
          "azure/extracted/TERRAFORM_pages_008-014.md",
          "azure/extracted/TERRAFORM_pages_015-021.md",
        ],
        pages: 21,
      },
      {
        id: "splunk",
        label: "Splunk",
        files: ["azure/extracted/SPLUNK_full.md"],
        pages: 1,
        full: true,
      },
    ],
  },
];


function parsePages(raw: string): Map<number, string> {
  const lines = raw.split("\n");
  const pages = new Map<number, string>();
  let current = -1;
  let buf: string[] = [];
  for (const line of lines) {
    const m = /^##\s+Page\s+(\d+)\s*$/.exec(line);
    if (m) {
      if (current >= 0) pages.set(current, buf.join("\n").trim());
      current = Number(m[1]);
      buf = [];
      continue;
    }
    if (current >= 0) buf.push(line);
  }
  if (current >= 0) pages.set(current, buf.join("\n").trim());
  return pages;
}

for (const spec of SPECS) {
  const parts: string[] = [];
  parts.push(`# ${spec.title}`, "");
  parts.push(
    "**Assembled from:** the per-notebook page-range transcriptions in this repository,",
    "concatenated into one continuous page sequence per domain. Page numbers below are",
    "shelf numbers: every notebook in the domain sits on the same shelf, numbered in order,",
    "and `## Page N` means shelf page N. The notebooks' own page numbers restart at 1, so",
    "each volume's range is listed here.",
    "",
    "**What is preserved exactly as written:** original spelling and capitalisation,",
    "grammatical errors, wrong facts and broken code, `[illegible]` markers, struck-out",
    "text, scanner watermarks, and page-level defects. This is a transcription, not a",
    "correction.",
    "",
    "## Shelf map",
    "",
    "| Shelf pages | Notebook |",
    "|---|---|"
  );

  const map = spec.volumes.reduce<{ first: number; last: number }[]>((acc, vol) => {
    const first = acc.length === 0 ? 1 : acc[acc.length - 1].last + 1;
    acc.push({ first, last: first + vol.pages - 1 });
    return acc;
  }, []);
  let global = 0;
  const used = new Set<number>();
  for (const vol of spec.volumes) {
    const range = map[spec.volumes.indexOf(vol)];
    parts.push(`| ${range.first}–${range.last} | ${vol.label} |`);
  }
  parts.push("", "---", "");

  for (const vol of spec.volumes) {
    const volumeStart = global + 1;
    const volumeEnd = global + vol.pages;

    if (vol.full) {
      // SPLUNK: one continuous sheet transcribed without page breaks; it is
      // shelf page `volumeStart` as a whole.
      const raw = readFileSync(join(ROOT, vol.files[0]), "utf8");
      const rp = raw.indexOf("# ");
      const body = rp >= 0 ? raw.slice(raw.indexOf("\n", rp) + 1).trim() : raw.trim();
      parts.push(`## Page ${volumeStart}`, "", body, "", "---", "");
      if (used.has(volumeStart)) {
        console.error(`shelf page ${volumeStart} assigned twice — aborting`);
        process.exit(1);
      }
      used.add(volumeStart);
      global = volumeEnd;
      continue;
    }

    // The extracted files cover their notebook's page ranges in order; the
    // sequence across files must ascend without gaps or overlaps.
    let expected = 1;
    for (const file of vol.files) {
      const raw = readFileSync(join(ROOT, file), "utf8");
      const pages = parsePages(raw);
      const locals = [...pages.keys()].sort((a, b) => a - b);
      if (locals.length === 0) {
        console.error(`${file}: no pages found — aborting`);
        process.exit(1);
      }
      if (locals[0] !== expected) {
        console.error(
          `${file}: expected local page ${expected}, got ${locals[0]} — aborting`
        );
        process.exit(1);
      }
      for (const local of locals) {
        if (local !== expected) {
          console.error(`${file}: expected local page ${expected}, got ${local} — aborting`);
          process.exit(1);
        }
        const body = pages.get(local);
        if (!body || body.trim().length === 0) {
          console.error(`${file}: local page ${local} is empty — aborting`);
          process.exit(1);
        }
        const shelf = volumeStart + local - 1;
        if (used.has(shelf)) {
          console.error(`shelf page ${shelf} assigned twice — aborting`);
          process.exit(1);
        }
        used.add(shelf);
        parts.push(`## Page ${shelf}`, "", body, "", "---", "");
        expected = local + 1;
      }
    }
    if (expected - 1 !== vol.pages) {
      console.error(
        `${vol.id}: volume declares ${vol.pages} pages, transcribed ${
          expected - 1
        } — aborting`
      );
      process.exit(1);
    }
    console.log(
      `${spec.domain}/${vol.id}: shelf ${volumeStart}-${volumeEnd} (${vol.pages} pages)`
    );
    global = volumeEnd;
  }

  parts.push(
    "",
    "---",
    "",
    `**Extent:** ${used.size} shelf pages across ${spec.volumes.length} notebook(s).`,
    "Transcription date: October 2026.",
    ""
  );

  const md = parts.join("\n");
  writeFileSync(spec.out, md);
  console.log(`${spec.domain}: wrote ${used.size} shelf pages -> ${spec.out}`);
}
