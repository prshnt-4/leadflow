import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/lead";

export async function GET() {
  try {
    await connectDB();

    const leads = await Lead.find().sort({ createdAt: -1 });

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
    await connectDB();

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
          message: "Name, Email, Phone and Company are required.",
        },
        { status: 400 }
      );
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      status,
      source,
      notes,
      assignedTo,
    });

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