import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/lead";

export async function GET() {
  try {
    await connectDB();

    const totalLeads = await Lead.countDocuments();

    const newLeads = await Lead.countDocuments({ status: "New" });
    const contacted = await Lead.countDocuments({ status: "Contacted" });
    const qualified = await Lead.countDocuments({ status: "Qualified" });
    const proposal = await Lead.countDocuments({ status: "Proposal" });
    const won = await Lead.countDocuments({ status: "Won" });
    const lost = await Lead.countDocuments({ status: "Lost" });

    return NextResponse.json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        contacted,
        qualified,
        proposal,
        won,
        lost,
      },
    });
 } catch (error) {
  console.error("Dashboard API Error:", error);

  return NextResponse.json(
    {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );
}
}

