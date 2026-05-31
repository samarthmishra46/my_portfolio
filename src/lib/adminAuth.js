// ─────────────────────────────────────────────────────────────
// Minimal single-admin auth: an HMAC-signed httpOnly cookie.
//
// .env.local:
//   ADMIN_USER   – login username
//   ADMIN_PASS   – login password
//   ADMIN_SECRET – secret used to sign the session cookie
// ─────────────────────────────────────────────────────────────
import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function secret() {
  return process.env.ADMIN_SECRET || "dev-insecure-secret-change-me";
}

function sign(payload) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

// Build a `<expiry>.<signature>` token. Tamper-proof via the HMAC.
export function createSessionToken() {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `admin:${expires}`;
  return `${expires}.${sign(payload)}`;
}

export function isValidToken(token) {
  if (!token || typeof token !== "string") return false;
  const [expiresStr, sig] = token.split(".");
  const expires = Number(expiresStr);
  if (!expires || Date.now() > expires) return false;
  const expected = sign(`admin:${expires}`);
  // Constant-time compare.
  try {
    return (
      sig &&
      sig.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    );
  } catch {
    return false;
  }
}

export function checkCredentials(user, pass) {
  const U = process.env.ADMIN_USER;
  const P = process.env.ADMIN_PASS;
  if (!U || !P) return false;
  return user === U && pass === P;
}

// Read the cookie in a server component / route and verify it.
export function isAdminAuthenticated() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return isValidToken(token);
}
