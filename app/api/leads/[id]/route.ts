import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/lead";

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
    await connectDB();

    const { id } = await params;

    const lead = await Lead.findById(id);

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
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      status,
      source,
      notes,
      assignedTo,
    } = body;

    if (!name || !email || !phone || !company) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing",
        },
        { status: 400 }
      );
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        company,
        status,
        source,
        notes,
        assignedTo,
      },
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
    await connectDB();

    const { id } = await params;

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