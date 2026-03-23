import { Suspense } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardSkeleton } from "@/components/pages/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-muted)]">
      <Sidebar />
      <main className="lg:ml-56 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Suspense fallback={<DashboardSkeleton />}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}