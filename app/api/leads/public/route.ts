import { NextResponse } from "next/server";

import { validateEmail, validateName } from "@/lib/auth/validation";
import { connectDB } from "@/lib/db";
import Lead from "@/models/lead";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const company = typeof body.company === "string" && body.company.trim() ? body.company.trim() : "Not provided";
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";
    const error = validateName(name) ?? validateEmail(email);
    if (error) return NextResponse.json({ success: false, message: error }, { status: 400 });
    await connectDB();
    await Lead.create({ name, email, company, phone: "Not provided", source: "Website", notes: message });
    return NextResponse.json({ success: true, message: "Thanks — we’ll be in touch shortly." }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Unable to submit your request right now." }, { status: 500 });
  }
}
