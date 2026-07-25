export const SESSION_COOKIE_NAME = "leadflow_session";

/** Default session: 24 hours */
export const SESSION_MAX_AGE = 60 * 60 * 24;

/** Remember-me session: 30 days */
export const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 30;

export const PROTECTED_ROUTES = ["/dashboard"];

export const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"];
