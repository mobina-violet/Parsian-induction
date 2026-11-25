"use server";

import { cookies } from "next/headers";

import {
  isValidPassword,
  getSessionToken,
  getSessionCookieName,
} from "@/lib/admin-auth";

export async function loginAdmin(password: string) {
  if (
    !process.env.ADMIN_PASSWORD ||
    (process.env.ADMIN_SESSION_SECRET ?? "").length < 32
  ) {
    return {
      success: false,
      error: "تنظیمات ورود پنل کامل نشده است.",
    };
  }

  if (
    typeof password !== "string" ||
    password.length > 256 ||
    !isValidPassword(password)
  ) {
    return {
      success: false,
      error: "رمز عبور صحیح نیست.",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set(
    getSessionCookieName(),
    getSessionToken(),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8,
    }
  );

  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete(getSessionCookieName());

  return { success: true };
}