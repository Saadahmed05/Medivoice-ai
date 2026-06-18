"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Mic,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// ─── Nav Item Types ───────────────────────────────────────────────────────────

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
}

const PRIMARY_NAV: NavItem[] = [
  { href: "/dashboard",      icon: LayoutDashboard, label: "Dashboard" },
  { href: "/appointments",   icon: Calendar,        label: "Appointments",   badge: 3 },
  { href: "/patients",       icon: Users,           label: "Patients" },
  { href: "/transcriptions", icon: Mic,             label: "Transcriptions", badge: 7 },
  { href: "/analytics",      icon: BarChart3,       label: "Analytics" },
  { href: "/messages",       icon: MessageSquare,   label: "Messages",       badge: 2 },
];

const SECONDARY_NAV: NavItem[] = [
  { href: "/settings", icon: Settings, label: "Settings" },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "relative flex h-screen flex-col shrink-0 overflow-hidden",
        "border-r border-slate-100 bg-white",
      )}
    >
      {/* ── Logo ────────────────────────────────────────────────────────── */}
      <div className="relative flex h-16 items-center gap-3 px-4 border-b border-slate-100 shrink-0">
        {/* Logo mark */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 shadow-[0_2px_8px_rgba(37,99,235,0.35)]">
          <Stethoscope className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              key="logo-text"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <p className="text-[14px] font-bold text-slate-900 leading-none tracking-[-0.02em]">
                MediVoice
              </p>
              <p className="text-[10px] font-semibold text-accent-600 leading-none mt-0.5 tracking-wider uppercase">
                AI Platform
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Primary Navigation ──────────────────────────────────────────── */}
      <nav className="relative flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
        <AnimatePresence>
          {!collapsed && (
            <motion.p
              key="main-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="px-2 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400"
            >
              Main
            </motion.p>
          )}
        </AnimatePresence>

        {PRIMARY_NAV.map(({ href, icon: Icon, label, badge }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === href
              : pathname.startsWith(href);

          const navLink = (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-xl px-2.5 py-2",
                "text-[13px] font-medium transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              {/* Active left accent */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary-600 rounded-r-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors duration-150",
                  isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-600"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.12 }}
                    className="flex-1 truncate"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Badge (expanded) */}
              {badge !== undefined && !collapsed && (
                <Badge variant="solid-default" size="sm" className="ml-auto shrink-0 text-[10px] h-4 min-w-[16px] px-1.5">
                  {badge}
                </Badge>
              )}

              {/* Collapsed badge dot */}
              {badge !== undefined && collapsed && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary-500" />
              )}
            </Link>
          );

          return collapsed ? (
            <SimpleTooltip key={href} content={label} side="right" delayDuration={150}>
              {navLink}
            </SimpleTooltip>
          ) : (
            navLink
          );
        })}

        {/* Divider */}
        <div className="mx-1 my-3 h-px bg-slate-100" />

        <AnimatePresence>
          {!collapsed && (
            <motion.p
              key="system-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400"
            >
              System
            </motion.p>
          )}
        </AnimatePresence>

        {SECONDARY_NAV.map(({ href, icon: Icon, label }) => {
          const isActive = pathname.startsWith(href);
          const navLink = (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-2.5 rounded-xl px-2.5 py-2",
                "text-[13px] font-medium transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20",
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive ? "text-slate-700" : "text-slate-400 group-hover:text-slate-600"
                )}
                strokeWidth={2}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );

          return collapsed ? (
            <SimpleTooltip key={href} content={label} side="right" delayDuration={150}>
              {navLink}
            </SimpleTooltip>
          ) : (
            navLink
          );
        })}
      </nav>

      {/* ── AI Status Widget ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="status-widget"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative mx-3 mb-3 rounded-xl border border-accent-100 bg-accent-50 p-3",
            )}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="relative flex items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-accent-500 animate-ping opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-accent-500" />
              </div>
              <span className="text-[12px] font-semibold text-accent-700">AI Online</span>
            </div>
            <p className="text-[11px] text-accent-600 leading-relaxed">
              Voice transcription ready. 7 sessions pending.
            </p>
            <div className="mt-2 flex items-center gap-1">
              <Activity className="h-3 w-3 text-accent-500" />
              <span className="text-[10px] font-medium text-accent-600">24 active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Collapse Toggle ──────────────────────────────────────────────── */}
      <SimpleTooltip
        content={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        side="right"
        delayDuration={300}
      >
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "absolute -right-3 top-[72px] z-10",
            "flex h-6 w-6 items-center justify-center rounded-full",
            "border border-slate-200 bg-white shadow-sm",
            "text-slate-400 hover:text-slate-700 hover:border-slate-300",
            "transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </SimpleTooltip>
    </motion.aside>
  );
}
