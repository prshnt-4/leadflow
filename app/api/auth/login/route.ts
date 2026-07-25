import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { attachSessionCookie } from "@/lib/auth/cookies";
import { validateEmail, validatePassword } from "@/lib/auth/validation";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, password, rememberMe = false } = await request.json();

    const emailError = validateEmail(email ?? "");
    const passwordError = validatePassword(password ?? "", {
      minLength: 1,
      label: "Password",
    });

    if (emailError || passwordError) {
      return NextResponse.json(
        {
          success: false,
          message: emailError ?? passwordError,
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );

    return attachSessionCookie(
      response,
      {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
      Boolean(rememberMe)
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