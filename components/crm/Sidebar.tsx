import Link from "next/link";
import { BarChart3, LayoutGrid, Settings, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ active = "/dashboard" }: { active?: string }) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-800/80 bg-[linear-gradient(180deg,rgba(2,6,23,0.98),rgba(8,15,32,0.94))] p-6 lg:flex lg:flex-col">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">LeadFlow</p>
          <p className="text-sm text-slate-400">CRM workspace</p>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-cyan-500/12 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.14)]"
                  : "text-slate-400 hover:bg-slate-900/90 hover:text-slate-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 shadow-[0_0_40px_rgba(2,8,23,0.38)]">
        <p className="text-sm font-medium text-white">Need more visibility?</p>
        <p className="mt-1 text-sm text-slate-400">Track every motion in one place.</p>
      </div>
    </aside>
  );
}
