"use client";

import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeads, deleteLead, updateLead } from "@/lib/api/leads";
import { LeadFormModal } from "@/components/crm/LeadFormModal";
import type { Lead as ApiLead, LeadInput } from "@/components/crm/types";

type Lead = Required<Pick<ApiLead, "_id" | "name" | "email" | "company" | "phone" | "status" | "source">> & Pick<ApiLead, "notes" | "assignedTo">;

const STATUS_OPTIONS = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-500/10 text-blue-400",
  Contacted: "bg-amber-500/10 text-amber-400",
  Qualified: "bg-purple-500/10 text-purple-400",
  Proposal: "bg-cyan-500/10 text-cyan-400",
  Won: "bg-emerald-500/10 text-emerald-400",
  Lost: "bg-red-500/10 text-red-400",
};

export function RecentLeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Deleting state to show feedback
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchRecentLeads = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getLeads();
      const allLeads = response.data || [];
      // Show only the 5 most recent leads
      setLeads(allLeads.slice(0, 5).filter((lead): lead is Lead => Boolean(lead._id && lead.phone && lead.source)));
    } catch (error) {
      console.error("Failed to fetch recent leads:", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(fetchRecentLeads);
  }, [fetchRecentLeads]);

  // ── Edit handler ──
  function handleEditClick(lead: Lead) {
    setSelectedLead(lead);
    setEditModalOpen(true);
  }

  function handleEditClose() {
    setEditModalOpen(false);
    setSelectedLead(null);
  }

  function handleLeadUpdated() {
    fetchRecentLeads();
  }

  // ── Delete handler ──
  async function handleDeleteClick(lead: Lead) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${lead.name}"?`
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(lead._id);
      await deleteLead(lead._id);
      fetchRecentLeads();
    } catch (error) {
      console.error("Failed to delete lead:", error);
      alert("Failed to delete lead. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  // ── Status toggle handler ──
  async function handleStatusChange(lead: Lead, newStatus: string) {
    try {
      await updateLead(lead._id, {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        status: newStatus as LeadInput["status"],
        source: lead.source,
        notes: lead.notes || "",
        assignedTo: lead.assignedTo || "",
      } satisfies LeadInput);
      fetchRecentLeads();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    }
  }

  return (
    <>
      <Card className="border-slate-800/70 bg-slate-900/80 text-white shadow-[0_10px_30px_rgba(2,8,23,0.24)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(2,8,23,0.4)] hover:border-slate-700/80">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Recent Leads</CardTitle>

          <Link
            href="/dashboard/leads"
            className="inline-flex items-center rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-100 transition-all duration-200 hover:scale-105 hover:bg-slate-800 active:scale-95"
          >
            View all
          </Link>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="w-full space-y-4 py-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex animate-pulse items-center gap-6 px-4">
                    <div className="h-12 flex-1 rounded-md bg-slate-800/50"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <table className="min-w-full table-auto text-left text-sm">
                  <thead className="text-slate-400">
                    <tr>
                      <th className="pb-3">Lead</th>
                      <th className="pb-3">Company</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Phone</th>
                      <th className="pb-3">Source</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead._id} className="group border-t border-slate-800 transition-colors duration-200 hover:bg-slate-950/80">
                        <td className="min-w-[170px] py-3">
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-slate-400">{lead.email}</p>
                        </td>

                        <td className="py-3 text-slate-200 min-w-[120px]">{lead.company}</td>

                        <td className="py-3 min-w-[130px]">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead, e.target.value)}
                            className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-medium outline-none ${STATUS_COLORS[lead.status] || "bg-cyan-500/10 text-cyan-400"}`}
                            style={{ background: "transparent" }}
                          >
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status} className="bg-slate-900 text-white">
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="py-3 text-slate-200 min-w-[110px]">{lead.phone}</td>

                        <td className="py-3 text-slate-200 min-w-[100px]">{lead.source}</td>

                        <td className="py-3">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Edit lead"
                              onClick={() => handleEditClick(lead)}
                              className="transition-all duration-200 hover:bg-slate-800 active:scale-95"
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Delete lead"
                              disabled={deletingId === lead._id}
                              onClick={() => handleDeleteClick(lead)}
                              className="text-red-400 transition-all duration-200 hover:bg-red-900/20 hover:text-red-300 active:scale-95 disabled:opacity-50"
                            >
                              {deletingId === lead._id ? (
                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {leads.length === 0 && (
                  <div className="py-10 text-center text-slate-400">
                    <p className="text-lg font-semibold text-white">No recent leads yet</p>
                    <p className="mt-2 text-sm text-slate-500">
                      Add leads from the Leads page to populate this section.
                    </p>
                    <Link
                      href="/dashboard/leads"
                      className="mt-4 inline-flex rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-slate-950 transition-all duration-200 hover:scale-105 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
                    >
                      Go to Leads
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Lead Modal */}
      <LeadFormModal
        open={editModalOpen}
        onClose={handleEditClose}
        onLeadAdded={handleLeadUpdated}
        mode="edit"
        initialData={selectedLead}
      />
    </>
  );
}
