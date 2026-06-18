import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { TranscriptionPanel } from "@/features/transcriptions/transcription-panel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatRelativeTime, formatDate } from "@/lib/utils";
import { MOCK_TRANSCRIPTIONS } from "@/constants";
import { FileText, CheckCircle2, Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "Transcriptions",
  description: "Manage AI-powered voice transcriptions and clinical documentation.",
};

export default function TranscriptionsPage() {
  return (
    <AppShell
      title="Transcriptions"
      subtitle="AI-powered voice transcription and clinical note generation"
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Live Panel */}
        <div className="xl:col-span-1">
          <TranscriptionPanel />
        </div>

        {/* History */}
        <div className="xl:col-span-1 space-y-4">
          <h2 className="text-[14px] font-semibold text-slate-900 uppercase tracking-wider mb-2">Recent Transcriptions</h2>
          {MOCK_TRANSCRIPTIONS.map((txn) => (
            <Card key={txn.id} hoverable>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 shrink-0">
                      {txn.status === "done" ? (
                        <CheckCircle2 className="h-5 w-5 text-primary-600" />
                      ) : (
                        <Mic className="h-5 w-5 text-primary-600" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base text-slate-900 leading-none">
                        Consultation #{txn.id.slice(-3)}
                      </CardTitle>
                      <CardDescription className="text-[12px] mt-1">
                        {formatDate(txn.createdAt, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                        {" · "}
                        <span className="font-medium text-slate-500">{txn.segments.length} segments</span>
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={txn.status === "done" ? "success" : "default"}
                  >
                    {txn.status === "done" ? "Completed" : txn.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Summary */}
                {txn.summary && (
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        AI Summary
                      </span>
                    </div>
                    <p className="text-[13px] text-slate-700 leading-relaxed font-medium">{txn.summary}</p>
                  </div>
                )}

                {/* Keywords */}
                {txn.keywords && txn.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {txn.keywords.map((kw) => (
                      <Badge key={kw} variant="secondary" size="sm">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Sample segment */}
                {txn.segments[0] && (
                  <div className="flex gap-3 items-start pt-3 border-t border-slate-100">
                    <Avatar
                      name={txn.segments[0].speaker === "doctor" ? "Doctor" : "Patient"}
                      size="sm"
                    />
                    <div className="flex-1 bg-slate-50 rounded-lg rounded-tl-sm px-3 py-2 border border-slate-100">
                      <p className="text-[12px] text-slate-600 italic">
                        &ldquo;{txn.segments[0].text}&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
