import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, FormField } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  Bell,
  Shield,
  Mic,
  Globe,
  User,
  Palette,
  KeyRound,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your MediVoice AI account and preferences.",
};

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 shrink-0">
        <Icon className="h-5 w-5 text-primary-600" strokeWidth={2} />
      </div>
      <div>
        <h2 className="text-[15px] font-semibold text-slate-900 leading-none">{title}</h2>
        <p className="text-[13px] text-slate-500 mt-1 leading-none">{description}</p>
      </div>
    </div>
  );
}

function ToggleSwitch({ id, defaultChecked = false }: { id: string; defaultChecked?: boolean }) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full",
        "bg-slate-200 transition-colors duration-200",
        "has-[:checked]:bg-primary-600 focus-within:ring-[3px] focus-within:ring-primary-500/20"
      )}
    >
      <input
        type="checkbox"
        id={id}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5 shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
    </label>
  );
}

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      subtitle="Manage account preferences and system configuration"
    >
      <div className="max-w-3xl space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <SectionHeader
              icon={User}
              title="Profile"
              description="Your personal and professional information"
            />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar row */}
            <div className="flex items-center gap-5">
              <Avatar name="Dr. Michael Chen" size="xl" />
              <div>
                <p className="text-[14px] font-semibold text-slate-900">Profile Photo</p>
                <p className="text-[12px] text-slate-500 mt-0.5">JPG, PNG or GIF. Max 5MB.</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">Upload Photo</Button>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="First Name" required htmlFor="firstName">
                <Input id="firstName" defaultValue="Michael" />
              </FormField>
              <FormField label="Last Name" required htmlFor="lastName">
                <Input id="lastName" defaultValue="Chen" />
              </FormField>
              <FormField label="Email Address" required htmlFor="email">
                <Input id="email" type="email" defaultValue="michael.chen@medivoice.ai" />
              </FormField>
              <FormField label="Phone Number" htmlFor="phone">
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </FormField>
              <FormField
                label="License Number"
                required
                htmlFor="license"
                hint="Your medical license number as issued by your state board."
              >
                <Input id="license" defaultValue="MD-123456" />
              </FormField>
              <FormField label="Specialty" htmlFor="specialty">
                <Input id="specialty" defaultValue="Cardiology" />
              </FormField>
            </div>

            <div className="flex justify-end pt-2">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <SectionHeader
              icon={Bell}
              title="Notifications"
              description="Control what alerts you receive and how"
            />
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-slate-100">
              {[
                { id: "notif-appt", label: "Appointment Reminders", description: "Get notified 15 minutes before appointments", checked: true },
                { id: "notif-txn", label: "Transcription Complete", description: "Alert when AI finishes processing a session", checked: true },
                { id: "notif-msg", label: "New Messages", description: "Receive alerts for new team messages", checked: false },
                { id: "notif-alert", label: "Critical Alerts", description: "Emergency patient status notifications", checked: true },
              ].map(({ id, label, description, checked }) => (
                <li key={id} className="flex items-center justify-between py-4 gap-4">
                  <div>
                    <p className="text-[14px] font-medium text-slate-900">{label}</p>
                    <p className="text-[13px] text-slate-500 mt-0.5">{description}</p>
                  </div>
                  <ToggleSwitch id={id} defaultChecked={checked} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Voice & Transcription */}
        <Card>
          <CardHeader>
            <SectionHeader
              icon={Mic}
              title="Voice & Transcription"
              description="Configure AI transcription preferences"
            />
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-slate-100">
              {[
                { id: "auto-summarize", label: "Auto-Generate Summary", description: "Automatically create clinical notes after each session", checked: true },
                { id: "speaker-id", label: "Speaker Identification", description: "Distinguish between doctor and patient voices", checked: true },
                { id: "confidence-score", label: "Show Confidence Scores", description: "Display accuracy percentages on each transcript segment", checked: false },
              ].map(({ id, label, description, checked }) => (
                <li key={id} className="flex items-center justify-between py-4 gap-4">
                  <div>
                    <p className="text-[14px] font-medium text-slate-900">{label}</p>
                    <p className="text-[13px] text-slate-500 mt-0.5">{description}</p>
                  </div>
                  <ToggleSwitch id={id} defaultChecked={checked} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <SectionHeader
              icon={Shield}
              title="Security"
              description="Protect your account and patient data"
            />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-[14px] font-medium text-slate-900">Two-Factor Authentication</p>
                <p className="text-[12px] text-slate-500 mt-0.5">Secure your account with an authenticator app</p>
              </div>
              <Badge variant="success">Enabled</Badge>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-[14px] font-medium text-slate-900">HIPAA Audit Log</p>
                <p className="text-[12px] text-slate-500 mt-0.5">All data access is logged for compliance</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>

            <Button variant="outline" className="w-full gap-2">
              <KeyRound className="h-4 w-4 text-slate-500" />
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 border border-red-100 shrink-0">
                <Trash2 className="h-5 w-5 text-red-500" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-slate-900 leading-none">Danger Zone</h2>
                <p className="text-[13px] text-slate-500 mt-1 leading-none">Irreversible account actions</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-200 bg-red-50/50">
              <div>
                <p className="text-[14px] font-semibold text-red-700">Delete Account</p>
                <p className="text-[12px] text-red-600/80 mt-1">
                  Permanently delete your account and all associated data. This cannot be undone.
                </p>
              </div>
              <Button variant="destructive" size="sm" className="shrink-0">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
