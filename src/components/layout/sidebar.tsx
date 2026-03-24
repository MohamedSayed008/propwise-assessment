"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Inbox,
  Users,
  Handshake,
  Contact,
  CheckSquare,
  CalendarDays,
  Building2,
  Megaphone,
  BarChart3,
  UsersRound,
  Settings,
  Search,
  ChevronsUpDown,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  CircleHelp,
  LogOut,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";

/* ── Avatar from Ellipse.svg (32px circular photo) ── */
function AvatarPhoto({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <circle cx="8" cy="8" r="8" fill="url(#avatarPat)" />
      <defs>
        <pattern id="avatarPat" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#avatarBmp" transform="scale(0.00581395)" />
        </pattern>
        <image
          id="avatarBmp"
          width="172"
          height="172"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  active?: boolean;
  expandable?: boolean;
}

const crmItems: NavItem[] = [
  { label: "Inbox", icon: Inbox },
  { label: "Leads", icon: Users, active: true },
  { label: "Deals", icon: Handshake },
  { label: "Contacts", icon: Contact },
  { label: "Tasks", icon: CheckSquare },
  { label: "Calendar", icon: CalendarDays },
];

const workspaceItems: NavItem[] = [
  { label: "Properties", icon: Building2, expandable: true },
  { label: "Marketing", icon: Megaphone, expandable: true },
  { label: "Reports", icon: BarChart3, expandable: true },
];

const bottomItems: NavItem[] = [
  { label: "Team", icon: UsersRound },
  { label: "Settings", icon: Settings },
];

function NavLink({ item }: { item: NavItem }) {
  return (
    <li>
      <button
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-sm font-medium leading-4 transition-colors",
          item.active
            ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
            : "text-[var(--content-default)] hover:bg-[var(--bg-subtle)]"
        )}
      >
        <item.icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        {item.expandable && (
          <ChevronRight className="h-3 w-3 text-[var(--content-muted)]" />
        )}
      </button>
    </li>
  );
}

/* ── User dropdown menu ── */
function UserDropdown() {
  return (
    <div className="absolute left-3 right-0 top-full z-50 mt-1 w-52 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-default)] py-1.5 shadow-dropdown">
      {/* Org header */}
      <div className="flex items-center gap-2.5 px-3 py-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-blue-500 text-[10px] font-bold text-white">
          AE
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--content-emphasis)]">Atlas Estates</p>
          <p className="text-xs text-[var(--content-subtle)]">Business · 12 members</p>
        </div>
      </div>

      <div className="my-1 h-px bg-[var(--border-subtle)]" />

      <button className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-sm text-[var(--content-default)] hover:bg-[var(--bg-subtle)]">
        <span className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Online
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-green-600">Active</span>
      </button>
      <button className="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-sm text-[var(--content-default)] hover:bg-[var(--bg-subtle)]">
        <User className="h-4 w-4 text-[var(--content-subtle)]" />
        My Profile
      </button>
      <button className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-sm text-[var(--content-default)] hover:bg-[var(--bg-subtle)]">
        <span className="flex items-center gap-2.5">
          <Bell className="h-4 w-4 text-[var(--content-subtle)]" />
          Notifications
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          2
        </span>
      </button>
      <button className="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-sm text-[var(--content-default)] hover:bg-[var(--bg-subtle)]">
        <CircleHelp className="h-4 w-4 text-[var(--content-subtle)]" />
        Help &amp; Support
      </button>

      <div className="my-1 h-px bg-[var(--border-subtle)]" />

      <button className="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-sm text-[var(--content-default)] hover:bg-[var(--bg-subtle)]">
        <LogOut className="h-4 w-4 text-[var(--content-subtle)]" />
        Sign out
      </button>
    </div>
  );
}

function SidebarContent() {
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <div className="flex h-full flex-col bg-[var(--bg-muted)]">
      {/* User section */}
      <div ref={dropdownRef} className="relative px-3 pt-4 pb-3">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex w-full cursor-pointer items-center gap-2 rounded-md p-1.5"
        >
          {/* 32px avatar with small org icon at bottom-right */}
          <div className="relative shrink-0">
            <AvatarPhoto size={32} />
            {/* Small org avatar at bottom-right */}
            <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border border-[var(--border-subtle)] bg-gradient-to-br from-green-400 to-blue-500" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium leading-4 text-[var(--content-default)] truncate">
              Lina Rahman
            </p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="text-[10.5px] text-[var(--content-subtle)] truncate">
                Atlas Estates
              </span>
              <span className="inline-flex items-center rounded bg-[var(--color-brand-100)] px-1 py-px text-[8px] font-medium text-[var(--color-brand-700)]">
                Pro
              </span>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-[var(--content-muted)]" />
        </button>

        {dropdownOpen && <UserDropdown />}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        {/* Search */}
        <div className="mb-3">
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-white px-2 py-1.5 dark:bg-[var(--bg-default)]">
            <Search className="h-3.5 w-3.5 text-[var(--content-muted)]" />
            <span className="flex-1 text-[13px] text-[var(--content-muted)]">Search</span>
            <div className="flex items-center gap-0.5">
              <kbd className="rounded border border-[var(--border-subtle)] bg-white px-1 py-0.5 text-[10px] text-[var(--content-muted)] dark:bg-[var(--bg-subtle)]">
                ⌘
              </kbd>
              <kbd className="rounded border border-[var(--border-subtle)] bg-white px-1 py-0.5 text-[10px] text-[var(--content-muted)] dark:bg-[var(--bg-subtle)]">
                K
              </kbd>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <ul className="space-y-0.5">
          <li>
            <button className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-sm font-medium leading-4 text-[var(--content-default)] hover:bg-[var(--bg-subtle)]">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>
          </li>
        </ul>

        {/* CRM group */}
        <div className="mt-3">
          <p className="px-2 pb-3 text-xs text-[var(--content-subtle)]">
            CRM
          </p>
          <ul className="space-y-0.5">
            {crmItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </ul>
        </div>

        {/* Workspace group */}
        <div className="mt-3">
          <p className="px-2 pb-3 text-xs text-[var(--content-subtle)]">
            Workspace
          </p>
          <ul className="space-y-0.5">
            {workspaceItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer items */}
      <div className="px-3 pb-3 pt-1">
        <ul className="space-y-0.5">
          {bottomItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </ul>
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-sm font-medium leading-4 text-[var(--content-subtle)] hover:bg-[var(--bg-subtle)] transition-colors"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 cursor-pointer rounded-md p-2 hover:bg-[var(--bg-subtle)] lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5 text-[var(--content-default)]" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-56 transform border-r border-[var(--border-subtle)] transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-4 z-10 cursor-pointer rounded-md p-1 hover:bg-[var(--bg-subtle)]"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4 text-[var(--content-subtle)]" />
        </button>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 border-r border-[var(--border-subtle)] lg:block">
        <SidebarContent />
      </aside>

      {/* Help button — bottom-right floating */}
      <button
        className="fixed bottom-5 right-5 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--bg-inverted)] text-[var(--content-inverted)] shadow-dropdown transition-transform hover:scale-105"
        aria-label="Help"
      >
        <CircleHelp className="h-5 w-5" />
      </button>
    </>
  );
}
