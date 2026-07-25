export async function getDashboardStats() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

  try {
    const res = await fetch(`${baseUrl}/api/dashboard`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Dashboard API returned ${res.status}`);
    }

    const json = await res.json();

    if (json.success) {
      return json.data;
    }

    return json;
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      totalLeads: 0,
      newLeads: 0,
      contacted: 0,
      qualified: 0,
      proposal: 0,
      won: 0,
      lost: 0,
    };
  }
}