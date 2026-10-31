import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_session'

function getExpectedToken() {
  const password = process.env.ADMIN_PASSWORD ?? ''
  const secret = process.env.ADMIN_SESSION_SECRET ?? ''
  // اگه هر کدوم از env ها ست نشده باشن، پنل کلاً قفل می‌مونه
  // (وگرنه توکن همیشه sha256(":") می‌شد و هر کسی می‌تونست کوکیش رو جعل کنه)
  if (!password || !secret) return null
  return crypto.createHash('sha256').update(`${password}:${secret}`).digest('hex')
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb)
}

export function isValidPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? ''
  return expected.length > 0 && safeEqual(password, expected)
}

export function getSessionCookieName() {
  return COOKIE_NAME
}

export function getSessionToken() {
  return getExpectedToken() ?? ''
}

export function isValidSessionToken(token: string | undefined) {
  const expected = getExpectedToken()
  return Boolean(token) && expected !== null && safeEqual(token as string, expected)
}

// چون محافظت در سطح مسیر به‌تنهایی سرور-اکشن‌ها رو امن نمی‌کنه،
// هر اکشن حساس تو پنل باید این رو هم جدا صدا بزنه
export async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  return isValidSessionToken(token)
}