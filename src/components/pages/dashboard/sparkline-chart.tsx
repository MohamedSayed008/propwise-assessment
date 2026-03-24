"use client";

import { useId } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface SparklineChartProps {
  data: number[];
  color?: string;
}

export function SparklineChart({
  data,
  color = "var(--color-brand-500)",
}: SparklineChartProps) {
  const gradientId = useId();
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <ResponsiveContainer width={60} height={32}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
