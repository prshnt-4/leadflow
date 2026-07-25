import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/lib/auth/constants";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (isProtectedRoute(pathname) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  if (AUTH_ROUTES.includes(pathname) && session) return NextResponse.redirect(new URL("/dashboard", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/login", "/signup", "/forgot-password"] };
