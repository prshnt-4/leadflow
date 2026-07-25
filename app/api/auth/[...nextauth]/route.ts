import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: "NextAuth route is not configured. Use /api/auth/login or /api/auth/signup instead.",
    },
    { status: 404 }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "NextAuth route is not configured. Use /api/auth/login or /api/auth/signup instead.",
    },
    { status: 404 }
  );
}
