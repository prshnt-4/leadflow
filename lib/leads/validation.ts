import mongoose from "mongoose";

export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"] as const;
export const LEAD_SOURCES = ["Website", "LinkedIn", "Referral", "Cold Call", "Other"] as const;

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: (typeof LEAD_STATUSES)[number];
  source: (typeof LEAD_SOURCES)[number];
  notes: string;
  assignedTo: string;
};

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateLeadInput(body: unknown): { data?: LeadInput; message?: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { message: "Invalid request body." };
  }

  const value = body as Record<string, unknown>;
  const name = stringValue(value.name);
  const email = stringValue(value.email).toLowerCase();
  const phone = stringValue(value.phone);
  const company = stringValue(value.company);
  const status = stringValue(value.status) || "New";
  const source = stringValue(value.source) || "Website";

  if (!name || !email || !phone || !company) {
    return { message: "Name, email, phone, and company are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { message: "Enter a valid email address." };
  }
  if (!(LEAD_STATUSES as readonly string[]).includes(status)) {
    return { message: "Select a valid lead status." };
  }
  if (!(LEAD_SOURCES as readonly string[]).includes(source)) {
    return { message: "Select a valid lead source." };
  }

  return {
    data: {
      name,
      email,
      phone,
      company,
      status: status as LeadInput["status"],
      source: source as LeadInput["source"],
      notes: stringValue(value.notes),
      assignedTo: stringValue(value.assignedTo),
    },
  };
}

export function isValidLeadId(id: string): boolean {
  return mongoose.isValidObjectId(id);
}
