"use client";

import Link from "next/link";
import { CalendarClock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeadRecord {
  _id: string;
  name: string;
  company: string;
  status: string;
  updatedAt?: string;
  createdAt?: string;
}

interface TodaysFollowUpsProps {
  leads: LeadRecord[];
  loading?: boolean;
}

const FOLLOW_UP_STATUSES = new Set(["New", "Contacted", "Qualified", "Proposal"]);

function isToday(dateString?: string): boolean {
  if (!dateString) {
    return false;
  }

  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function daysSince(dateString?: string): number {
  if (!dateString) {
    return 0;
  }

  const date = new Date(dateString);
  const today = new Date();
  const diff = today.getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getFollowUpLeads(leads: LeadRecord[]): LeadRecord[] {
  return leads
    .filter((lead) => FOLLOW_UP_STATUSES.has(lead.status))
    .filter((lead) => {
      const updatedToday = isToday(lead.updatedAt);
      const createdToday = isToday(lead.createdAt);
      const stale = daysSince(lead.updatedAt) >= 3;
      return updatedToday || createdToday || stale;
    })
    .sort((a, b) => {
      const aDate = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const bDate = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return aDate - bDate;
    })
    .slice(0, 5);
}

function getFollowUpLabel(lead: LeadRecord): string {
  if (isToday(lead.updatedAt) || isToday(lead.createdAt)) {
    return "Due today";
  }

  const days = daysSince(lead.updatedAt);
  return days >= 3 ? `Overdue · ${days}d` : "Scheduled";
}

export function TodaysFollowUps({ leads, loading }: TodaysFollowUpsProps) {
  const followUps = getFollowUpLeads(leads);

  return (
    <Card className="border-slate-800/70 bg-slate-900/80 text-white shadow-[0_10px_30px_rgba(2,8,23,0.24)] transition-all duration-300 hover:border-slate-700/80 hover:shadow-[0_15px_40px_rgba(2,8,23,0.4)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Today&apos;s Follow-ups</CardTitle>
        <CalendarClock className="h-5 w-5 text-cyan-400" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-14 animate-pulse rounded-xl bg-slate-800/50"
              />
            ))}
          </div>
        ) : followUps.length > 0 ? (
          <ul className="space-y-3">
            {followUps.map((lead) => (
              <li
                key={lead._id}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 transition-colors hover:border-slate-700"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{lead.name}</p>
                  <p className="truncate text-sm text-slate-400">
                    {lead.company || "No company"} · {lead.status}
                  </p>
                </div>
                <span className="ml-3 shrink-0 text-xs font-medium text-amber-400">
                  {getFollowUpLabel(lead)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center text-sm text-slate-400">
            <p className="font-medium text-white">All caught up</p>
            <p className="mt-1">No follow-ups scheduled for today.</p>
            <Link
              href="/dashboard/leads"
              className="mt-3 inline-block text-cyan-400 hover:text-cyan-300"
            >
              View leads
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
