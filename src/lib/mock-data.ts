import type {
  DashboardData,
  DashboardKPI,
  RevenueDataPoint,
  PipelineStage,
  ActivityEntry,
  Task,
} from "@/types/dashboard";

const kpis: DashboardKPI[] = [
  {
    label: "Total Leads",
    value: "248",
    trend: 12.4,
    trendDirection: "up",
    sparklineData: [30, 40, 35, 50, 49, 60, 70, 65, 80, 75, 90, 100],
  },
  {
    label: "Revenue YTD",
    value: "AED 1.42M",
    trend: 24.6,
    trendDirection: "up",
    sparklineData: [20, 30, 25, 40, 55, 60, 50, 70, 80, 85, 95, 100],
  },
  {
    label: "Active Deals",
    value: "43",
    trend: 8.2,
    trendDirection: "up",
    sparklineData: [40, 35, 50, 45, 55, 50, 60, 58, 65, 70, 68, 75],
  },
  {
    label: "Completed Tasks",
    value: "156",
    trend: 24.6,
    trendDirection: "up",
    sparklineData: [10, 20, 30, 25, 40, 50, 45, 60, 70, 80, 85, 100],
  },
];

const revenueData: RevenueDataPoint[] = [
  { month: "Jan", thisYear: 60000, lastYear: 45000 },
  { month: "Feb", thisYear: 72000, lastYear: 48000 },
  { month: "Mar", thisYear: 85000, lastYear: 52000 },
  { month: "Apr", thisYear: 95000, lastYear: 55000 },
  { month: "May", thisYear: 110000, lastYear: 58000 },
  { month: "Jun", thisYear: 125000, lastYear: 62000 },
  { month: "Jul", thisYear: 140000, lastYear: 65000 },
  { month: "Aug", thisYear: 155000, lastYear: 68000 },
  { month: "Sep", thisYear: 165000, lastYear: 70000 },
  { month: "Oct", thisYear: 175000, lastYear: 72000 },
  { month: "Nov", thisYear: 180000, lastYear: 75000 },
  { month: "Dec", thisYear: 185000, lastYear: 78000 },
];

const pipelineStages: PipelineStage[] = [
  { stage: "New Lead", count: 42, value: 840000, currency: "AED" },
  { stage: "Contacted", count: 28, value: 560000, currency: "AED" },
  { stage: "Qualified", count: 18, value: 450000, currency: "AED" },
  { stage: "Proposal", count: 18, value: 450000, currency: "AED" },
  { stage: "Negotiation", count: 5, value: 340000, currency: "AED" },
  { stage: "Closed Won", count: 2, value: 120000, currency: "AED" },
];

const activityGroups: { label: string; entries: ActivityEntry[] }[] = [
  {
    label: "JUST NOW",
    entries: [
      {
        id: "a1",
        message: "You were assigned a new lead: Ahmed Al-Rashid",
        highlights: [{ text: "Ahmed Al-Rashid", type: "person" }],
        timestamp: new Date().toISOString(),
        relativeTime: "10 min ago",
        icon: "lead",
      },
      {
        id: "a2",
        message: "System transferred deal to Negotiation stage",
        highlights: [{ text: "Negotiation", type: "stage" }],
        timestamp: new Date().toISOString(),
        relativeTime: "25 min ago",
        icon: "deal",
      },
    ],
  },
  {
    label: "EARLIER TODAY",
    entries: [
      {
        id: "a3",
        message: "Nadia K. logged a call with James Chen",
        highlights: [
          { text: "Nadia K.", type: "person" },
          { text: "James Chen", type: "person" },
        ],
        timestamp: new Date().toISOString(),
        relativeTime: "1h ago",
        icon: "call",
      },
    ],
  },
  {
    label: "YESTERDAY",
    entries: [
      {
        id: "a4",
        message: "Commission of AED 12,400 confirmed for Deal #892",
        highlights: [
          { text: "AED 12,400", type: "deal" },
          { text: "Deal #892", type: "deal" },
        ],
        timestamp: new Date().toISOString(),
        relativeTime: "Yesterday",
        icon: "commission",
      },
      {
        id: "a5",
        message: "You added a note to Marina Heights Development",
        highlights: [{ text: "Marina Heights Development", type: "deal" }],
        timestamp: new Date().toISOString(),
        relativeTime: "Yesterday",
        icon: "note",
      },
      {
        id: "a6",
        message: "Email sent to Fatima Al-Sayed regarding Palm Views",
        highlights: [
          { text: "Fatima Al-Sayed", type: "person" },
          { text: "Palm Views", type: "deal" },
        ],
        timestamp: new Date().toISOString(),
        relativeTime: "Yesterday",
        icon: "email",
      },
    ],
  },
];

const tasks: Task[] = [
  {
    id: "t1",
    title: "Update deal #1024 documents",
    dueLabel: "Due \u00b7 4:30 PM",
    isOverdue: false,
    type: "task",
    priority: "low",
    completed: false,
  },
  {
    id: "t2",
    title: "Send proposal to Sarah Mitchell",
    dueLabel: "Due \u00b7 11:00 AM",
    isOverdue: false,
    type: "email",
    priority: "high",
    completed: false,
  },
  {
    id: "t3",
    title: "Schedule viewing \u2013 Palm Jumeirah",
    dueLabel: "Due \u00b7 2:00 PM",
    isOverdue: false,
    type: "meeting",
    priority: "med",
    completed: false,
  },
  {
    id: "t4",
    title: "Weekly team sync",
    dueLabel: "Upcoming \u00b7 5:00 PM",
    isOverdue: false,
    type: "meeting",
    priority: "med",
    completed: false,
  },
  {
    id: "t5",
    title: "Follow up with Ahmed Al-Rashid",
    dueLabel: "Overdue \u00b7 2h ago",
    isOverdue: true,
    type: "call",
    priority: "high",
    completed: false,
  },
];

export const todayData: DashboardData = {
  kpis,
  revenue: {
    total: "AED 1,621,000",
    trend: 18.4,
    data: revenueData,
  },
  pipeline: {
    totalDeals: 113,
    totalStages: 6,
    totalValue: "AED 2.76M",
    stages: pipelineStages,
  },
  activities: { groups: activityGroups },
  tasks: { completed: 0, total: 5, items: tasks },
};

function varyNumber(base: number, pct: number): number {
  const factor = 1 + (Math.random() * 2 - 1) * (pct / 100);
  return Math.round(base * factor);
}

export function generateVariation(): DashboardData {
  const variedKpis = kpis.map((kpi) => ({
    ...kpi,
    value: kpi.label === "Revenue YTD"
      ? `AED ${(1.42 * (0.85 + Math.random() * 0.3)).toFixed(2)}M`
      : String(varyNumber(parseInt(kpi.value) || 100, 20)),
    trend: parseFloat((kpi.trend * (0.7 + Math.random() * 0.6)).toFixed(1)),
    sparklineData: kpi.sparklineData.map((v) => varyNumber(v, 15)),
  }));

  const variedRevenue = revenueData.map((d) => ({
    ...d,
    thisYear: varyNumber(d.thisYear, 15),
    lastYear: varyNumber(d.lastYear, 10),
  }));

  const variedPipeline = pipelineStages.map((s) => ({
    ...s,
    count: varyNumber(s.count, 20),
    value: varyNumber(s.value, 20),
  }));

  return {
    kpis: variedKpis,
    revenue: {
      total: `AED ${varyNumber(1621000, 15).toLocaleString()}`,
      trend: parseFloat((18.4 * (0.7 + Math.random() * 0.6)).toFixed(1)),
      data: variedRevenue,
    },
    pipeline: {
      totalDeals: varyNumber(113, 15),
      totalStages: 6,
      totalValue: `AED ${(2.76 * (0.85 + Math.random() * 0.3)).toFixed(2)}M`,
      stages: variedPipeline,
    },
    activities: { groups: activityGroups },
    tasks: { completed: 0, total: 5, items: tasks },
  };
}