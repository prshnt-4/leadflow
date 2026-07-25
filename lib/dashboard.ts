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
  const [totalLeads, newLeads, contacted, qualified, proposal, won, lost, monthlyData] = await Promise.all([
    Lead.countDocuments(), Lead.countDocuments({ status: "New" }), Lead.countDocuments({ status: "Contacted" }),
    Lead.countDocuments({ status: "Qualified" }), Lead.countDocuments({ status: "Proposal" }),
    Lead.countDocuments({ status: "Won" }), Lead.countDocuments({ status: "Lost" }),
    Lead.aggregate([{ $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, leads: { $sum: 1 } } }, { $sort: { "_id.year": 1, "_id.month": 1 } }]),
  ]);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return { totalLeads, newLeads, contacted, qualified, proposal, won, lost, monthlyLeads: monthlyData.map((item) => ({ month: monthNames[item._id.month - 1], leads: item.leads })) };
}
