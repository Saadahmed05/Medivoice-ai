"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Mic,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS: StatCard[] = [
  {
    id: "patients",
    label: "Total Patients",
    value: "2,847",
    delta: "+12.5%",
    trend: "up",
    icon: Users,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    description: "vs. last month",
  },
  {
    id: "appointments",
    label: "Today's Appointments",
    value: "24",
    delta: "+4",
    trend: "up",
    icon: Calendar,
    iconBg: "bg-accent-50",
    iconColor: "text-accent-600",
    description: "vs. yesterday",
  },
  {
    id: "transcriptions",
    label: "Transcriptions",
    value: "1,192",
    delta: "+18.2%",
    trend: "up",
    icon: Mic,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    description: "this month",
  },
  {
    id: "satisfaction",
    label: "Satisfaction Rate",
    value: "96.4%",
    delta: "-0.3%",
    trend: "down",
    icon: TrendingUp,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    description: "patient feedback",
  },
];

const TrendIcon = {
  up:   TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

const trendClasses = {
  up:   "text-green-600 bg-green-50",
  down: "text-red-500 bg-red-50",
  flat: "text-slate-500 bg-slate-100",
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatItem({ stat, index }: { stat: StatCard; index: number }) {
  const Icon = stat.icon;
  const TIcon = TrendIcon[stat.trend];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
    >
      <Card hoverable>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            {/* Icon badge */}
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              stat.iconBg
            )}>
              <Icon className={cn("h-5 w-5", stat.iconColor)} strokeWidth={2} />
            </div>

            {/* Trend badge */}
            <span className={cn(
              "inline-flex items-center gap-1 rounded-lg px-2 py-1",
              "text-[11px] font-semibold leading-none",
              trendClasses[stat.trend]
            )}>
              <TIcon className="h-3 w-3" strokeWidth={2.5} />
              {stat.delta}
            </span>
          </div>

          {/* Value */}
          <div>
            <p className="text-2xl font-bold text-slate-900 tracking-[-0.03em] leading-none font-heading">
              {stat.value}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <p className="text-[12px] font-medium text-slate-500">{stat.label}</p>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">{stat.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Stats Grid ───────────────────────────────────────────────────────────────

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat, i) => (
        <StatItem key={stat.id} stat={stat} index={i} />
      ))}
    </div>
  );
}
