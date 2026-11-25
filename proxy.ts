import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  isValidSessionToken,
  getSessionCookieName,
} from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(
    getSessionCookieName()
  )?.value;

  const authenticated = isValidSessionToken(token);

  if (pathname === "/admin/login") {
    if (authenticated) {
      return NextResponse.redirect(
        new URL("/admin", request.url)
      );
    }

    return NextResponse.next();
  }

  if (!authenticated) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};