import { connectDB } from "@/lib/db";
import Lead from "@/models/lead";

export type DashboardStats = {
  totalLeads: number;
  newLeads: number;
  contacted: number;
  qualified: number;
  proposal: number;
  won: number;
  lost: number;
  monthlyLeads: { month: string; leads: number }[];
};

export async function getDashboardStats(): Promise<DashboardStats> {
  await connectDB();
  const [analytics] = await Lead.aggregate<{
    statusCounts: { _id: string; count: number }[];
    monthlyData: { _id: { month: number }; leads: number }[];
  }>([
    {
      $facet: {
        statusCounts: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
        monthlyData: [
          { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, leads: { $sum: 1 } } },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ],
      },
    },
  ]);
  const counts = new Map(analytics?.statusCounts.map((item) => [item._id, item.count]));
  const totalLeads = [...counts.values()].reduce((total, count) => total + count, 0);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    totalLeads,
    newLeads: counts.get("New") ?? 0,
    contacted: counts.get("Contacted") ?? 0,
    qualified: counts.get("Qualified") ?? 0,
    proposal: counts.get("Proposal") ?? 0,
    won: counts.get("Won") ?? 0,
    lost: counts.get("Lost") ?? 0,
    monthlyLeads: (analytics?.monthlyData ?? []).map((item) => ({ month: monthNames[item._id.month - 1], leads: item.leads })),
  };
}
