import { atom } from "jotai";
import type { Period, DashboardData } from "@/types/dashboard";

export const periodAtom = atom<Period>("today");
export const dashboardLoadingAtom = atom<boolean>(true);
export const dashboardDataAtom = atom<DashboardData | null>(null);
export const dashboardErrorAtom = atom<string | null>(null);

// Derived atoms for per-section render optimization
export const kpisAtom = atom((get) => get(dashboardDataAtom)?.kpis ?? []);
export const revenueAtom = atom((get) => get(dashboardDataAtom)?.revenue ?? null);
export const pipelineAtom = atom((get) => get(dashboardDataAtom)?.pipeline ?? null);
export const activitiesAtom = atom((get) => get(dashboardDataAtom)?.activities ?? null);
export const tasksAtom = atom((get) => get(dashboardDataAtom)?.tasks ?? null);