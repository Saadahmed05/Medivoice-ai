// ─── User & Auth ─────────────────────────────────────────────────────────────

export type UserRole = "patient" | "doctor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

// ─── Appointment ──────────────────────────────────────────────────────────────

export type AppointmentStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | "in-progress"
  | "no-show";

export type AppointmentType = "in-person" | "teleconsult" | "follow-up";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  transcriptionId?: string;
}

// ─── Transcription ────────────────────────────────────────────────────────────

export type TranscriptionStatus = "idle" | "recording" | "processing" | "done" | "error";

export interface TranscriptionSegment {
  id: string;
  speaker: "doctor" | "patient";
  text: string;
  startTime: number;
  endTime: number;
  confidence: number;
}

export interface Transcription {
  id: string;
  appointmentId: string;
  status: TranscriptionStatus;
  language: string;
  segments: TranscriptionSegment[];
  summary?: string;
  keywords?: string[];
  sentiment?: "positive" | "neutral" | "negative";
  createdAt: string;
  updatedAt: string;
}

// ─── Patient ──────────────────────────────────────────────────────────────────

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface Patient {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodGroup?: BloodGroup;
  phone: string;
  email: string;
  address?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory?: MedicalRecord[];
  allergies?: string[];
  currentMedications?: Medication[];
}

// ─── Medical Records ──────────────────────────────────────────────────────────

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  icdCode?: string;
  notes: string;
  attachments?: string[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
}

// ─── Doctor ───────────────────────────────────────────────────────────────────

export interface Doctor {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  specialty: string;
  licenseNumber: string;
  qualifications: string[];
  experience: number; // years
  languages: string[];
  rating: number;
  totalReviews: number;
  availableSlots?: TimeSlot[];
  clinic?: {
    name: string;
    address: string;
    phone: string;
  };
}

export interface TimeSlot {
  date: string;
  time: string;
  isAvailable: boolean;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalPatients: number;
  appointmentsToday: number;
  pendingTranscriptions: number;
  completedToday: number;
  weeklyChange: {
    patients: number;
    appointments: number;
    transcriptions: number;
  };
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

// ─── Notification ─────────────────────────────────────────────────────────────

export type NotificationType =
  | "appointment"
  | "transcription"
  | "message"
  | "alert"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  href?: string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
}

// ─── Feature flags ────────────────────────────────────────────────────────────

export interface FeatureFlags {
  voiceTranscription: boolean;
  aiSummary: boolean;
  teleconsult: boolean;
  patientPortal: boolean;
  analytics: boolean;
}
