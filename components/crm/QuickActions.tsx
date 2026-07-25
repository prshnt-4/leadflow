"use client";

import Link from "next/link";
import { Plus, Settings, Users, BarChart3 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    label: "Add Lead",
    description: "Create a new lead in the pipeline",
    href: "/dashboard/leads",
    icon: Plus,
  },
  {
    label: "View All Leads",
    description: "Browse and manage your full list",
    href: "/dashboard/leads",
    icon: Users,
  },
  {
    label: "Dashboard",
    description: "Review stats and recent activity",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "Settings",
    description: "Update workspace preferences",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function QuickActions() {
  return (
    <Card className="border-slate-800/70 bg-slate-900/80 text-white shadow-[0_10px_30px_rgba(2,8,23,0.24)] transition-all duration-300 hover:border-slate-700/80 hover:shadow-[0_15px_40px_rgba(2,8,23,0.4)]">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="inline-flex h-auto flex-col items-start gap-2 rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-4 text-left text-slate-100 transition-all duration-200 hover:scale-[1.02] hover:border-cyan-500/40 hover:bg-slate-900 active:scale-[0.98]"
          >
              <action.icon className="h-4 w-4 text-cyan-400" />
              <span className="font-medium text-white">{action.label}</span>
              <span className="text-xs font-normal text-slate-400">
                {action.description}
              </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
