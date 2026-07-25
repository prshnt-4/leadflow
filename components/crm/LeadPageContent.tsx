"use client";

import { Plus } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { getLeads, deleteLead } from "@/lib/api/leads";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { LeadFormModal } from "@/components/crm/LeadFormModal";
import type { Lead } from "@/components/crm/types";



export function LeadPageContent() {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");

    const [openModal, setOpenModal] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchLeads = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getLeads();
            setLeads(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void Promise.resolve().then(fetchLeads);
    }, [fetchLeads]);

    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.name.toLowerCase().includes(search.toLowerCase()) ||
            lead.email.toLowerCase().includes(search.toLowerCase()) ||
            lead.company.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-800/70 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(8,15,32,0.92))] p-5 shadow-[0_10px_30px_rgba(2,8,23,0.24)] sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-slate-400">Pipeline overview</p>
                    <h2 className="text-2xl font-semibold text-white">Leads</h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                        <Input
                            placeholder="Search by name, email or company..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full min-w-0 border-slate-800 bg-slate-950 text-white"
                        />
                    </div>
                    <Button
                        onClick={() => {
                            setSelectedLead(null);
                            setModalMode("add");
                            setOpenModal(true);
                        }}
                        className="w-full bg-cyan-500 text-slate-950 transition-all duration-200 hover:scale-105 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 sm:w-auto"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Lead
                    </Button>
                </div>
            </div>

            <Card className="border-slate-800/70 bg-slate-900/80 text-white shadow-[0_10px_30px_rgba(2,8,23,0.24)] transition-all duration-300 hover:border-slate-700/80 hover:shadow-[0_15px_40px_rgba(2,8,23,0.4)]">
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle>Lead Directory</CardTitle>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full max-w-xs rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white sm:w-auto"
                    >
                        <option value="All">All</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                    </select>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto text-left text-sm">
                            <thead className="text-slate-400">
                                <tr>
                                    <th className="pb-3 font-medium">Name</th>
                                    <th className="pb-3 font-medium">Company</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">phone</th>
                                    <th className="pb-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-8">
                                            <div className="w-full space-y-4">
                                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                                    <div key={i} className="flex animate-pulse items-center gap-6 px-4">
                                                        <div className="h-12 flex-1 rounded-md bg-slate-800/50"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-slate-400">
                                            <p className="text-lg font-semibold text-white">No leads found</p>
                                            <p className="mt-2 text-sm text-slate-500">
                                                {search || statusFilter !== "All" ? "Try adjusting your filters." : "Get started by adding a new lead."}
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLeads.map((lead) => (
                                    <tr key={lead._id} className="group border-t border-slate-800 transition-colors duration-200 hover:bg-slate-950/80">
                                        <td className="py-3 min-w-[170px]">
                                            <div>
                                                <p className="font-medium text-white">{lead.name}</p>
                                                <p className="text-slate-400">{lead.email}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 text-slate-300 min-w-[120px]">{lead.company}</td>
                                        <td className="py-3 min-w-[130px]">
                                            <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-400">
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-slate-300 min-w-[120px]">{lead.phone}</td>
                                        <td className="py-3 min-w-[160px]">
                                            <div className="flex flex-col gap-2 sm:flex-row">
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-slate-700 bg-slate-950 text-slate-100 transition-all duration-200 hover:scale-105 hover:bg-slate-800 active:scale-95 sm:w-auto"
                                                    onClick={() => {
                                                        setSelectedLead(lead);
                                                        setModalMode("edit");
                                                        setOpenModal(true);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    disabled={deletingId === lead._id}
                                                    className="w-full border-red-700 bg-slate-950 text-red-400 transition-all duration-200 hover:scale-105 hover:bg-red-900/20 hover:text-red-300 active:scale-95 disabled:opacity-50 sm:w-auto"
                                                    onClick={async () => {
                                                        const confirmDelete = window.confirm(
                                                            "Are you sure you want to delete this lead?"
                                                        );

                                                        if (!confirmDelete) return;

                                                        try {
                                                            setDeletingId(lead._id);
                                                            await deleteLead(lead._id);
                                                            fetchLeads();
                                                        } catch (error) {
                                                            console.error(error);
                                                            alert("Failed to delete lead");
                                                        } finally {
                                                            setDeletingId(null);
                                                        }
                                                    }}
                                                >
                                                    {deletingId === lead._id ? "Deleting..." : "Delete"}
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <LeadFormModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedLead(null);
                }}
                onLeadAdded={fetchLeads}
                mode={modalMode}
                initialData={selectedLead}
            />
        </div>
    );
}
