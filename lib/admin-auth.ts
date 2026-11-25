import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 60 * 60 * 8;

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);

  return (
    ab.length === bb.length &&
    crypto.timingSafeEqual(ab, bb)
  );
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function sign(payload: string) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
}

export function isValidPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected || getSecret().length < 32) {
    return false;
  }

  return safeEqual(password, expected);
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}

export function getSessionToken() {
  if (
    !process.env.ADMIN_PASSWORD ||
    getSecret().length < 32
  ) {
    throw new Error("Admin authentication is not configured");
  }

  const expiresAt =
    Math.floor(Date.now() / 1000) + SESSION_DURATION;

  const nonce = crypto.randomBytes(32).toString("hex");

  const payload = `${expiresAt}.${nonce}`;

  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(
  token: string | undefined
) {
  if (
    !token ||
    !process.env.ADMIN_PASSWORD ||
    getSecret().length < 32
  ) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 3) return false;

  const [expiresAt, nonce, signature] = parts;

  const expiration = Number(expiresAt);

  if (
    !Number.isSafeInteger(expiration) ||
    expiration <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  const payload = `${expiresAt}.${nonce}`;

  return safeEqual(signature, sign(payload));
}

export async function requireAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAME)?.value;

  return isValidSessionToken(token);
}