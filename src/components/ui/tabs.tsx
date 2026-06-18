"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

// ─── Pill Tabs (default) — Linear style ───────────────────────────────────────

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: "pills" | "underline"
  }
>(({ className, variant = "pills", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      variant === "pills" && [
        "inline-flex h-9 items-center justify-center gap-1",
        "rounded-xl bg-slate-100 border border-slate-200/80 p-1",
      ],
      variant === "underline" && [
        "inline-flex h-auto items-center justify-start gap-0 border-b border-slate-200 w-full",
      ],
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "pills" | "underline";
  }
>(({ className, variant = "pills", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Shared
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
      "text-sm font-medium transition-all duration-150",
      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20",
      "disabled:pointer-events-none disabled:opacity-50",

      // Pills variant
      variant === "pills" && [
        "rounded-lg px-3 py-1.5 text-slate-600",
        "hover:text-slate-900",
        "data-[state=active]:bg-white data-[state=active]:text-slate-900",
        "data-[state=active]:shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]",
      ],

      // Underline variant
      variant === "underline" && [
        "relative px-4 py-2.5 text-slate-500 rounded-none",
        "hover:text-slate-900",
        "data-[state=active]:text-primary-600",
        "data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0",
        "data-[state=active]:after:right-0 data-[state=active]:after:h-0.5",
        "data-[state=active]:after:bg-primary-600 data-[state=active]:after:rounded-t-full",
      ],

      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4",
      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20",
      "data-[state=inactive]:hidden",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
