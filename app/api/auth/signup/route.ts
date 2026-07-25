import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { attachSessionCookie } from "@/lib/auth/cookies";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/auth/validation";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Read request body
    const { name, email, password } = await request.json();

    const nameError = validateName(name ?? "");
    const emailError = validateEmail(email ?? "");
    const passwordError = validatePassword(password ?? "");

    if (nameError || emailError || passwordError) {
      return NextResponse.json(
        {
          success: false,
          message: nameError ?? emailError ?? passwordError,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists.",
        },
        { status: 409 }
      );
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );

    return attachSessionCookie(response, {
      id: String(user._id),
      name: user.name,
      email: user.email,
    });
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