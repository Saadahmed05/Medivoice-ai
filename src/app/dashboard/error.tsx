"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Next.js error.tsx — shown when an unhandled error occurs in the dashboard segment.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="h-10 w-10 text-red-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Something went wrong</h1>
          <p className="text-slate-400 mt-2 max-w-md">
            {error.message || "An unexpected error occurred while loading the dashboard."}
          </p>
          {error.digest && (
            <p className="text-xs text-slate-600 mt-2 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
