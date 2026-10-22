/**
 * Registry of platform domains. A user is assigned exactly one domain at
 * signup; the assignment is never changed by any code path.
 *
 * `ingested` marks whether this domain's scanned notes have been through the
 * chunk + embed pipeline (src/data/index-<domain>.json). The chat API refuses
 * domains whose corpus is not ingested yet, and the UI shows an empty state.
 * SAP joins here the moment its notes are provided.
 */
export interface DomainConfig {
  /** stable id used in the database and API routes */
  id: string;
  /** human label shown in the UI */
  label: string;
  /** one-line description in the signup picker */
  blurb: string;
  /** marks domains open for new registrations */
  open: boolean;
  /** whether the notes corpus is chunked + embedded */
  ingested: boolean;
}

export const DOMAINS: Record<string, DomainConfig> = {
  automation: {
    id: "automation",
    label: "Automation Tools",
    blurb: "Ansible, Jenkins, Maven, Terraform, Docker & Kubernetes, GitHub, Splunk",
    open: true,
    ingested: true,
  },
  aws: {
    id: "aws",
    label: "AWS",
    blurb: "Cloud Practitioner, EC2, S3, VPC, IAM, Lambda, CloudWatch, EventBridge",
    open: true,
    ingested: true,
  },
  azure: {
    id: "azure",
    label: "Azure",
    blurb: "Jenkins, Docker & Kubernetes, Ansible, Terraform, Maven, GitHub, Splunk",
    open: true,
    ingested: true,
  },
  sap: {
    id: "sap",
    label: "SAP",
    blurb: "Notes coming soon",
    open: true,
    ingested: false,
  },
};

export const DOMAIN_IDS = Object.keys(DOMAINS);

export function getDomain(id: string | null | undefined): DomainConfig | null {
  if (!id) return null;
  return DOMAINS[id] ?? null;
}

/** True when a signup attempt may claim this domain. */
export function isRegistrableDomain(id: string): boolean {
  return Boolean(DOMAINS[id]?.open);
}
