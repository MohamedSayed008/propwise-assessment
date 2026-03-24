'use client';

import { useCallback } from 'react';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import {
  periodAtom,
  dashboardLoadingAtom,
  dashboardDataAtom,
  dashboardErrorAtom,
} from '@/store';
import { fetchDashboardData } from '@/lib/mock-api';
import type { Period } from '@/types/dashboard';

export function useDashboard() {
  const [period, setPeriod] = useAtom(periodAtom);
  const loading = useAtomValue(dashboardLoadingAtom);
  const setLoading = useSetAtom(dashboardLoadingAtom);
  const setData = useSetAtom(dashboardDataAtom);
  const setError = useSetAtom(dashboardErrorAtom);

  const loadData = useCallback(
    async (p: Period) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDashboardData({ period: p });
        setData(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to load data';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setData, setError]
  );

  const changePeriod = useCallback(
    async (p: Period) => {
      const previous = period;
      setPeriod(p);
      try {
        await loadData(p);
      } catch (err) {
        // Rollback to previous period on failure
        setPeriod(previous);
        throw err;
      }
    },
    [period, setPeriod, loadData]
  );

  return { period, loading, loadData, changePeriod };
}
