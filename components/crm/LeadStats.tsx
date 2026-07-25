"use client";

import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LeadStatsProps {
  total: number;
  newLeads: number;
  contacted: number;
  qualified: number;
  won: number;
  lost: number;
}

export function LeadStats({
  total,
  newLeads,
  contacted,
  qualified,
  won,
  lost,
}: LeadStatsProps) {
  const stats = [
    {
      label: "Total Leads",
      value: total,
    },
    {
      label: "New Leads",
      value: newLeads,
    },
    {
      label: "Contacted",
      value: contacted,
    },
    {
      label: "Qualified",
      value: qualified,
    },
    {
      label: "Won",
      value: won,
    },
    {
      label: "Lost",
      value: lost,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="group border-slate-800/70 bg-slate-900/80 text-white shadow-[0_4px_20px_rgba(2,8,23,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)]"
        >
          <CardContent className="p-5">
            <p className="text-sm text-slate-400 transition-colors group-hover:text-cyan-100/70">
              {stat.label}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-3xl font-bold">
                {stat.value}
              </p>

              <span className="rounded-full bg-cyan-500/10 p-2 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}