"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_CHART_DATA } from "@/constants";
import type { ChartDataPoint } from "@/types";

// ─── Activity Bar Chart ───────────────────────────────────────────────────────

interface ActivityChartProps {
  data?: ChartDataPoint[];
}

export function ActivityChart({ data = MOCK_CHART_DATA }: ActivityChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Appointments scheduled vs completed</CardDescription>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <span className="h-2 w-2 rounded-sm bg-primary-500" aria-hidden="true" />
              Scheduled
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <span className="h-2 w-2 rounded-sm bg-accent-500" aria-hidden="true" />
              Completed
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div
          className="flex items-end gap-2 h-40"
          role="img"
          aria-label="Weekly activity bar chart"
        >
          {data.map((point, i) => {
            const primaryH = Math.max(4, (point.value / maxValue) * 100);
            const secondaryH = point.secondaryValue
              ? Math.max(4, (point.secondaryValue / maxValue) * 100)
              : 0;

            return (
              <div key={point.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="relative flex w-full items-end justify-center gap-0.5 h-32">
                  {/* Primary — Blue */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${primaryH}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                    className="flex-1 max-w-[13px] rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400 cursor-pointer hover:opacity-75 transition-opacity"
                    title={`Scheduled: ${point.value}`}
                  />
                  {/* Secondary — Teal */}
                  {secondaryH > 0 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${secondaryH}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 + 0.05, ease: "easeOut" }}
                      className="flex-1 max-w-[13px] rounded-t-md bg-gradient-to-t from-accent-600 to-accent-400 cursor-pointer hover:opacity-75 transition-opacity"
                      title={`Completed: ${point.secondaryValue}`}
                    />
                  )}
                </div>
                <span className="text-[10px] font-medium text-slate-400">{point.label}</span>
              </div>
            );
          })}
        </div>

        {/* Range labels */}
        <div className="mt-2 flex justify-between text-[10px] text-slate-400">
          <span>0</span>
          <span>{Math.round(maxValue / 2)}</span>
          <span>{maxValue}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────

interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

const DEFAULT_DONUT_DATA: DonutSlice[] = [
  { label: "In-Person",   value: 58, color: "#2563eb" },  // primary blue
  { label: "Teleconsult", value: 28, color: "#14b8a6" },  // accent teal
  { label: "Follow-Up",   value: 14, color: "#a855f7" },  // purple
];

export function AppointmentTypeChart({ data = DEFAULT_DONUT_DATA }: { data?: DonutSlice[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const r = 36;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Types</CardTitle>
        <CardDescription>Distribution by consultation mode</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-5">
          {/* SVG Donut */}
          <div className="relative" role="img" aria-label="Appointment type donut chart">
            <svg viewBox="0 0 100 100" className="w-36 h-36 -rotate-90">
              {/* Track */}
              <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth="14" />
              {/* Slices */}
              {data.map((slice, i) => {
                const sliceLen = (slice.value / total) * circumference;
                const dashOffset = -offset;
                offset += sliceLen;
                return (
                  <motion.circle
                    key={slice.label}
                    cx="50" cy="50" r={r}
                    fill="none"
                    stroke={slice.color}
                    strokeWidth="14"
                    strokeDasharray={`${sliceLen} ${circumference - sliceLen}`}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray: `${sliceLen} ${circumference - sliceLen}` }}
                    transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                  />
                );
              })}
            </svg>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-slate-900 font-heading leading-none">{total}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Total</p>
            </div>
          </div>

          {/* Legend */}
          <ul className="w-full space-y-2.5">
            {data.map((slice) => (
              <li key={slice.label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[13px] text-slate-600">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: slice.color }}
                    aria-hidden="true"
                  />
                  {slice.label}
                </span>
                <span className="text-[13px] font-semibold text-slate-800">
                  {Math.round((slice.value / total) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
