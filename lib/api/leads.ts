import type { Lead, LeadInput } from "@/components/crm/types";

async function parseResponse<T>(response: Response): Promise<T> {
  const result = await response.json().catch(() => null);
  if (!response.ok) throw new Error(result?.message || "Request failed. Please try again.");
  return result as T;
}

export async function getLeads(): Promise<{ success: boolean; data: Lead[] }> {
  const response = await fetch("/api/leads");

  return parseResponse(response);
}

export async function createLead(data: LeadInput) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseResponse(response);
}

export async function updateLead(id: string, data: LeadInput) {
  const response = await fetch(`/api/leads/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseResponse(response);
}

export async function deleteLead(id: string) {
  const response = await fetch(`/api/leads/${id}`, {
    method: "DELETE",
  });

  return parseResponse(response);
}
