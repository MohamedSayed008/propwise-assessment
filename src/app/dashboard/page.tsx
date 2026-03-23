"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { periodAtom } from "@/store";
import { useDashboard } from "@/hooks/use-dashboard";
import {
  DashboardHeader,
  DateFilterTabs,
  KpiCards,
  RevenueForecast,
  PipelineSummary,
  ActivityFeed,
  TasksPanel,
} from "@/components/pages/dashboard";
import { toast } from "sonner";
import type { Period } from "@/types/dashboard";

const validPeriods: Period[] = [
  "today",
  "this_week",
  "this_month",
  "this_quarter",
  "this_year",
  "custom",
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setPeriod = useSetAtom(periodAtom);
  const { loadData, period } = useDashboard();

  // Sync URL params to state on mount
  useEffect(() => {
    const urlPeriod = searchParams.get("period") as Period | null;
    const initialPeriod =
      urlPeriod && validPeriods.includes(urlPeriod) ? urlPeriod : "today";

    setPeriod(initialPeriod);
    loadData(initialPeriod).catch(() => {
      toast.error("Failed to load data", {
        action: {
          label: "Retry",
          onClick: () => {
            loadData(initialPeriod).catch(() => {});
          },
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync period changes to URL
  useEffect(() => {
    const current = searchParams.get("period");
    if (period !== current) {
      router.replace(`/dashboard?period=${period}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DateFilterTabs />
      <KpiCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <RevenueForecast />
          <PipelineSummary />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <ActivityFeed />
          <TasksPanel />
        </div>
      </div>
    </div>
  );
}