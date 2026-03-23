import type { DashboardData, Period } from "@/types/dashboard";
import { todayData, generateVariation } from "./mock-data";

export async function fetchDashboardData(params: {
  period: Period;
}): Promise<DashboardData> {
  await new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 500)
  );

  // ~5% chance of simulated failure
  if (Math.random() < 0.05) {
    throw new Error("Failed to load data");
  }

  if (params.period === "today") {
    return todayData;
  }

  return generateVariation();
}