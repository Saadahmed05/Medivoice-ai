import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { ActivityChart, AppointmentTypeChart } from "@/features/dashboard/charts";
import { StatsGrid } from "@/features/dashboard/stats-grid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MOCK_DOCTORS } from "@/constants";
import { Star, TrendingUp } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Clinical performance metrics and practice analytics.",
};

export default function AnalyticsPage() {
  return (
    <AppShell
      title="Analytics"
      subtitle="Practice performance insights and clinical metrics"
    >
      <div className="space-y-6">
        {/* Stats */}
        <StatsGrid />

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ActivityChart />
          <AppointmentTypeChart />
        </div>

        {/* Doctors Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Doctor Performance</CardTitle>
            <CardDescription>
              Ratings and consultation volume for your clinical team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_DOCTORS.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 transition-colors duration-150 hover:bg-white hover:border-slate-300"
                >
                  <Avatar name={`${doc.firstName} ${doc.lastName}`} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-slate-900 truncate leading-none">
                      Dr. {doc.firstName} {doc.lastName}
                    </p>
                    <p className="text-[12px] text-slate-500 mt-1 leading-none">{doc.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-[14px] font-semibold text-slate-900">
                      {doc.rating}
                    </span>
                    <span className="text-[12px] text-slate-500 font-medium">({doc.totalReviews})</span>
                  </div>
                  <div className="sm:w-32 space-y-1.5 shrink-0">
                    <div className="flex justify-between text-[11px] font-medium text-slate-500">
                      <span>Satisfaction</span>
                      <span className="text-slate-900">{Math.round((doc.rating / 5) * 100)}%</span>
                    </div>
                    <Progress
                      value={(doc.rating / 5) * 100}
                      gradient
                      color="primary"
                      size="sm"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-green-600 shrink-0 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{doc.experience}y exp</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
