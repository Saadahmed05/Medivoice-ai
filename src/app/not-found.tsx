import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-center px-6">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary-50/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-md space-y-6">
        {/* 404 text */}
        <div className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-primary-600 leading-none select-none tracking-tighter">
          404
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Page Not Found</h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
