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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-slate-800/70 bg-slate-900/80 text-white hover:border-cyan-500 transition-all"
        >
          <CardContent className="p-5">
            <p className="text-sm text-slate-400">
              {stat.label}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-3xl font-bold">
                {stat.value}
              </p>

              <span className="rounded-full bg-cyan-500/10 p-2 text-cyan-400">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}