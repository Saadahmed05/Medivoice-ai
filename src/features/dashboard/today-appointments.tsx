"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Video, MapPin, ChevronRight, Stethoscope, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MOCK_APPOINTMENTS } from "@/constants";
import { formatTime12h } from "@/lib/utils";
import type { Appointment, AppointmentStatus } from "@/types";
import { cn } from "@/lib/utils";

// ─── Status badge mapping for light design system ─────────────────────────────

const statusVariantMap: Record<AppointmentStatus, {
  variant: "default" | "success" | "warning" | "destructive" | "secondary" | "accent";
  label: string;
}> = {
  scheduled:   { variant: "default",     label: "Scheduled" },
  "in-progress": { variant: "accent",    label: "In Progress" },
  completed:   { variant: "success",     label: "Completed" },
  cancelled:   { variant: "destructive", label: "Cancelled" },
  "no-show":   { variant: "secondary",   label: "No Show" },
};

// ─── Appointment Row ──────────────────────────────────────────────────────────

function AppointmentRow({ apt, index }: { apt: Appointment; index: number }) {
  const statusCfg = statusVariantMap[apt.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, delay: index * 0.06 }}
    >
      <Link
        href={`/appointments/${apt.id}`}
        className={cn(
          "group flex items-center gap-3 rounded-xl px-3 py-3 -mx-1",
          "transition-all duration-150",
          "hover:bg-slate-50",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20"
        )}
      >
        {/* Avatar */}
        <Avatar name={apt.patientName} size="md" />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-slate-900 truncate leading-none">
            {apt.patientName}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Stethoscope className="h-3 w-3 text-slate-400" />
            <span className="text-[11px] text-slate-500 truncate">{apt.specialty}</span>
            <span className="text-slate-300">·</span>
            {apt.type === "teleconsult" ? (
              <Video className="h-3 w-3 text-primary-500" />
            ) : (
              <MapPin className="h-3 w-3 text-slate-400" />
            )}
          </div>
        </div>

        {/* Time & Status */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <Clock className="h-3 w-3" />
            {formatTime12h(apt.time)}
          </span>
          <Badge
            variant={statusCfg.variant}
            size="sm"
            pulse={apt.status === "in-progress"}
          >
            {statusCfg.label}
          </Badge>
        </div>

        <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-150" />
      </Link>
    </motion.div>
  );
}

// ─── Today's Appointments ─────────────────────────────────────────────────────

interface TodayAppointmentsProps {
  appointments?: Appointment[];
}

export function TodayAppointments({ appointments = MOCK_APPOINTMENTS }: TodayAppointmentsProps) {
  const displayed = appointments.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50">
              <CalendarCheck className="h-4.5 w-4.5 text-primary-600" strokeWidth={2} />
            </div>
            <div>
              <CardTitle>Today&apos;s Appointments</CardTitle>
              <CardDescription>{appointments.length} scheduled</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/appointments">View all</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {displayed.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {displayed.map((apt, i) => (
              <AppointmentRow key={apt.id} apt={apt} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CalendarCheck className="h-8 w-8 text-slate-200 mb-2" />
            <p className="text-sm text-slate-400">No appointments today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
