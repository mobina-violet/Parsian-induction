import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_session'

function getExpectedToken() {
  const password = process.env.ADMIN_PASSWORD ?? ''
  const secret = process.env.ADMIN_SESSION_SECRET ?? ''
  return crypto.createHash('sha256').update(`${password}:${secret}`).digest('hex')
}

export function isValidPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? ''
  return expected.length > 0 && password === expected
}

export function getSessionCookieName() {
  return COOKIE_NAME
}

export function getSessionToken() {
  return getExpectedToken()
}

export function isValidSessionToken(token: string | undefined) {
  return Boolean(token) && token === getExpectedToken()
}

// چون محافظت در سطح مسیر به‌تنهایی سرور-اکشن‌ها رو امن نمی‌کنه،
// هر اکشن حساس تو پنل باید این رو هم جدا صدا بزنه
export async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  return isValidSessionToken(token)
}