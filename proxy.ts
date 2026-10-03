import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isValidSessionToken, getSessionCookieName } from '@/lib/admin-auth'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get(getSessionCookieName())?.value

  if (!isValidSessionToken(token)) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}