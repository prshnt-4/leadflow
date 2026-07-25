import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/lead";
import { requireSession } from "@/lib/auth/require-session";
import { isValidLeadId, validateLeadInput } from "@/lib/leads/validation";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// ======================
// GET Lead by ID
// ======================
export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    if (!(await requireSession())) return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
    await connectDB();

    const { id } = await params;
    if (!isValidLeadId(id)) return NextResponse.json({ success: false, message: "Invalid lead ID." }, { status: 400 });

    const lead = await Lead.findById(id).lean();

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// ======================
// UPDATE Lead
// ======================
export async function PUT(
  request: Request,
  { params }: RouteParams
) {
  try {
    if (!(await requireSession())) return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
    await connectDB();

    const { id } = await params;
    if (!isValidLeadId(id)) return NextResponse.json({ success: false, message: "Invalid lead ID." }, { status: 400 });
    const validation = validateLeadInput(await request.json());
    if (!validation.data) return NextResponse.json({ success: false, message: validation.message }, { status: 400 });

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      validation.data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// ======================
// DELETE Lead
// ======================
export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  try {
    if (!(await requireSession())) return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
    await connectDB();

    const { id } = await params;
    if (!isValidLeadId(id)) return NextResponse.json({ success: false, message: "Invalid lead ID." }, { status: 400 });

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
