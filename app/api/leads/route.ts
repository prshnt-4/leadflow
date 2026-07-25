import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/lead";
import { requireSession } from "@/lib/auth/require-session";
import { validateLeadInput } from "@/lib/leads/validation";

export async function GET() {
  try {
    if (!(await requireSession())) return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
    await connectDB();

    const leads = await Lead.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leads",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!(await requireSession())) return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
    await connectDB();
    const validation = validateLeadInput(await request.json());
    if (!validation.data) return NextResponse.json({ success: false, message: validation.message }, { status: 400 });
    const lead = await Lead.create(validation.data);

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully.",
        data: lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
