import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { MOCK_NOTIFICATIONS } from "@/constants";
import { MessageSquare, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Messages",
  description: "Secure internal messaging for your clinical team.",
};

const MOCK_THREADS = [
  {
    id: "thread-1",
    name: "Dr. Aisha Patel",
    lastMessage: "Please review the MRI scan for patient Martinez.",
    timestamp: new Date(Date.now() - 20 * 60_000).toISOString(),
    unread: 2,
    online: true,
  },
  {
    id: "thread-2",
    name: "Dr. James Wilson",
    lastMessage: "The lab results are back for Emily Thompson.",
    timestamp: new Date(Date.now() - 2 * 60 * 60_000).toISOString(),
    unread: 0,
    online: false,
  },
  {
    id: "thread-3",
    name: "Nurse Sarah O'Brien",
    lastMessage: "Room 4 is ready for the next patient.",
    timestamp: new Date(Date.now() - 4 * 60 * 60_000).toISOString(),
    unread: 1,
    online: true,
  },
];

export default function MessagesPage() {
  return (
    <AppShell title="Messages" subtitle="Secure clinical team communication" contentClass="max-w-[1200px]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 h-[calc(100vh-10rem)]">
        {/* Thread List */}
        <Card className="overflow-hidden flex flex-col">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <ul className="divide-y divide-slate-100">
              {MOCK_THREADS.map((thread) => (
                <li
                  key={thread.id}
                  className="flex items-start gap-3 px-5 py-4 hover:bg-slate-50 cursor-pointer transition-colors duration-150"
                >
                  <Avatar
                    name={thread.name}
                    size="md"
                    status={thread.online ? "online" : "offline"}
                  />
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-semibold text-slate-900 truncate leading-none">
                        {thread.name}
                      </p>
                      <span className="text-[11px] font-medium text-slate-400 shrink-0">
                        {formatRelativeTime(thread.timestamp)}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 truncate mt-1.5 leading-none">
                      {thread.lastMessage}
                    </p>
                  </div>
                  {thread.unread > 0 && (
                    <Badge variant="solid-default" size="sm" className="mt-0.5">
                      {thread.unread}
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Chat Panel */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <Avatar name="Dr. Aisha Patel" size="md" status="online" />
              <div>
                <CardTitle className="text-base text-slate-900 leading-none">Dr. Aisha Patel</CardTitle>
                <CardDescription className="text-[12px] mt-1 text-slate-500 leading-none">
                  Neurology · Online now
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50">
            <div className="flex gap-3">
              <Avatar name="Dr. Aisha Patel" size="sm" />
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <p className="text-[13px] text-slate-700 leading-relaxed">
                  Please review the MRI scan for patient Martinez. The results show some anomalies we should discuss.
                </p>
                <p className="text-[10px] text-slate-400 mt-1.5 font-medium">20 minutes ago</p>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <Avatar name="Dr. Michael Chen" size="sm" />
              <div className="bg-primary-600 rounded-2xl rounded-tr-sm px-4 py-3 max-w-sm shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                <p className="text-[13px] text-white leading-relaxed">
                  I&apos;ll take a look right away. Can you share the timestamp of the scan?
                </p>
                <p className="text-[10px] text-primary-100 mt-1.5 font-medium">15 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider pt-2">
              <div className="flex-1 h-px bg-slate-200" />
              <span>Today</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a message…"
                className="flex-1"
                aria-label="Message input"
              />
              <Button size="icon" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
