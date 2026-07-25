import type { Lead } from "@/components/crm/types";

export const mockLeads: Lead[] = [
  {
    _id: "1",
    name: "Maya Chen",
    company: "Northstar Labs",
    email: "maya@northstar.io",
    status: "Qualified",
    value: "$18k",
    lastContact: "2h ago",
  },
  {
    _id: "2",
    name: "Jordan Rivera",
    company: "Lumen AI",
    email: "jordan@lumen.ai",
    status: "Proposal",
    value: "$24k",
    lastContact: "5h ago",
  },
  {
    _id: "3",
    name: "Aisha Patel",
    company: "Brightlane",
    email: "aisha@brightlane.com",
    status: "New",
    value: "$9k",
    lastContact: "1d ago",
  },
  {
    _id: "4",
    name: "Chris Bell",
    company: "Vertex Studio",
    email: "chris@vertex.studio",
    status: "Closed",
    value: "$32k",
    lastContact: "2d ago",
  },
];

export const stats = [
  { label: "Open Leads", value: "124", trend: "+12%" },
  { label: "Qualified", value: "38", trend: "+8%" },
  { label: "Won", value: "21", trend: "+4%" },
  { label: "Avg. Deal", value: "$14.8k", trend: "+6%" },
];
