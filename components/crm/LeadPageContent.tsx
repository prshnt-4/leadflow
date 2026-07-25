"use client";

import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { getLeads, deleteLead } from "@/lib/api/leads";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { LeadFormModal } from "@/components/crm/LeadFormModal";



export function LeadPageContent() {
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");

    const [openModal, setOpenModal] = useState(false);
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    async function fetchLeads() {
        try {
            const response = await getLeads();
            setLeads(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchLeads();
    }, []);

    const filteredLeads = leads.filter((lead: any) => {
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
                <div className="flex flex-wrap gap-3">
                    <div className="relative">
                        <Input
                            placeholder="Search by name, email or company..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-72 border-slate-800 bg-slate-950 text-white"
                        />
                    </div>
                    <Button
                        onClick={() => {
                            setSelectedLead(null);
                            setModalMode("add");
                            setOpenModal(true);
                        }}
                        className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Lead
                    </Button>
                </div>
            </div>

            <Card className="border-slate-800/70 bg-slate-900/80 text-white shadow-[0_10px_30px_rgba(2,8,23,0.24)]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Lead Directory</CardTitle>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
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
                        <table className="min-w-full text-left text-sm">
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
                                {filteredLeads.map((lead: any) => (
                                    <tr key={lead._id} className="border-t border-slate-800">
                                        <td className="py-3">
                                            <div>
                                                <p className="font-medium text-white">{lead.name}</p>
                                                <p className="text-slate-400">{lead.email}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 text-slate-300">{lead.company}</td>
                                        <td className="py-3">
                                            <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-400">
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-slate-300">{lead.phone}</td>
                                        <td className="py-3">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    className="border-slate-700 bg-slate-950 text-slate-100 hover:bg-slate-800"
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
                                                    className="border-red-700 bg-slate-950 text-red-400 hover:bg-red-900/20"
                                                    onClick={async () => {
                                                        const confirmDelete = window.confirm(
                                                            "Are you sure you want to delete this lead?"
                                                        );

                                                        if (!confirmDelete) return;

                                                        try {
                                                            await deleteLead(lead._id);
                                                            fetchLeads();
                                                        } catch (error) {
                                                            console.error(error);
                                                            alert("Failed to delete lead");
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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
