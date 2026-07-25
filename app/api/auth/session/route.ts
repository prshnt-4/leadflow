import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "Not authenticated.",
      },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      user: {
        id: session.userId,
        name: session.name,
        email: session.email,
      },
    },
    { status: 200 }
  );
}
