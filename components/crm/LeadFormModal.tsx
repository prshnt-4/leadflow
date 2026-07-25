"use client";

import { useState, useEffect } from "react";
import { createLead, updateLead } from "@/lib/api/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface LeadFormModalProps {
    open: boolean;
    onClose: () => void;
    onLeadAdded: () => void;
    mode?: "add" | "edit";
    initialData?: any;
}

export function LeadFormModal({
    open,
    onClose,
    onLeadAdded,
    mode = "add",
    initialData,
}: LeadFormModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "New",
        source: "Website",
        notes: "",
        assignedTo: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };



    useEffect(() => {
        if (mode === "edit" && initialData) {
            setFormData({
                name: initialData.name || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                company: initialData.company || "",
                status: initialData.status || "New",
                source: initialData.source || "Website",
                notes: initialData.notes || "",
                assignedTo: initialData.assignedTo || "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                status: "New",
                source: "Website",
                notes: "",
                assignedTo: "",
            });
        }

        setError("");
    }, [mode, initialData, open]);

    if (!open) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold">
                    {mode === "edit" ? "Edit Lead" : "Add New Lead"}
                </h2>

                {error && (
                    <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <Input
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Input
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <Input
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="rounded-md border p-2"
                    >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Qualified</option>
                        <option>Proposal</option>
                        <option>Won</option>
                        <option>Lost</option>
                    </select>

                    <select
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className="rounded-md border p-2"
                    >
                        <option>Website</option>
                        <option>LinkedIn</option>
                        <option>Referral</option>
                        <option>Cold Call</option>
                        <option>Other</option>
                    </select>

                </div>

                <textarea
                    name="notes"
                    placeholder="Notes..."
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-4 w-full rounded-md border p-3"
                />

                <Input
                    className="mt-4"
                    name="assignedTo"
                    placeholder="Assigned To"
                    value={formData.assignedTo}
                    onChange={handleChange}
                />
                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading
                            ? "Saving..."
                            : mode === "edit"
                                ? "Update Lead"
                                : "Save Lead"}
                    </Button>
                </div>
            </Card>
        </div>
    );

    async function handleSubmit() {
        setError("");

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.company
        ) {
            setError("Please fill all required fields.");
            return;
        }

        try {
            setLoading(true);

            if (mode === "edit") {
                await updateLead(initialData._id, formData);
            } else {
                await createLead(formData);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    status: "New",
                    source: "Website",
                    notes: "",
                    assignedTo: "",
                });
            }

            onLeadAdded();
            setError("");
            onClose();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }
};