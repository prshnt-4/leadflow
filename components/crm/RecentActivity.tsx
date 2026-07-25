"use client";

import { Activity } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeadRecord {
  _id: string;
  name: string;
  status: string;
  updatedAt?: string;
  createdAt?: string;
}

interface RecentActivityProps {
  leads: LeadRecord[];
  loading?: boolean;
}

function formatRelativeTime(dateString?: string): string {
  if (!dateString) {
    return "Recently";
  }

  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString();
}

function getActivityMessage(lead: LeadRecord): string {
  const created = lead.createdAt ? new Date(lead.createdAt).getTime() : 0;
  const updated = lead.updatedAt ? new Date(lead.updatedAt).getTime() : 0;

  if (updated - created > 60_000) {
    return `Status updated to ${lead.status}`;
  }

  return `New lead added · ${lead.status}`;
}

export function RecentActivity({ leads, loading }: RecentActivityProps) {
  const activities = [...leads]
    .sort((a, b) => {
      const aTime = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const bTime = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return bTime - aTime;
    })
    .slice(0, 6);

  return (
    <Card className="border-slate-800/70 bg-slate-900/80 text-white shadow-[0_10px_30px_rgba(2,8,23,0.24)] transition-all duration-300 hover:border-slate-700/80 hover:shadow-[0_15px_40px_rgba(2,8,23,0.4)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Activity className="h-5 w-5 text-cyan-400" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-12 animate-pulse rounded-xl bg-slate-800/50"
              />
            ))}
          </div>
        ) : activities.length > 0 ? (
          <ul className="space-y-3">
            {activities.map((lead) => (
              <li
                key={`${lead._id}-${lead.updatedAt || lead.createdAt}`}
                className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">{lead.name}</p>
                  <p className="text-sm text-slate-400">
                    {getActivityMessage(lead)}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-slate-500">
                  {formatRelativeTime(lead.updatedAt || lead.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-slate-400">
            No recent activity yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
