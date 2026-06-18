"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Filter,
  Plus,
  Clock,
  Video,
  MapPin,
  ChevronRight,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MOCK_APPOINTMENTS } from "@/constants";
import { formatTime12h, cn } from "@/lib/utils";
import type { Appointment, AppointmentStatus } from "@/types";

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

// ─── Appointment Card ─────────────────────────────────────────────────────────

function AppointmentCard({ apt, index }: { apt: Appointment; index: number }) {
  const statusCfg = statusVariantMap[apt.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <Link
        href={`/appointments/${apt.id}`}
        className={cn(
          "group flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl p-5",
          "border border-slate-200/80 bg-white",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04)]",
          "transition-all duration-200 hover:border-slate-300/80 hover:-translate-y-px",
          "hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08)]",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20"
        )}
      >
        {/* Time block */}
        <div className="flex items-center gap-3 sm:w-24 sm:flex-col sm:items-start sm:gap-0.5 shrink-0">
          <div className="flex items-center gap-1.5 text-[15px] font-bold text-slate-900 tracking-tight">
            <Clock className="h-4 w-4 text-slate-400 sm:hidden" />
            {formatTime12h(apt.time)}
          </div>
          <span className="text-[12px] font-medium text-slate-400 hidden sm:block">{apt.duration} min</span>
        </div>

        {/* Divider (desktop) */}
        <div className="hidden sm:block h-10 w-px bg-slate-100 shrink-0" />

        {/* Main info */}
        <div className="flex flex-1 items-center gap-4 min-w-0">
          <Avatar name={apt.patientName} size="lg" className="shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-[14px] truncate leading-none">
              {apt.patientName}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="flex items-center gap-1.5 text-[12px] text-slate-500 truncate">
                <Stethoscope className="h-3.5 w-3.5 text-slate-400" />
                {apt.specialty}
              </span>
              <span className="text-slate-300">·</span>
              {apt.type === "teleconsult" ? (
                <span className="flex items-center gap-1.5 text-[12px] text-slate-500" title="Teleconsult">
                  <Video className="h-3.5 w-3.5 text-primary-500" />
                  Teleconsult
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[12px] text-slate-500" title="In-person">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  In-person
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0">
          <Badge
            variant={statusCfg.variant}
            pulse={apt.status === "in-progress"}
          >
            {statusCfg.label}
          </Badge>
          <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-150 hidden sm:block" />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredAppointments = MOCK_APPOINTMENTS.filter((apt) => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") return apt.status === "scheduled";
    if (activeTab === "completed") return apt.status === "completed";
    return true;
  });

  return (
    <AppShell title="Appointments" subtitle="Manage your daily schedule">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList variant="pills" className="w-full sm:w-auto">
              <TabsTrigger value="all" className="flex-1 sm:flex-none">All</TabsTrigger>
              <TabsTrigger value="upcoming" className="flex-1 sm:flex-none">Upcoming</TabsTrigger>
              <TabsTrigger value="completed" className="flex-1 sm:flex-none">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="flex-1 sm:flex-none">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* Content */}
        {filteredAppointments.length > 0 ? (
          <div className="space-y-3">
            {filteredAppointments.map((apt, i) => (
              <AppointmentCard key={apt.id} apt={apt} index={i} />
            ))}
          </div>
        ) : (
          <Card flat>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 mb-4">
                <Calendar className="h-7 w-7 text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-900">No appointments found</p>
              <p className="text-[12px] text-slate-500 mt-1">
                You have no appointments in this category.
              </p>
              <Button variant="outline" className="mt-4">
                <Plus className="h-4 w-4" />
                Schedule One
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
