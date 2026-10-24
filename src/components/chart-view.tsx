"use client";

import { useMemo } from "react";

export interface ChartPoint {
  label: string;
  value: number;
}

export function ChartView({
  type,
  data,
}: {
  type: "bar" | "pie" | "line";
  data: ChartPoint[];
}) {
  const max = useMemo(() => Math.max(1, ...data.map((d) => d.value)), [data]);
  if (data.length === 0) {
    return <p className="text-xs text-muted-foreground">No data.</p>;
  }

  if (type === "pie") {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const prefix = [0];
    for (let i = 0; i < data.length; i++) prefix.push(prefix[i] + data[i].value);
    const slices = data.map((d, i) => ({
      ...d,
      start: prefix[i] / total,
      end: prefix[i + 1] / total,
      i,
    }));
    const R = 60;
    const cx = 80;
    const cy = 80;
    function arc(start: number, end: number) {
      const a0 = start * 2 * Math.PI - Math.PI / 2;
      const a1 = end * 2 * Math.PI - Math.PI / 2;
      const x0 = cx + R * Math.cos(a0);
      const y0 = cy + R * Math.sin(a0);
      const x1 = cx + R * Math.cos(a1);
      const y1 = cy + R * Math.sin(a1);
      const large = end - start > 0.5 ? 1 : 0;
      return `M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} Z`;
    }
    const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7", "#ec4899", "#84cc16"];
    return (
      <div className="flex items-center gap-4">
        <svg width={160} height={160} viewBox="0 0 160 160">
          {slices.map((s) => (
            <path key={s.i} d={arc(s.start, s.end)} fill={colors[s.i % colors.length]} stroke="white" strokeWidth={1} />
          ))}
        </svg>
        <ul className="space-y-1 text-xs">
          {data.map((d, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="inline-block size-2.5 rounded-sm" style={{ background: colors[i % colors.length] }} />
              <span className="truncate max-w-32">{d.label}</span>
              <span className="ml-auto font-mono text-muted-foreground">{d.value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (type === "line") {
    const w = 320;
    const h = 140;
    const pad = 20;
    const pts = data.map((d, i) => {
      const x = pad + (i / Math.max(1, data.length - 1)) * (w - 2 * pad);
      const y = h - pad - (d.value / max) * (h - 2 * pad);
      return `${x},${y}`;
    });
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
        <polyline points={pts.join(" ")} fill="none" stroke="currentColor" strokeWidth={2} />
        {data.map((d, i) => {
          const x = pad + (i / Math.max(1, data.length - 1)) * (w - 2 * pad);
          const y = h - pad - (d.value / max) * (h - 2 * pad);
          return <circle key={i} cx={x} cy={y} r={3} fill="currentColor" />;
        })}
      </svg>
    );
  }

  // bar
  const w = 320;
  const h = 160;
  const pad = 24;
  const bw = (w - 2 * pad) / data.length - 6;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
      {data.map((d, i) => {
        const x = pad + i * ((w - 2 * pad) / data.length) + 3;
        const bh = (d.value / max) * (h - 2 * pad);
        const y = h - pad - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} fill="currentColor" opacity={0.8} rx={2} />
            <text x={x + bw / 2} y={h - 6} textAnchor="middle" fontSize={9} fill="currentColor" opacity={0.7}>
              {d.label.slice(0, 10)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
