'use client';

import type { ElementType } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CircleHelp,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CalendarIcon,
  ContactsIcon,
  DashboardIcon,
  DealsIcon,
  InboxIcon,
  LeadsIcon,
  MarketingIcon,
  PropertiesIcon,
  ReportsIcon,
  SettingsIcon,
  TasksIcon,
  TeamIcon,
} from '@/icons';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface NavItem {
  label: string;
  icon: ElementType;
  href: string;
  expandable?: boolean;
}

const crmItems: NavItem[] = [
  { label: 'Inbox', icon: InboxIcon, href: '/inbox' },
  { label: 'Leads', icon: LeadsIcon, href: '/leads' },
  { label: 'Deals', icon: DealsIcon, href: '/deals' },
  { label: 'Contacts', icon: ContactsIcon, href: '/contacts' },
  { label: 'Tasks', icon: TasksIcon, href: '/tasks' },
  { label: 'Calendar', icon: CalendarIcon, href: '/calendar' },
];

const workspaceItems: NavItem[] = [
  {
    label: 'Properties',
    icon: PropertiesIcon,
    href: '/properties',
    expandable: true,
  },
  {
    label: 'Marketing',
    icon: MarketingIcon,
    href: '/marketing',
    expandable: true,
  },
  { label: 'Reports', icon: ReportsIcon, href: '/reports', expandable: true },
];

const bottomItems: NavItem[] = [
  { label: 'Team', icon: TeamIcon, href: '/team' },
  { label: 'Settings', icon: SettingsIcon, href: '/settings' },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          'flex w-full items-center gap-2 rounded-md p-2 text-sm font-medium leading-4 transition-colors',
          active
            ? 'bg-brand-50 text-brand-700'
            : 'text-content-default hover:bg-surface-subtle'
        )}
      >
        <item.icon
          className={cn(
            'h-4 w-4 shrink-0',
            !active && 'text-nav-icon-inactive'
          )}
        />
        <span className="flex-1 text-start">{item.label}</span>
        {item.expandable && (
          <ChevronRight className="h-3 w-3 text-content-muted" />
        )}
      </Link>
    </li>
  );
}

function SidebarContent() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-surface-muted">
      {/* User section */}
      <div className="px-3 pt-4 pb-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-1.5 data-[state=open]:bg-dropdown-trigger-active">
              <Avatar>
                <AvatarImage src="/Avatar.png" alt="Lina Rahman" />
                <AvatarFallback>LR</AvatarFallback>
                <div className="absolute -bottom-0.5 -inset-e-1 z-10 h-4 w-4 rounded-full border border-surface-subtle bg-surface">
                  <Image
                    height={16}
                    width={16}
                    alt="ellipse-icon-badge"
                    src="/Ellipse.png"
                  />
                </div>
                <span className="absolute inset-e-0 top-0 z-10 h-2 w-2 rounded-full border border-surface-muted bg-destructive" />
              </Avatar>
              <div className="flex-1 min-w-0 text-start">
                <p className="text-sm font-medium leading-4 text-content-default truncate">
                  Lina Rahman
                </p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-2xs text-content-subtle truncate">
                    Atlas Estates
                  </span>
                  <span className="inline-flex items-center rounded bg-brand-100 px-1 py-px text-3xs font-medium text-brand-700">
                    Pro
                  </span>
                </div>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-content-muted" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            sideOffset={7}
            align="start"
            className="w-sidebar-dropdown"
          >
            {/* Org header */}
            <div className="flex items-center gap-2 border-b border-dropdown-divider px-3 py-3">
              <Image
                height={32}
                width={32}
                alt="Atlas Estates logo"
                src="/bg-ellipse.png"
              />
              <div>
                <p className="font-heading text-menu font-bold text-brand-900">
                  Atlas Estates
                </p>
                <p className="text-2xs text-dropdown-subtitle">
                  Business · 12 members
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between px-3.5 py-1.5 text-dropdown-item">
              <span className="flex items-center gap-2.5">Online</span>
              <span className="rounded bg-kpi-trend-bg px-1.25 py-px text-3xs font-bold text-sparkline">
                ACTIVE
              </span>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuGroup className="px-1.5 py-0.5">
              <DropdownMenuItem>
                <User className="text-content-subtle" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="justify-between">
                <span className="flex items-center gap-2.5">
                  <Bell className="h-3.5 w-3.5 text-content-subtle" />
                  Notifications
                </span>
                <span className="flex items-center justify-center rounded-full bg-surface-error px-1 py-0.5 text-xs font-medium leading-none text-content-attention">
                  2
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CircleHelp className="text-content-subtle" />
                Help &amp; Support
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup className="px-1.5 py-0.5">
              <DropdownMenuItem>
                <LogOut className="text-content-subtle" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        {/* Search */}

        <div className="relative mb-3">
          <Search className="absolute inset-s-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-content-muted" />
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            className="h-8.75 w-full rounded-md border border-dropdown-border bg-surface ps-8 pe-12 text-search text-content-default placeholder:text-content-muted outline-none"
          />
          <div className="absolute inset-e-2 top-1/2 flex -translate-y-1/2 items-center gap-0.75">
            <kbd className="flex h-4.5 w-4.5 items-center justify-center rounded border border-dropdown-border bg-surface text-2xs text-content-muted dark:bg-surface-subtle">
              ⌘
            </kbd>
            <kbd className="flex h-4.5 w-4.5 items-center justify-center rounded border border-dropdown-border bg-surface text-2xs text-content-muted dark:bg-surface-subtle">
              K
            </kbd>
          </div>
        </div>

        {/* Dashboard */}
        <ul className="space-y-0.5">
          <NavLink
            item={{
              label: 'Dashboard',
              icon: DashboardIcon,
              href: '/dashboard',
            }}
            active={pathname === '/dashboard'}
          />
        </ul>

        {/* CRM group */}
        <div className="mt-3">
          <p className="px-2 pb-3 text-xs text-content-subtle">CRM</p>
          <ul className="space-y-0.5">
            {crmItems.map(item => (
              <NavLink
                key={item.label}
                item={item}
                active={pathname === item.href}
              />
            ))}
          </ul>
        </div>

        {/* Workspace group */}
        <div className="mt-3">
          <p className="px-2 pb-3 text-xs text-content-subtle">Workspace</p>
          <ul className="space-y-0.5">
            {workspaceItems.map(item => (
              <NavLink
                key={item.label}
                item={item}
                active={pathname === item.href}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer items */}
      <div className="px-3 pb-3 pt-1">
        <ul className="space-y-0.5">
          {bottomItems.map(item => (
            <NavLink
              key={item.label}
              item={item}
              active={pathname === item.href}
            />
          ))}
        </ul>
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-sm font-medium leading-4 text-content-subtle hover:bg-surface-subtle transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <>
      {/* Mobile header bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-surface ps-3 pe-5 py-3 desktop-s:hidden">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <button
              className="cursor-pointer rounded-md p-2 hover:bg-surface-subtle"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5 text-content-default" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <SidebarContent />
          </DrawerContent>
        </Drawer>
        <h1 className="font-heading text-lg font-bold text-content-emphasis">
          Dashboard
        </h1>
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 inset-inline-start-0 z-30 hidden w-56 desktop-s:block">
        <SidebarContent />
      </aside>

      {/* Help button — bottom-right floating */}
      <button
        className="fixed bottom-5 inset-e-5 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-surface-inverted text-content-inverted shadow-dropdown transition-transform hover:scale-105"
        aria-label="Help"
      >
        <CircleHelp className="h-5 w-5" />
      </button>
    </>
  );
}
