import type { Context } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

// 간단한 세션 관리 (KV 대신 토큰 서명 방식)
// Cloudflare Workers 환경에서 Web Crypto API 사용

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

const SECRET = 'daegu365-session-secret-key-2026'

export async function hashPassword(password: string): Promise<string> {
  return await sha256(password + ':' + SECRET)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return (await hashPassword(password)) === hash
}

export async function createSessionToken(userId: number, email: string): Promise<string> {
  const payload = `${userId}:${email}:${Date.now()}`
  const sig = await sha256(payload + ':' + SECRET)
  return btoa(payload) + '.' + sig.substring(0, 32)
}

export async function verifySessionToken(token: string): Promise<{ userId: number, email: string } | null> {
  try {
    const [payloadB64, sig] = token.split('.')
    const payload = atob(payloadB64)
    const expected = await sha256(payload + ':' + SECRET)
    if (expected.substring(0, 32) !== sig) return null
    const [userIdStr, email, tsStr] = payload.split(':')
    const ts = parseInt(tsStr, 10)
    // 30일 유효
    if (Date.now() - ts > 30 * 24 * 60 * 60 * 1000) return null
    return { userId: parseInt(userIdStr, 10), email }
  } catch {
    return null
  }
}

export async function setSession(c: Context, userId: number, email: string) {
  const token = await createSessionToken(userId, email)
  setCookie(c, 'session', token, {
    path: '/', httpOnly: true, secure: false, sameSite: 'Lax',
    maxAge: 30 * 24 * 60 * 60
  })
}

export async function getSession(c: Context): Promise<{ userId: number, email: string } | null> {
  const token = getCookie(c, 'session')
  if (!token) return null
  return await verifySessionToken(token)
}

export function clearSession(c: Context) {
  deleteCookie(c, 'session', { path: '/' })
}

// Admin session
export async function setAdmin(c: Context) {
  const token = await createSessionToken(0, 'admin')
  setCookie(c, 'admin', token, {
    path: '/', httpOnly: true, secure: false, sameSite: 'Lax',
    maxAge: 24 * 60 * 60
  })
}

export async function isAdmin(c: Context): Promise<boolean> {
  const token = getCookie(c, 'admin')
  if (!token) return false
  const s = await verifySessionToken(token)
  return !!s && s.email === 'admin'
}

export function clearAdmin(c: Context) {
  deleteCookie(c, 'admin', { path: '/' })
}
