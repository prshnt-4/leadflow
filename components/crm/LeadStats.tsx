"use client";

import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LeadStatsProps {
  total: number;
  qualified: number;
  won: number;
}

export function LeadStats({
  total,
  qualified,
  won,
}: LeadStatsProps) {
  const stats = [
    {
      label: "Open Leads",
      value: total,
      trend: "+100%",
    },
    {
      label: "Qualified",
      value: qualified,
      trend: "+100%",
    },
    {
      label: "Won",
      value: won,
      trend: "+100%",
    },
    {
      label: "Avg. Deal",
      value: "₹0",
      trend: "0%",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-slate-800/70 bg-slate-900/80 text-white"
        >
          <CardContent className="p-5">
            <p className="text-sm text-slate-400">{stat.label}</p>

            <div className="mt-3 flex items-end justify-between">
              <p className="text-2xl font-semibold">{stat.value}</p>

              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-sm text-emerald-400">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {stat.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}