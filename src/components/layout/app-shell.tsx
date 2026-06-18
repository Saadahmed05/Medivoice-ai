import React from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  /** Additional classes on the main content wrapper */
  contentClass?: string;
}

export function AppShell({ children, title, subtitle, contentClass }: AppShellProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
        <Header title={title} subtitle={subtitle} />

        {/* Scrollable content */}
        <main
          id="main-content"
          className={cn(
            "flex-1 overflow-y-auto",
            "px-6 py-6 max-w-screen-2xl mx-auto w-full",
            contentClass
          )}
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
