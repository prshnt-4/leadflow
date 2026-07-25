import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/require-session";
import { getDashboardStats } from "@/lib/dashboard";

export async function GET() {
  try {
    if (!(await requireSession())) return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
    const data = await getDashboardStats();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);

    return NextResponse.json(
      {
        success: false,
          message: "Unable to load dashboard data.",
      },
      { status: 500 }
    );
  }
}
