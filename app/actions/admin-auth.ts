'use server'

import { cookies } from 'next/headers'
import { isValidPassword, getSessionCookieName, getSessionToken } from '@/lib/admin-auth'

export async function loginAdmin(password: string) {
  if (!isValidPassword(password)) {
    return { success: false, error: 'رمز اشتباه است' }
  }

  const cookieStore = await cookies()
  cookieStore.set(getSessionCookieName(), getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return { success: true }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(getSessionCookieName())
}