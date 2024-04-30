import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, customPages, publicRoutes } from '@/routes'

import { auth } from './auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  console.log("testolinolin")
  const nextUrl = req.nextUrl
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isCustomRoute = customPages.includes(nextUrl.pathname)

  if (isApiAuthRoute || isCustomRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(DEFAULT_LOGIN_REDIRECT)
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/', nextUrl))
  }

  return NextResponse.next();
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
