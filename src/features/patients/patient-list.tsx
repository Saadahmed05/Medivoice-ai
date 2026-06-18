"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, ChevronRight, Phone, Mail, Activity, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { calculateAge, formatDate } from "@/lib/utils";
import { MOCK_PATIENTS } from "@/constants";
import type { Patient } from "@/types";
import { cn } from "@/lib/utils";

// ─── Patient Card ─────────────────────────────────────────────────────────────

function PatientCard({ patient, index }: { patient: Patient; index: number }) {
  const age = calculateAge(patient.dateOfBirth);
  const fullName = `${patient.firstName} ${patient.lastName}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <Link
        href={`/patients/${patient.id}`}
        className={cn(
          "group block rounded-2xl border border-slate-200/80 bg-white p-5",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04)]",
          "transition-all duration-200",
          "hover:border-slate-300/80 hover:-translate-y-px",
          "hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08)]",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20"
        )}
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <Avatar name={fullName} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-[14px] text-slate-900 truncate leading-none">
                  {fullName}
                </h3>
                <p className="text-[12px] text-slate-500 mt-1">
                  {age} yrs · {patient.gender} · {patient.bloodGroup ?? "N/A"}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-150 shrink-0 mt-0.5" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              DOB: {formatDate(patient.dateOfBirth, { year: "numeric", month: "short", day: "numeric" })}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3.5 h-px bg-slate-100" />

        {/* Contact */}
        <div className="flex flex-col gap-1.5">
          <span className="flex items-center gap-2 text-[12px] text-slate-500">
            <Phone className="h-3 w-3 text-slate-400 shrink-0" />
            {patient.phone}
          </span>
          <span className="flex items-center gap-2 text-[12px] text-slate-500 truncate">
            <Mail className="h-3 w-3 text-slate-400 shrink-0" />
            {patient.email}
          </span>
        </div>

        {/* Allergies */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {patient.allergies.map((allergy) => (
              <Badge key={allergy} variant="destructive" size="sm">
                ⚠ {allergy}
              </Badge>
            ))}
          </div>
        )}

        {/* Medications */}
        {patient.currentMedications && patient.currentMedications.length > 0 && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500">
            <Activity className="h-3 w-3 text-green-500" />
            <span>{patient.currentMedications.length} active medication{patient.currentMedications.length !== 1 ? "s" : ""}</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

// ─── Patient List ─────────────────────────────────────────────────────────────

interface PatientListProps {
  patients?: Patient[];
}

export function PatientList({ patients = MOCK_PATIENTS }: PatientListProps) {
  const [query, setQuery] = useState("");

  const filtered = patients.filter((p) => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    const q = query.toLowerCase();
    return fullName.includes(q) || p.email.includes(q) || p.phone.includes(q);
  });

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Search patients by name, email, or phone…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            className="max-w-sm"
            aria-label="Search patients"
          />
          <Button variant="outline" size="sm" className="shrink-0">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Add Patient
        </Button>
      </div>

      {/* Result count */}
      <p className="text-[13px] text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
        of {patients.length} patients
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((patient, i) => (
            <PatientCard key={patient.id} patient={patient} index={i} />
          ))}
        </div>
      ) : (
        <Card flat>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 mb-4">
              <Users className="h-7 w-7 text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-600">No patients found</p>
            <p className="text-[12px] text-slate-400 mt-1">Try adjusting your search query</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
