"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Server, CalendarDays, MessageSquare, Settings, AlertTriangle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Server, label: "Machines", href: "/dashboard/machines" },
  { icon: AlertTriangle, label: "Alerts", href: "/dashboard/alerts", badge: 3 },
  { icon: CalendarDays, label: "Schedule", href: "/dashboard/schedule" },
  { icon: MessageSquare, label: "AI Query", href: "/dashboard/query" },
];

const adminItems = [
  { icon: PlusCircle, label: "Onboard Machine", href: "/dashboard/onboarding" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full glass-panel border-y-0 border-l-0 flex flex-col p-4 z-40">
      <div className="mb-8 px-2">
        <h2 className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-widest mb-4">Operations</h2>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium group",
                  isActive ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-[inset_2px_0_0_var(--color-primary)]" : "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)]"
                )}>
                  <item.icon className={cn("w-5 h-5", isActive && "fill-[var(--color-primary)]/20")} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-[var(--color-destructive)] text-[#E6EDF3] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-2">
        <h2 className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-widest mb-4">Administration</h2>
        <nav className="flex flex-col gap-1">
          {adminItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium group",
                  isActive ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-[inset_2px_0_0_var(--color-primary)]" : "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)]"
                )}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-2 px-2 text-xs text-[var(--color-muted)] mb-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
          <span>Platform Online</span>
        </div>
        <p className="px-2 text-[10px] font-mono text-[var(--color-muted)] opacity-50">v4.2.0-stable</p>
      </div>
    </aside>
  );
}
