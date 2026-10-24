import automationBundle from "@/data/index.json";
import awsBundle from "@/data/index-aws.json";
import azureBundle from "@/data/index-azure.json";
import type { IndexBundle } from "./types";
import { SHELVES } from "./shelf";

const BUNDLES: Record<string, IndexBundle> = {
  automation: automationBundle as unknown as IndexBundle,
  aws: awsBundle as unknown as IndexBundle,
  azure: azureBundle as unknown as IndexBundle,
};

export type ChartMetric = "chunksByVolume" | "topHeadings";

export interface ChartPoint {
  label: string;
  value: number;
}

export function chartData(domain: string, metric: ChartMetric): ChartPoint[] {
  const bundle = BUNDLES[domain];
  if (!bundle) return [];
  const chunks = bundle.chunks;

  if (metric === "chunksByVolume") {
    const shelves = SHELVES[domain] ?? [];
    return shelves.map((v) => ({
      label: v.label,
      value: chunks.filter((c) => c.page >= v.from && c.page <= v.to).length,
    }));
  }

  if (metric === "topHeadings") {
    const counts = new Map<string, number>();
    for (const c of chunks) {
      const h = (c.heading || "").trim();
      if (!h || /^page \d+$/i.test(h)) continue;
      counts.set(h, (counts.get(h) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, value]) => ({ label, value }));
  }

  return [];
}
