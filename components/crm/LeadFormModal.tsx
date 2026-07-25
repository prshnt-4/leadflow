"use client";

import { useEffect, useState } from "react";
import { createLead, updateLead } from "@/lib/api/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Lead, LeadInput } from "@/components/crm/types";

type Props = { open: boolean; onClose: () => void; onLeadAdded: () => void; mode?: "add" | "edit"; initialData?: Lead | null };
const emptyLead = (): LeadInput => ({ name: "", email: "", phone: "", company: "", status: "New", source: "Website", notes: "", assignedTo: "" });

export function LeadFormModal({ open, onClose, onLeadAdded, mode = "add", initialData }: Props) {
  const [data, setData] = useState<LeadInput>(emptyLead);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    void Promise.resolve().then(() => setData(initialData ? { ...emptyLead(), ...initialData, phone: initialData.phone ?? "", source: initialData.source ?? "Website", status: initialData.status === "Closed" ? "New" : initialData.status } : emptyLead()));
  }, [open, initialData]);

  if (!open) return null;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (mode === "edit" && initialData?._id) await updateLead(initialData._id, data);
      else await createLead(data);
      onLeadAdded();
      onClose();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to save lead.");
    } finally {
      setSaving(false);
    }
  }

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="presentation" onMouseDown={onClose}>
    <form role="dialog" aria-modal="true" aria-label={mode === "edit" ? "Edit lead" : "Add lead"} onMouseDown={(event) => event.stopPropagation()} onSubmit={submit} className="w-full max-w-xl rounded-xl border border-slate-800 bg-slate-900 p-6 text-white shadow-xl">
      <h2 className="mb-6 text-2xl font-bold">{mode === "edit" ? "Edit Lead" : "Add New Lead"}</h2>
      {error ? <p role="alert" className="mb-4 rounded-md border border-red-800 bg-red-950/60 p-3 text-sm text-red-200">{error}</p> : null}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input name="name" placeholder="Full Name" value={data.name} onChange={(event) => setData((current) => ({ ...current, name: event.target.value }))} required className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500" />
        <Input name="email" type="email" placeholder="Email" value={data.email} onChange={(event) => setData((current) => ({ ...current, email: event.target.value }))} required className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500" />
        <Input name="phone" type="tel" placeholder="Phone" value={data.phone} onChange={(event) => setData((current) => ({ ...current, phone: event.target.value }))} required className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500" />
        <Input name="company" placeholder="Company" value={data.company} onChange={(event) => setData((current) => ({ ...current, company: event.target.value }))} required className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500" />
        <select name="status" value={data.status} onChange={(event) => setData((current) => ({ ...current, status: event.target.value as LeadInput["status"] }))} className="rounded-md border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <option>New</option><option>Contacted</option><option>Qualified</option><option>Proposal</option><option>Won</option><option>Lost</option>
        </select>
        <select name="source" value={data.source} onChange={(event) => setData((current) => ({ ...current, source: event.target.value as LeadInput["source"] }))} className="rounded-md border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <option>Website</option><option>LinkedIn</option><option>Referral</option><option>Cold Call</option><option>Other</option>
        </select>
      </div>
      <textarea name="notes" placeholder="Notes..." rows={4} value={data.notes} onChange={(event) => setData((current) => ({ ...current, notes: event.target.value }))} className="mt-4 w-full rounded-md border border-slate-700 bg-slate-950 p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
      <Input name="assignedTo" placeholder="Assigned To" value={data.assignedTo} onChange={(event) => setData((current) => ({ ...current, assignedTo: event.target.value }))} className="mt-4 border-slate-700 bg-slate-950 text-white placeholder:text-slate-500" />
      <div className="mt-6 flex justify-end gap-3"><Button type="button" variant="outline" onClick={onClose} className="border-slate-700 bg-slate-950 text-white hover:bg-slate-800">Cancel</Button><Button type="submit" disabled={saving} className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">{saving ? "Saving…" : mode === "edit" ? "Update Lead" : "Save Lead"}</Button></div>
    </form>
  </div>;
}
