import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, customPages, publicRoutes } from '@/routes'

import { auth } from './auth'
import { redirect } from 'next/navigation'

export default auth((req) => {
  console.log("testolinolin")
  const nextUrl = req.nextUrl
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isCustomRoute = customPages.includes(nextUrl.pathname)

  if (isApiAuthRoute || isCustomRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    // return Response.redirect(new URL('/', nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
