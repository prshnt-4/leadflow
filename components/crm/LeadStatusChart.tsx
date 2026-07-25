"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#3b82f6",
];

interface Props {
  stats: {
    newLeads: number;
    contacted: number;
    qualified: number;
    proposal: number;
    won: number;
    lost: number;
  };
}

export default function LeadStatusChart({ stats }: Props) {
  const data = [
    { name: "New", value: stats.newLeads },
    { name: "Contacted", value: stats.contacted },
    { name: "Qualified", value: stats.qualified },
    { name: "Proposal", value: stats.proposal },
    { name: "Won", value: stats.won },
    { name: "Lost", value: stats.lost },
  ];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Lead Status Distribution
      </h2>

      <div className="min-h-[320px] w-full flex-1 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={110} label>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

