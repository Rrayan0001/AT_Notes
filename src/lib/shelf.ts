/**
 * The shelf: where each of a domain's global page numbers physically lives.
 *
 * Every domain numbers its corpus 1..N across all of its notebooks, the same
 * space chunk.page, citations, and `/api/notes/[n]` use. This map translates a
 * shelf page into the source PDF and its own page number for rendering, which
 * keeps the renderer, the cache, and the transcription aligned without any
 * hardcoded notebook names in the routes.
 */
import { join } from "node:path";
import { DOMAINS, DOMAIN_IDS } from "./domains";

export interface ShelfVolume {
  id: string;
  label: string;
  /** repo-relative path to the source scan */
  pdf: string;
  /** inclusive shelf range this volume occupies */
  from: number;
  to: number;
}

const PDFS = {
  pavan: "pawan_notes.pdf",
  awsCp: "AWS_notes/Cloud Practitioner Notes.pdf",
  awsNotes: "AWS_notes/Notes.pdf",
  awsEventBridge: "AWS_notes/event bridge.pdf",
  azureAnsible: "azure/ANSIBLE.pdf",
  azureDkr: "azure/Docker & Kubernetes (1).pdf",
  azureGithub: "azure/GITHUB.pdf",
  azureJenkins: "azure/JENKINS.pdf",
  azureMaven: "azure/MAVEN.pdf",
  azureTerraform: "azure/TERRAFORM .pdf",
  azureSplunk: "azure/SPLUNK(2).pdf",
  sapNotes: "sap/SAP Notes.pdf",
} as const;

export const SHELVES: Record<string, ShelfVolume[]> = {
  automation: [{ id: "pavan", label: "Pavan Notes", pdf: join(PDFS.pavan), from: 1, to: 82 }],
  aws: [
    { id: "cp", label: "Cloud Practitioner Notes", pdf: join(PDFS.awsCp), from: 1, to: 43 },
    { id: "notes", label: "AWS Notes", pdf: join(PDFS.awsNotes), from: 44, to: 61 },
    { id: "eventbridge", label: "EventBridge Notes", pdf: join(PDFS.awsEventBridge), from: 62, to: 64 },
  ],
  azure: [
    { id: "ansible", label: "Ansible", pdf: join(PDFS.azureAnsible), from: 1, to: 16 },
    { id: "dkr", label: "Docker & Kubernetes", pdf: join(PDFS.azureDkr), from: 17, to: 41 },
    { id: "github", label: "GitHub", pdf: join(PDFS.azureGithub), from: 42, to: 51 },
    { id: "jenkins", label: "Jenkins", pdf: join(PDFS.azureJenkins), from: 52, to: 91 },
    { id: "maven", label: "Maven", pdf: join(PDFS.azureMaven), from: 92, to: 110 },
    { id: "terraform", label: "Terraform", pdf: join(PDFS.azureTerraform), from: 111, to: 131 },
    { id: "splunk", label: "Splunk (single sheet)", pdf: join(PDFS.azureSplunk), from: 132, to: 132 },
  ],
  sap: [
    { id: "sapNotes", label: "SAP Notes", pdf: join(PDFS.sapNotes), from: 1, to: 9 },
  ],
};

export function resolvePage(
  domain: string,
  page: number
): { volume: ShelfVolume; localPage: number } | null {
  const volume = SHELVES[domain]?.find((v) => page >= v.from && page <= v.to);
  if (!volume) return null;
  return { volume, localPage: page - volume.from + 1 };
}

export function volumeLabel(domain: string, page: number): string | null {
  if (domain === "automation") return null; // one notebook; the label is noise
  return SHELVES[domain]?.find((v) => page >= v.from && page <= v.to)?.label ?? null;
}

export function shelfRanges(domain: string): { from: number; to: number; label: string }[] {
  return (SHELVES[domain] ?? []).map(({ from, to, label }) => ({ from, to, label }));
}

/**
 * The holdings ledger: every domain's extent over the same shelf space. The
 * auth desk (title page side) renders this as its index of holdings so the
 * corpus is visible before anyone signs in, and the facts strip reads its
 * totals — one source of truth for both.
 */
export function holdingsSummary(): { name: string; blurb: string; stat: string }[] {
  return DOMAIN_IDS.map((id) => {
    const domain = DOMAINS[id];
    const pages = (SHELVES[id] ?? []).reduce(
      (sum, v) => sum + (v.to - v.from + 1),
      0
    );
    return { name: domain.label, blurb: domain.blurb, stat: `${pages} pp` };
  });
}

export function holdingsTotals(): { pageCount: number; domainCount: number } {
  const rows = holdingsSummary();
  const pageCount = rows.reduce(
    (sum, row) => sum + Number(row.stat.replace(/\D/g, "")),
    0
  );
  return { pageCount, domainCount: rows.length };
}
