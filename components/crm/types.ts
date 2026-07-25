export type LeadStatus =
  | "New"
  | "Qualified"
  | "Proposal"
  | "Closed";

export interface Lead {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  status: LeadStatus;
  source?: string;
  notes?: string;
  assignedTo?: string;
  value?: string;
  lastContact?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}