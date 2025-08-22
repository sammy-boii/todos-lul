import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

const protectedRoutes = ['/']
const authRoutes = ['/login', '/signup', '/verify-email']

export async function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req)

  const { nextUrl } = req

  const isOnAuthPages = authRoutes.includes(nextUrl.pathname)
  const isOnProtectedRoutes = protectedRoutes.includes(nextUrl.pathname)

  if (isOnProtectedRoutes && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isOnAuthPages && sessionCookie) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}

// NOTE: getSessionCookie() only checks for the existance of the cookie. For better validation, do one of the following:

// Make an HTTP request to the /api/auth/session endpoint
// Use NodeJS runtime for middleware and use auth.api.getSession(). It uses crypto (NodeJS API) so it won't work in edge runtime
