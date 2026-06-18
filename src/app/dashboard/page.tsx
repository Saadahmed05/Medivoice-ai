import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { StatsGrid } from "@/features/dashboard/stats-grid";
import { ActivityChart, AppointmentTypeChart } from "@/features/dashboard/charts";
import { TodayAppointments } from "@/features/dashboard/today-appointments";
import { TranscriptionPanel } from "@/features/transcriptions/transcription-panel";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "MediVoice AI clinical dashboard — appointments, transcriptions, and analytics at a glance.",
};

/**
 * Dashboard page — Server Component.
 * In production, fetch real data here (appointments, stats, etc.).
 */
export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle={`${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
    >
      <div className="space-y-6">
        {/* KPI Stats */}
        <StatsGrid />

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ActivityChart />
          <AppointmentTypeChart />
        </div>

        {/* Appointments + Transcription */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TodayAppointments />
          <TranscriptionPanel />
        </div>
      </div>
    </AppShell>
  );
}
