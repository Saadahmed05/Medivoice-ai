import {
  type Appointment,
  type ChartDataPoint,
  type DashboardStats,
  type Doctor,
  type Notification,
  type Patient,
  type Transcription,
} from "@/types";

// ─── App Meta ─────────────────────────────────────────────────────────────────

export const APP_NAME = "MediVoice AI" as const;
export const APP_DESCRIPTION =
  "AI-powered voice transcription and clinical documentation for modern healthcare teams." as const;
export const APP_VERSION = "1.0.0" as const;

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Appointments", href: "/appointments", icon: "Calendar" },
  { label: "Patients", href: "/patients", icon: "Users" },
  { label: "Transcriptions", href: "/transcriptions", icon: "Mic" },
  { label: "Analytics", href: "/analytics", icon: "BarChart3" },
  { label: "Messages", href: "/messages", icon: "MessageSquare" },
  { label: "Settings", href: "/settings", icon: "Settings" },
] as const;

// ─── Specialties ──────────────────────────────────────────────────────────────

export const MEDICAL_SPECIALTIES = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "General Practice",
  "Hematology",
  "Internal Medicine",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Rheumatology",
  "Surgery",
  "Urology",
] as const;

export type MedicalSpecialty = (typeof MEDICAL_SPECIALTIES)[number];

// ─── Languages ────────────────────────────────────────────────────────────────

export const SUPPORTED_LANGUAGES = [
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "es-ES", label: "Spanish" },
  { code: "fr-FR", label: "French" },
  { code: "de-DE", label: "German" },
  { code: "pt-BR", label: "Portuguese (Brazil)" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "ja-JP", label: "Japanese" },
  { code: "ar-SA", label: "Arabic" },
  { code: "hi-IN", label: "Hindi" },
] as const;

// ─── Status Labels & Colors ───────────────────────────────────────────────────

export const APPOINTMENT_STATUS_CONFIG = {
  scheduled: {
    label: "Scheduled",
    color: "blue",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-400",
    borderClass: "border-blue-500/30",
  },
  "in-progress": {
    label: "In Progress",
    color: "emerald",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-500/30",
  },
  completed: {
    label: "Completed",
    color: "slate",
    bgClass: "bg-slate-500/10",
    textClass: "text-slate-400",
    borderClass: "border-slate-500/30",
  },
  cancelled: {
    label: "Cancelled",
    color: "red",
    bgClass: "bg-red-500/10",
    textClass: "text-red-400",
    borderClass: "border-red-500/30",
  },
} as const;

export const TRANSCRIPTION_STATUS_CONFIG = {
  idle: { label: "Idle", color: "slate" },
  recording: { label: "Recording", color: "red" },
  processing: { label: "Processing", color: "amber" },
  done: { label: "Completed", color: "emerald" },
  error: { label: "Error", color: "red" },
} as const;

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MOCK_STATS: DashboardStats = {
  totalPatients: 2_847,
  appointmentsToday: 24,
  pendingTranscriptions: 7,
  completedToday: 18,
  weeklyChange: {
    patients: 12.4,
    appointments: 8.1,
    transcriptions: 23.5,
  },
};

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { label: "Mon", value: 45, secondaryValue: 38 },
  { label: "Tue", value: 62, secondaryValue: 55 },
  { label: "Wed", value: 38, secondaryValue: 42 },
  { label: "Thu", value: 71, secondaryValue: 65 },
  { label: "Fri", value: 55, secondaryValue: 48 },
  { label: "Sat", value: 29, secondaryValue: 25 },
  { label: "Sun", value: 18, secondaryValue: 15 },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-001",
    patientId: "pat-001",
    patientName: "Sarah Johnson",
    doctorId: "doc-001",
    doctorName: "Dr. Michael Chen",
    specialty: "Cardiology",
    date: "2026-06-18",
    time: "09:00",
    duration: 30,
    type: "in-person",
    status: "in-progress",
    notes: "Routine cardiac checkup",
  },
  {
    id: "apt-002",
    patientId: "pat-002",
    patientName: "Robert Martinez",
    doctorId: "doc-002",
    doctorName: "Dr. Aisha Patel",
    specialty: "Neurology",
    date: "2026-06-18",
    time: "10:30",
    duration: 45,
    type: "teleconsult",
    status: "scheduled",
    notes: "Follow-up for migraine treatment",
  },
  {
    id: "apt-003",
    patientId: "pat-003",
    patientName: "Emily Thompson",
    doctorId: "doc-003",
    doctorName: "Dr. James Wilson",
    specialty: "Pediatrics",
    date: "2026-06-18",
    time: "11:15",
    duration: 20,
    type: "in-person",
    status: "scheduled",
  },
  {
    id: "apt-004",
    patientId: "pat-004",
    patientName: "David Kim",
    doctorId: "doc-001",
    doctorName: "Dr. Michael Chen",
    specialty: "Cardiology",
    date: "2026-06-18",
    time: "08:00",
    duration: 30,
    type: "follow-up",
    status: "completed",
    transcriptionId: "txn-001",
  },
  {
    id: "apt-005",
    patientId: "pat-005",
    patientName: "Linda Walsh",
    doctorId: "doc-004",
    doctorName: "Dr. Sofia Rodriguez",
    specialty: "Endocrinology",
    date: "2026-06-18",
    time: "14:00",
    duration: 30,
    type: "in-person",
    status: "scheduled",
  },
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "pat-001",
    userId: "usr-001",
    firstName: "Sarah",
    lastName: "Johnson",
    dateOfBirth: "1985-03-15",
    gender: "female",
    bloodGroup: "A+",
    phone: "+1 (555) 234-5678",
    email: "sarah.johnson@email.com",
    allergies: ["Penicillin", "Aspirin"],
    currentMedications: [
      {
        id: "med-001",
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2025-01-15",
        prescribedBy: "Dr. Michael Chen",
      },
    ],
    medicalHistory: [],
  },
  {
    id: "pat-002",
    userId: "usr-002",
    firstName: "Robert",
    lastName: "Martinez",
    dateOfBirth: "1978-07-22",
    gender: "male",
    bloodGroup: "O+",
    phone: "+1 (555) 345-6789",
    email: "robert.martinez@email.com",
    allergies: [],
    currentMedications: [],
    medicalHistory: [],
  },
  {
    id: "pat-003",
    userId: "usr-003",
    firstName: "Emily",
    lastName: "Thompson",
    dateOfBirth: "2018-11-30",
    gender: "female",
    bloodGroup: "B+",
    phone: "+1 (555) 456-7890",
    email: "emily.thompson@email.com",
    allergies: ["Latex"],
    currentMedications: [],
    medicalHistory: [],
  },
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc-001",
    userId: "usr-doc-001",
    firstName: "Michael",
    lastName: "Chen",
    specialty: "Cardiology",
    licenseNumber: "MD-123456",
    qualifications: ["MD", "FACC", "FSCAI"],
    experience: 15,
    languages: ["English", "Mandarin"],
    rating: 4.9,
    totalReviews: 342,
  },
  {
    id: "doc-002",
    userId: "usr-doc-002",
    firstName: "Aisha",
    lastName: "Patel",
    specialty: "Neurology",
    licenseNumber: "MD-234567",
    qualifications: ["MD", "PhD", "FAAN"],
    experience: 12,
    languages: ["English", "Hindi", "Gujarati"],
    rating: 4.8,
    totalReviews: 287,
  },
];

export const MOCK_TRANSCRIPTIONS: Transcription[] = [
  {
    id: "txn-001",
    appointmentId: "apt-004",
    status: "done",
    language: "en-US",
    segments: [
      {
        id: "seg-001",
        speaker: "doctor",
        text: "Good morning, David. How have you been feeling since our last visit? Any chest pain or shortness of breath?",
        startTime: 0,
        endTime: 6.2,
        confidence: 0.98,
      },
      {
        id: "seg-002",
        speaker: "patient",
        text: "Much better actually. The new medication seems to be working. I only had one episode of mild discomfort last week.",
        startTime: 7.1,
        endTime: 14.5,
        confidence: 0.96,
      },
      {
        id: "seg-003",
        speaker: "doctor",
        text: "That's encouraging. Your blood pressure readings have been trending in the right direction. Let's review your latest ECG results.",
        startTime: 15.2,
        endTime: 23.8,
        confidence: 0.97,
      },
    ],
    summary:
      "Patient reports significant improvement with the new medication regimen. One mild episode of discomfort reported last week. Blood pressure trending positively. ECG review scheduled.",
    keywords: ["hypertension", "ECG", "blood pressure", "medication compliance"],
    sentiment: "positive",
    createdAt: "2026-06-18T08:35:00Z",
    updatedAt: "2026-06-18T08:50:00Z",
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-001",
    type: "appointment",
    title: "Appointment Starting Soon",
    message: "Your appointment with Sarah Johnson begins in 15 minutes.",
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60_000).toISOString(),
    href: "/appointments/apt-001",
  },
  {
    id: "notif-002",
    type: "transcription",
    title: "Transcription Ready",
    message: "AI summary for David Kim's consultation is ready to review.",
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60_000).toISOString(),
    href: "/transcriptions/txn-001",
  },
  {
    id: "notif-003",
    type: "message",
    title: "New Message",
    message: "Dr. Aisha Patel sent you a consultation request.",
    isRead: true,
    createdAt: new Date(Date.now() - 60 * 60_000).toISOString(),
    href: "/messages",
  },
];

// ─── Pagination ───────────────────────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

// ─── Dates & Time ─────────────────────────────────────────────────────────────

export const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30",
] as const;
