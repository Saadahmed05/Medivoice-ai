import { SkeletonStatCard } from "@/components/ui/skeleton";

/**
 * Next.js loading.tsx — shown while the dashboard page streams in.
 * Matches the layout of StatsGrid and below for a seamless transition.
 */
export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-6" aria-busy="true" aria-label="Loading dashboard">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} />
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04)] h-[340px] animate-pulse" />
        <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04)] h-[340px] animate-pulse" />
      </div>

      {/* Bottom skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04)] h-96 animate-pulse" />
        <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04)] h-96 animate-pulse" />
      </div>
    </div>
  );
}
