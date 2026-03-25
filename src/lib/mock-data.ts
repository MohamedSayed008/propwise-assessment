import type {
  ActivityEntry,
  DashboardData,
  DashboardKPI,
  Period,
  PipelineStage,
  RevenueDataPoint,
  Task,
} from '@/types/dashboard';

const kpis: DashboardKPI[] = [
  {
    label: 'Total Leads',
    value: '248',
    trend: 12.4,
    trendDirection: 'up',
    sparklineData: [30, 40, 35, 50, 49, 60, 70, 65, 80, 75, 90, 100],
  },
  {
    label: 'Revenue YTD',
    value: 'AED 1.42M',
    trend: 24.6,
    trendDirection: 'up',
    sparklineData: [20, 30, 25, 40, 55, 60, 50, 70, 80, 85, 95, 100],
  },
  {
    label: 'Active Deals',
    value: '43',
    trend: 8.2,
    trendDirection: 'up',
    sparklineData: [40, 35, 50, 45, 55, 50, 60, 58, 65, 70, 68, 75],
  },
  {
    label: 'Completed Tasks',
    value: '156',
    trend: 24.6,
    trendDirection: 'up',
    sparklineData: [10, 20, 30, 25, 40, 50, 45, 60, 70, 80, 85, 100],
  },
];

const revenueData: RevenueDataPoint[] = [
  { month: 'Jan', thisYear: 60000, lastYear: 45000 },
  { month: 'Feb', thisYear: 72000, lastYear: 48000 },
  { month: 'Mar', thisYear: 85000, lastYear: 52000 },
  { month: 'Apr', thisYear: 95000, lastYear: 55000 },
  { month: 'May', thisYear: 110000, lastYear: 58000 },
  { month: 'Jun', thisYear: 125000, lastYear: 62000 },
  { month: 'Jul', thisYear: 140000, lastYear: 65000 },
  { month: 'Aug', thisYear: 155000, lastYear: 68000 },
  { month: 'Sep', thisYear: 165000, lastYear: 70000 },
  { month: 'Oct', thisYear: 175000, lastYear: 72000 },
  { month: 'Nov', thisYear: 180000, lastYear: 75000 },
  { month: 'Dec', thisYear: 185000, lastYear: 78000 },
];

const pipelineStages: PipelineStage[] = [
  { stage: 'New Lead', count: 42, value: 840000, currency: 'AED' },
  { stage: 'Contacted', count: 28, value: 560000, currency: 'AED' },
  { stage: 'Qualified', count: 18, value: 450000, currency: 'AED' },
  { stage: 'Proposal', count: 18, value: 450000, currency: 'AED' },
  { stage: 'Negotiation', count: 5, value: 340000, currency: 'AED' },
  { stage: 'Closed Won', count: 2, value: 120000, currency: 'AED' },
];

const activityGroups: { label: string; entries: ActivityEntry[] }[] = [
  {
    label: 'JUST NOW',
    entries: [
      {
        id: 'a1',
        message: 'You were assigned a new lead: Ahmed Al-Rashid',
        highlights: [
          { text: 'You', type: 'person' },
          { text: 'Ahmed Al-Rashid', type: 'person' },
        ],
        timestamp: new Date().toISOString(),
        relativeTime: '10 min ago',
        icon: 'lead',
      },
      {
        id: 'a2',
        message: 'System transferred deal to Negotiation stage',
        highlights: [
          { text: 'System', type: 'person' },
          { text: 'Negotiation stage', type: 'stage' },
        ],
        timestamp: new Date().toISOString(),
        relativeTime: '25 min ago',
        icon: 'deal',
      },
    ],
  },
  {
    label: 'EARLIER TODAY',
    entries: [
      {
        id: 'a3',
        message: 'Nadia K. logged a call with James Chen',
        highlights: [
          { text: 'Nadia K.', type: 'person' },
          { text: 'James Chen', type: 'person' },
        ],
        timestamp: new Date().toISOString(),
        relativeTime: '1h ago',
        icon: 'call',
      },
    ],
  },
];

const tasks: Task[] = [
  {
    id: 't1',
    title: 'Update deal #1024 documents',
    dueLabel: 'Due \u00b7 4:30 PM',
    isOverdue: false,
    type: 'task',
    priority: 'low',
    completed: false,
  },
  {
    id: 't2',
    title: 'Send proposal to Sarah Mitchell',
    dueLabel: 'Due \u00b7 11:00 AM',
    isOverdue: false,
    type: 'email',
    priority: 'high',
    completed: false,
  },
  {
    id: 't3',
    title: 'Schedule viewing \u2013 Palm Jumeirah',
    dueLabel: 'Due \u00b7 2:00 PM',
    isOverdue: false,
    type: 'meeting',
    priority: 'med',
    completed: false,
  },
  {
    id: 't4',
    title: 'Weekly team sync',
    dueLabel: 'Upcoming \u00b7 5:00 PM',
    isOverdue: false,
    type: 'meeting',
    priority: 'med',
    completed: false,
  },
  {
    id: 't5',
    title: 'Follow up with Ahmed Al-Rashid',
    dueLabel: 'Overdue \u00b7 2h ago',
    isOverdue: true,
    type: 'call',
    priority: 'high',
    completed: false,
  },
];

export const todayData: DashboardData = {
  kpis,
  revenue: {
    total: 'AED 1,621,000',
    trend: 18.4,
    data: revenueData,
  },
  pipeline: {
    totalDeals: 113,
    totalStages: 6,
    totalValue: 'AED 2.76M',
    stages: pipelineStages,
  },
  activities: { groups: activityGroups },
  tasks: { completed: 0, total: 5, items: tasks },
};

/* ── Deterministic period-aware variation ── */

/** Simple seeded pseudo-random: same period always produces the same numbers */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function periodSeed(period: Period): number {
  let hash = 0;
  for (let i = 0; i < period.length; i++) {
    hash = (hash * 31 + period.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) || 1;
}

/** Deterministic variation: varies a base value by ±pct using seeded random */
function varyNumber(base: number, pct: number, rand: () => number): number {
  const factor = 1 + (rand() * 2 - 1) * (pct / 100);
  return Math.round(base * factor);
}

/** Period-specific multipliers for plausible data ranges */
const periodMultipliers: Record<Period, number> = {
  today: 1,
  this_week: 1.15,
  this_month: 1.35,
  this_quarter: 1.8,
  this_year: 2.5,
  custom: 1.2,
};

export function generateVariation(period: Period): DashboardData {
  const rand = seededRandom(periodSeed(period));
  const mult = periodMultipliers[period];

  const variedKpis: DashboardKPI[] = kpis.map(kpi => {
    const baseNum = parseInt(kpi.value.replace(/[^0-9]/g, '')) || 100;
    const scaled = Math.round(baseNum * mult);
    return {
      ...kpi,
      value:
        kpi.label === 'Revenue YTD'
          ? `AED ${(1.42 * mult * (0.9 + rand() * 0.2)).toFixed(2)}M`
          : String(varyNumber(scaled, 10, rand)),
      trend: parseFloat((kpi.trend * (0.8 + rand() * 0.4)).toFixed(1)),
      sparklineData: kpi.sparklineData.map(v => varyNumber(v, 12, rand)),
    };
  });

  const variedRevenue: RevenueDataPoint[] = revenueData.map(d => ({
    ...d,
    thisYear: varyNumber(Math.round(d.thisYear * mult), 8, rand),
    lastYear: varyNumber(d.lastYear, 5, rand),
  }));

  const variedPipeline: PipelineStage[] = pipelineStages.map(s => ({
    ...s,
    count: varyNumber(Math.round(s.count * mult), 10, rand),
    value: varyNumber(Math.round(s.value * mult), 10, rand),
  }));

  const totalValue = variedPipeline.reduce((sum, s) => sum + s.value, 0);

  return {
    kpis: variedKpis,
    revenue: {
      total: `AED ${varyNumber(Math.round(1621000 * mult), 8, rand).toLocaleString()}`,
      trend: parseFloat((18.4 * (0.8 + rand() * 0.4)).toFixed(1)),
      data: variedRevenue,
    },
    pipeline: {
      totalDeals: variedPipeline.reduce((sum, s) => sum + s.count, 0),
      totalStages: 6,
      totalValue: `AED ${(totalValue / 1000000).toFixed(2)}M`,
      stages: variedPipeline,
    },
    activities: { groups: activityGroups },
    tasks: { completed: 0, total: 5, items: tasks },
  };
}
