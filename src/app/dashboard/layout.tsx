import { Suspense } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { DashboardSkeleton } from '@/components/pages/dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-muted">
      <Sidebar />
      <main className="desktop-s:ms-56 min-h-screen p-2 desktop-s:p-3">
        <div className="rounded-xl border bg-surface px-4 py-6 tablet-s:px-6 desktop-s:px-8">
          <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
        </div>
      </main>
    </div>
  );
}
