"use client";

import { useState } from "react";
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
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";

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
          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          item.active
            ? "border-l-[3px] border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-600)] pl-[9px]"
            : "text-[var(--content-default)] hover:bg-[var(--bg-subtle)]"
        )}
      >
        <item.icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        {item.expandable && <ChevronRight className="h-3.5 w-3.5 opacity-50" />}
      </button>
    </li>
  );
}

function SidebarContent() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-full flex-col">
      {/* User section */}
      <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.pravatar.cc/40?u=lina-rahman"
          alt="Lina Rahman"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-[var(--content-emphasis)] truncate">
              Lina Rahman
            </span>
            <span className="inline-flex items-center rounded bg-[var(--color-brand-100)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-brand-600)]">
              Pro
            </span>
          </div>
          <p className="text-xs text-[var(--content-subtle)] truncate">Atlas Estates</p>
        </div>
        <ChevronDown className="h-4 w-4 text-[var(--content-muted)] shrink-0" />
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-default)] px-3 py-1.5">
          <Search className="h-4 w-4 text-[var(--content-muted)]" />
          <span className="flex-1 text-sm text-[var(--content-muted)]">Search</span>
          <div className="flex items-center gap-0.5">
            <kbd className="rounded border border-[var(--border-default)] bg-[var(--bg-subtle)] px-1 py-0.5 text-[10px] text-[var(--content-muted)]">
              ⌘
            </kbd>
            <kbd className="rounded border border-[var(--border-default)] bg-[var(--bg-subtle)] px-1 py-0.5 text-[10px] text-[var(--content-muted)]">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Dashboard link — active page state: blue icon + text */}
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          <li>
            <button className="flex w-full items-center gap-3 rounded-md bg-[var(--color-brand-50)] px-3 py-2 text-sm font-semibold text-[var(--color-brand-600)]">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>
          </li>
        </ul>

        {/* CRM group */}
        <div className="mt-5">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)]">
            CRM
          </p>
          <ul className="space-y-0.5">
            {crmItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </ul>
        </div>

        {/* Workspace group */}
        <div className="mt-5">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)]">
            Workspace
          </p>
          <ul className="space-y-0.5">
            {workspaceItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </ul>
        </div>
      </nav>

      {/* Bottom items */}
      <div className="border-t border-[var(--border-subtle)] px-3 py-3">
        <ul className="space-y-0.5">
          {bottomItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </ul>
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-2 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[var(--content-subtle)] hover:bg-[var(--bg-subtle)] transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
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
        className="fixed left-4 top-4 z-50 rounded-md p-2 hover:bg-[var(--bg-subtle)] lg:hidden"
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
          "fixed inset-y-0 left-0 z-50 w-56 transform bg-[var(--bg-default)] border-r border-[var(--border-subtle)] transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-4 rounded-md p-1 hover:bg-[var(--bg-subtle)]"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4 text-[var(--content-subtle)]" />
        </button>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 border-r border-[var(--border-subtle)] bg-[var(--bg-default)] lg:block">
        <SidebarContent />
      </aside>
    </>
  );
}
