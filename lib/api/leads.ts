export async function getLeads() {
  const response = await fetch("/api/leads");

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
}

export async function createLead(data: unknown) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create lead");
  }

  return result;
}

export async function updateLead(id: string, data: unknown) {
  const response = await fetch(`/api/leads/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update lead");
  }

  return result;
}

export async function deleteLead(id: string) {
  const response = await fetch(`/api/leads/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete lead");
  }

  return result;
}