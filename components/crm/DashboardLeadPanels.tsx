"use client";

import { useEffect, useState } from "react";

import { RecentActivity } from "@/components/crm/RecentActivity";
import { TodaysFollowUps } from "@/components/crm/TodaysFollowUps";
import { getLeads } from "@/lib/api/leads";

interface LeadRecord {
  _id: string;
  name: string;
  company: string;
  status: string;
  updatedAt?: string;
  createdAt?: string;
}

export function DashboardLeadPanels() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchLeads() {
      try {
        setLoading(true);
        const response = await getLeads();
        if (active) {
          setLeads(response.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard leads:", error);
        if (active) {
          setLeads([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchLeads();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <TodaysFollowUps leads={leads} loading={loading} />
      <RecentActivity leads={leads} loading={loading} />
    </div>
  );
}
