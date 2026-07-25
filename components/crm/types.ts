export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"] as const;
export const LEAD_SOURCES = ["Website", "LinkedIn", "Referral", "Cold Call", "Other"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number] | "Closed";
export type LeadSource = (typeof LEAD_SOURCES)[number];

export type Lead = {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  status: LeadStatus;
  source?: LeadSource;
  notes?: string;
  assignedTo?: string;
  value?: string;
  lastContact?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type LeadInput = Omit<Required<Pick<Lead, "name" | "email" | "phone" | "company" | "status" | "source" | "notes" | "assignedTo">>, "status"> & { status: Exclude<LeadStatus, "Closed"> };

export const emptyLeadInput = (): LeadInput => ({ name: "", email: "", phone: "", company: "", status: "New", source: "Website", notes: "", assignedTo: "" });

export interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}
