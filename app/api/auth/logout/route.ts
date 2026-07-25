import { NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/auth/cookies";

export async function POST() {
  const response = NextResponse.json(
    {
      success: true,
      message: "Signed out successfully.",
    },
    { status: 200 }
  );

  return clearSessionCookie(response);
}
