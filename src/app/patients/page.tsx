import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { PatientList } from "@/features/patients/patient-list";

export const metadata: Metadata = {
  title: "Patients",
  description: "Manage and view all patient records in MediVoice AI.",
};

export default function PatientsPage() {
  return (
    <AppShell
      title="Patients"
      subtitle="Manage and view all patient records"
    >
      <PatientList />
    </AppShell>
  );
}
