import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const connection = await connectDB();

    if (!connection) {
      return NextResponse.json(
        {
          success: false,
          connected: false,
          message: "MongoDB is unavailable right now. The app will continue without a database connection.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      connected: true,
      message: "MongoDB Connected Successfully",
    });
  } catch (error: unknown) {
    console.error("Mongo Error:", error);
    const message = error instanceof Error ? error.message : "Unknown database error";

    return NextResponse.json(
      {
        success: false,
        connected: false,
        error: message,
        fullError: String(error),
      },
      { status: 200 }
    );
  }
}
