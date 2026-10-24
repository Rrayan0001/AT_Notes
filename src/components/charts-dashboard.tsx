"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChartView, type ChartPoint } from "@/components/chart-view";

interface SavedChart {
  id: string;
  title: string;
  type: "bar" | "pie" | "line";
  metric: "chunksByVolume" | "topHeadings";
  createdAt: string;
}

const METRICS: { value: SavedChart["metric"]; label: string }[] = [
  { value: "chunksByVolume", label: "Chunks per notebook" },
  { value: "topHeadings", label: "Top headings" },
];

export function ChartsDashboard() {
  const [charts, setCharts] = useState<SavedChart[]>([]);
  const [dataMap, setDataMap] = useState<Record<string, ChartPoint[]>>({});
  const [title, setTitle] = useState("");
  const [type, setType] = useState<SavedChart["type"]>("bar");
  const [metric, setMetric] = useState<SavedChart["metric"]>("chunksByVolume");
  const [busy, setBusy] = useState(false);

  async function load() {
    const res = await fetch("/api/charts");
    if (!res.ok) return;
    const j = await res.json();
    const list: SavedChart[] = j.charts ?? [];
    setCharts(list);
    // fetch data for each metric used
    const metrics = new Set(list.map((c) => c.metric));
    const dm: Record<string, ChartPoint[]> = { ...dataMap };
    for (const m of metrics) {
      if (!dm[m]) {
        const r = await fetch(`/api/charts/data?metric=${m}`);
        if (r.ok) dm[m] = (await r.json()).data;
      }
    }
    setDataMap(dm);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function create() {
    if (!title.trim()) return;
    setBusy(true);
    const res = await fetch("/api/charts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), type, metric }),
    });
    setBusy(false);
    if (res.ok) {
      setTitle("");
      const j = await res.json();
      if (j.data) setDataMap((d) => ({ ...d, [metric]: j.data }));
      await load();
    }
  }

  async function remove(id: string) {
    await fetch(`/api/charts/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold">My charts</h1>
        <p className="text-sm text-muted-foreground">
          Personalized charts saved to your account, built from your domain&apos;s notes.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-lg border p-4">
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs text-muted-foreground">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Chart title" className="h-9 w-full rounded-md border bg-background px-2 text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as SavedChart["type"])}
            className="block h-9 rounded-md border bg-background px-2 text-sm"
          >
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
            <option value="line">Line</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Metric</label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as SavedChart["metric"])}
            className="block h-9 rounded-md border bg-background px-2 text-sm"
          >
            {METRICS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={create} disabled={busy || !title.trim()}>
          {busy ? "Saving…" : "Save chart"}
        </Button>
      </div>

      {charts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No saved charts yet. Create one above.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {charts.map((c) => (
            <div key={c.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{c.title}</h3>
                <Button variant="ghost" size="sm" onClick={() => remove(c.id)}>
                  Delete
                </Button>
              </div>
              <ChartView type={c.type} data={dataMap[c.metric] ?? []} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
