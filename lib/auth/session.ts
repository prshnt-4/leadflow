import {
  REMEMBER_ME_MAX_AGE,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth/constants";

export interface SessionPayload {
  userId: string;
  name: string;
  email: string;
  exp: number;
}

function getSecret(): string {
  return (
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    "leadflow-dev-secret-change-in-production"
  );
}

function toBase64Url(value: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf8").toString("base64url");
  }

  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "base64url").toString("utf8");
  }

  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  return atob(padded + "=".repeat(padLength));
}

async function importKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(data: string): Promise<string> {
  const key = await importKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  );
  const bytes = new Uint8Array(signature);

  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64url");
  }

  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function verify(data: string, signature: string): Promise<boolean> {
  const key = await importKey();
  let sigBytes: Uint8Array;

  if (typeof Buffer !== "undefined") {
    sigBytes = new Uint8Array(Buffer.from(signature, "base64url"));
  } else {
    const padded = signature.replace(/-/g, "+").replace(/_/g, "/");
    const padLength = (4 - (padded.length % 4)) % 4;
    sigBytes = Uint8Array.from(atob(padded + "=".repeat(padLength)), (c) =>
      c.charCodeAt(0)
    );
  }

  return crypto.subtle.verify(
    "HMAC",
    key,
    new Uint8Array(sigBytes),
    new TextEncoder().encode(data)
  );
}

export function getSessionMaxAge(rememberMe: boolean): number {
  return rememberMe ? REMEMBER_ME_MAX_AGE : SESSION_MAX_AGE;
}

export async function createSessionToken(
  user: Pick<SessionPayload, "userId" | "name" | "email">,
  rememberMe = false
): Promise<string> {
  const maxAge = getSessionMaxAge(rememberMe);
  const payload: SessionPayload = {
    ...user,
    exp: Date.now() + maxAge * 1000,
  };

  const data = JSON.stringify(payload);
  const signature = await sign(data);
  return `${toBase64Url(data)}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) {
    return null;
  }

  const separatorIndex = token.lastIndexOf(".");
  if (separatorIndex <= 0) {
    return null;
  }

  const encodedData = token.slice(0, separatorIndex);
  const signature = token.slice(separatorIndex + 1);

  try {
    const data = fromBase64Url(encodedData);
    const isValid = await verify(data, signature);

    if (!isValid) {
      return null;
    }

    const payload = JSON.parse(data) as SessionPayload;

    if (!payload.exp || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

export { SESSION_COOKIE_NAME };
