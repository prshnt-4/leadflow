import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME, verifySessionToken, type SessionPayload } from "@/lib/auth/session";

/** Returns the authenticated user for route handlers, or null when unauthenticated. */
export async function requireSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}
