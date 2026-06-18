"use client";

import React, { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  HelpCircle,
  Command,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn, formatRelativeTime } from "@/lib/utils";
import { MOCK_NOTIFICATIONS } from "@/constants";

// ─── Header ───────────────────────────────────────────────────────────────────

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = "Dashboard", subtitle }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  return (
    <header
      className={cn(
        "sticky top-0 z-[200] flex h-[60px] shrink-0 items-center gap-3 px-6",
        "border-b border-slate-100 bg-white/90 backdrop-blur-xl",
      )}
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[15px] font-semibold text-slate-900 leading-none tracking-[-0.01em] truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12px] text-slate-400 mt-0.5 truncate leading-none">{subtitle}</p>
        )}
      </div>

      {/* ── Search ────────────────────────────────────────────────────── */}
      <div className="hidden md:flex items-center">
        <AnimatePresence mode="wait">
          {searchOpen ? (
            <motion.div
              key="search-input"
              initial={{ width: 40, opacity: 0 }}
              animate={{ width: 264, opacity: 1 }}
              exit={{ width: 40, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <Input
                autoFocus
                placeholder="Search patients, appointments…"
                leftIcon={<Search className="h-4 w-4" />}
                onBlur={() => setSearchOpen(false)}
                className="h-8 text-[13px]"
                aria-label="Global search"
              />
            </motion.div>
          ) : (
            <motion.button
              key="search-trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className={cn(
                "flex items-center gap-2 h-8 px-3 rounded-lg border border-slate-200",
                "bg-slate-50 text-[12px] text-slate-400",
                "hover:bg-slate-100 hover:text-slate-600 hover:border-slate-300",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20",
              )}
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search…</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                <Command className="h-2.5 w-2.5" /> K
              </kbd>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Notifications ─────────────────────────────────────────────── */}
      <div className="relative">
        <SimpleTooltip content="Notifications" side="bottom">
          <button
            onClick={() => { setShowNotifications((s) => !s); setShowUserMenu(false); }}
            aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
            aria-haspopup="true"
            aria-expanded={showNotifications}
            className={cn(
              "relative flex h-8 w-8 items-center justify-center rounded-lg",
              "text-slate-500 transition-all duration-150",
              "hover:bg-slate-100 hover:text-slate-700",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20",
              showNotifications && "bg-slate-100 text-slate-700"
            )}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white leading-none ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>
        </SimpleTooltip>

        <AnimatePresence>
          {showNotifications && (
            <NotificationsDropdown onClose={() => setShowNotifications(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* ── User Menu ─────────────────────────────────────────────────── */}
      <div className="relative">
        <button
          onClick={() => { setShowUserMenu((s) => !s); setShowNotifications(false); }}
          aria-haspopup="true"
          aria-expanded={showUserMenu}
          aria-label="User menu"
          className={cn(
            "flex items-center gap-2 rounded-xl px-2 py-1.5",
            "hover:bg-slate-50 transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20",
            showUserMenu && "bg-slate-50",
          )}
        >
          <Avatar name="Dr. Michael Chen" size="sm" status="online" />
          <div className="hidden md:block text-left">
            <p className="text-[12px] font-semibold text-slate-900 leading-none">Dr. Michael Chen</p>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-none">Cardiologist</p>
          </div>
          <ChevronDown
            className={cn(
              "hidden md:block h-3.5 w-3.5 text-slate-400 transition-transform duration-150",
              showUserMenu && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence>
          {showUserMenu && (
            <UserMenuDropdown onClose={() => setShowUserMenu(false)} />
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// ─── Dropdown Base ────────────────────────────────────────────────────────────

const dropdownBase = cn(
  "absolute right-0 top-full mt-2 z-[300] overflow-hidden",
  "rounded-xl border border-slate-200/80 bg-white",
  "shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)]",
);

const dropdownAnimation = {
  initial: { opacity: 0, y: -6, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: -6, scale: 0.97 },
};

// ─── Notifications Dropdown ───────────────────────────────────────────────────

function NotificationsDropdown({ onClose }: { onClose: () => void }) {
  const iconColor: Record<string, string> = {
    appointment:   "bg-primary-100 text-primary-600",
    transcription: "bg-accent-100 text-accent-600",
    message:       "bg-purple-100 text-purple-600",
    alert:         "bg-red-100 text-red-600",
    system:        "bg-slate-100 text-slate-600",
  };

  return (
    <motion.div {...dropdownAnimation} transition={{ duration: 0.15, ease: "easeOut" }} onMouseLeave={onClose} className={cn(dropdownBase, "w-80")}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <span className="text-[13px] font-semibold text-slate-900">Notifications</span>
        {MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length > 0 && (
          <Badge variant="solid-default" size="sm">
            {MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length} new
          </Badge>
        )}
      </div>

      {/* Items */}
      <ul className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
        {MOCK_NOTIFICATIONS.map((notif) => (
          <li
            key={notif.id}
            className={cn(
              "flex items-start gap-3 px-4 py-3 cursor-pointer",
              "transition-colors duration-100 hover:bg-slate-50",
              !notif.isRead && "bg-primary-50/40"
            )}
          >
            <div className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg mt-0.5",
              iconColor[notif.type] ?? "bg-slate-100 text-slate-600"
            )}>
              <Bell className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-800 truncate">{notif.title}</p>
              <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{notif.message}</p>
              <p className="text-[11px] text-slate-400 mt-1">{formatRelativeTime(notif.createdAt)}</p>
            </div>
            {!notif.isRead && (
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0" />
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50">
        <button className="text-[12px] font-medium text-primary-600 hover:text-primary-700 transition-colors">
          Mark all as read
        </button>
      </div>
    </motion.div>
  );
}

// ─── User Menu Dropdown ───────────────────────────────────────────────────────

function UserMenuDropdown({ onClose }: { onClose: () => void }) {
  const items = [
    { icon: User,        label: "My Profile",     href: "/profile",        danger: false },
    { icon: Settings,    label: "Settings",        href: "/settings",       danger: false },
    { icon: HelpCircle,  label: "Help & Support",  href: "/support",        danger: false },
    { icon: LogOut,      label: "Sign Out",         href: "/auth/logout",   danger: true  },
  ];

  return (
    <motion.div {...dropdownAnimation} transition={{ duration: 0.15, ease: "easeOut" }} onMouseLeave={onClose} className={cn(dropdownBase, "w-56")}>
      {/* Identity */}
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Avatar name="Dr. Michael Chen" size="sm" status="online" />
          <div>
            <p className="text-[13px] font-semibold text-slate-900 leading-none">Dr. Michael Chen</p>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-none">michael.chen@medivoice.ai</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="py-1">
        {items.map(({ icon: Icon, label, href, danger }, i) => (
          <React.Fragment key={label}>
            {i === items.length - 1 && (
              <div className="my-1 mx-2 h-px bg-slate-100" />
            )}
            <a
              href={href}
              className={cn(
                "flex items-center gap-2.5 mx-2 px-2.5 py-2 rounded-lg text-[13px]",
                "transition-colors duration-100",
                danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-70" />
              {label}
            </a>
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
