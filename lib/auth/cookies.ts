import { NextResponse } from "next/server";

import {
  REMEMBER_ME_MAX_AGE,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth/constants";
import { createSessionToken } from "@/lib/auth/session";

interface SessionUser {
  id: string;
  name: string;
  email: string;
}

export async function attachSessionCookie(
  response: NextResponse,
  user: SessionUser,
  rememberMe = false
): Promise<NextResponse> {
  const token = await createSessionToken(
    {
      userId: String(user.id),
      name: user.name,
      email: user.email,
    },
    rememberMe
  );

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: rememberMe ? REMEMBER_ME_MAX_AGE : SESSION_MAX_AGE,
  });

  return response;
}

export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
