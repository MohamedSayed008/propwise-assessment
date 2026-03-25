'use client';

import { useAtomValue } from 'jotai';
import { dashboardLoadingAtom, pipelineAtom } from '@/store';
import { Skeleton } from '@/components/ui/skeleton';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ArrowUpRight } from 'lucide-react';

function formatValue(value: number, currency: string): string {
  if (value >= 1000000) return `${currency} ${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${currency} ${Math.round(value / 1000)}K`;
  return `${currency} ${value}`;
}

interface ChartEntry {
  stage: string;
  value: number;
  count: number;
  currency: string;
}

/** Custom bar shape that renders the Figma pill (count + value) inside */
function PipelineBar(props: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: ChartEntry;
}) {
  const { x = 0, y = 0, width = 0, height = 0, payload } = props;
  if (!payload || width <= 0) return null;

  const countText = String(payload.count);
  const valueText = formatValue(payload.value, payload.currency);
  // Approximate character widths: count at 11px bold ≈ 7px/char, value at 10px ≈ 6px/char
  const countWidth = countText.length * 7;
  const valueWidth = valueText.length * 6;
  const gap = 6;
  const pillPx = 6; // horizontal padding
  const pillPy = 3; // vertical padding
  const pillWidth = pillPx + countWidth + gap + valueWidth + pillPx;
  const pillHeight = height - pillPy * 2;
  const pillY = y + pillPy;
  const barInset = 6; // pill offset from bar edge
  const countX = x + barInset + pillPx;
  const valueX = countX + countWidth + gap;

  return (
    <g>
      {/* Bar background */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={6}
        fill="var(--color-brand-900)"
      />
      {/* Pill — sized to content */}
      <rect
        x={x + barInset}
        y={pillY}
        width={Math.min(pillWidth, width - barInset * 2)}
        height={pillHeight}
        rx={6}
        fill="rgba(255,255,255,0.2)"
      />
      {/* Count */}
      <text
        x={countX}
        y={y + height / 2}
        dominantBaseline="central"
        fontSize={11}
        fontWeight={700}
        fill="white"
      >
        {countText}
      </text>
      {/* Value */}
      <text
        x={valueX}
        y={y + height / 2}
        dominantBaseline="central"
        fontSize={10}
        fontWeight={500}
        fill="rgba(255,255,255,0.7)"
      >
        {formatValue(payload.value, payload.currency)}
      </text>
    </g>
  );
}

export function PipelineSummary() {
  const pipeline = useAtomValue(pipelineAtom);
  const loading = useAtomValue(dashboardLoadingAtom);

  if (loading || !pipeline) {
    return (
      <div className="rounded-lg border border-edge-subtle bg-surface p-6 shadow-xs">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-2 h-3 w-48" />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const chartData: ChartEntry[] = pipeline.stages.map(s => ({
    stage: s.stage,
    value: s.value,
    count: s.count,
    currency: s.currency,
  }));

  return (
    <div className="rounded-lg border border-edge-subtle bg-surface p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-content-emphasis">
          Pipeline Summary
        </h2>
        <button className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:opacity-80">
          <span>Details</span>
          <ArrowUpRight className="size-3" strokeWidth={2.25} />
        </button>
      </div>
      <p className="mt-1 text-xs text-chart-legend">
        {pipeline.totalDeals} deals across {pipeline.totalStages} stages
        &middot; {pipeline.totalValue} total value
      </p>

      {/* Chart */}
      <div className="mt-5 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            barCategoryGap={8}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="stage"
              axisLine={false}
              tickLine={false}
              width={80}
              tick={{
                fontSize: 13,
                fill: 'var(--content-default)',
                fontWeight: 500,
              }}
            />
            <Bar
              dataKey="value"
              animationDuration={800}
              animationEasing="ease-out"
              background={{ fill: 'var(--bg-subtle)', radius: 6 }}
              shape={<PipelineBar />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
