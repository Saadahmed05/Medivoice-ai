import { cn } from "@/lib/utils";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  circle?: boolean;
  width?: number | string;
  height?: number | string;
}

function Skeleton({ className, circle = false, width, height, style, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "skeleton animate-pulse",
        circle ? "rounded-full" : "rounded-lg",
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

// ─── Skeleton Presets ─────────────────────────────────────────────────────────

function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  const widths = ["100%", "85%", "70%", "92%", "60%"];
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3"
          style={{ width: widths[i % widths.length] }}
        />
      ))}
    </div>
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 space-y-4",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Skeleton circle className="h-10 w-10 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-2/5" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 py-3 px-1", className)}>
      <Skeleton circle className="h-8 w-8 shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-6 w-14 rounded-full" />
    </div>
  );
}

function SkeletonStatCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 space-y-4",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-28" />
        <Skeleton circle className="h-9 w-9" />
      </div>
      <Skeleton className="h-8 w-24" />
      <div className="flex items-center gap-1.5">
        <Skeleton circle className="h-3.5 w-3.5" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-0 divide-y divide-slate-100">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 py-3.5 px-1">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton
              key={c}
              className="h-3.5 flex-1"
              style={{ maxWidth: c === 0 ? 120 : undefined }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export {
  Skeleton,
  SkeletonCard,
  SkeletonRow,
  SkeletonStatCard,
  SkeletonTable,
  SkeletonText,
};
