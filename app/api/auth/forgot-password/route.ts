import { NextResponse } from "next/server";

import { validateEmail } from "@/lib/auth/validation";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const emailError = validateEmail(email ?? "");

    if (emailError) {
      return NextResponse.json(
        {
          success: false,
          message: emailError,
        },
        { status: 400 }
      );
    }

    // UX-only endpoint: no email delivery or database changes.
    return NextResponse.json(
      {
        success: true,
        message:
          "If an account with that email exists, you'll receive reset instructions shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
