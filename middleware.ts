import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  errorRoutes,
  publicRoutes,
} from '@/routes'

const localeMiddleware = createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en',
})

export async function middleware(req: NextRequest) {
  const cookies = req.cookies

  const { nextUrl } = req
  let isLoggedIn
  if (process.env.NODE_ENV === 'development') {
    isLoggedIn = !!cookies.get('authjs.session-token')
  } else if (process.env.NODE_ENV === 'production') {
    isLoggedIn = !!cookies.get('__Secure-authjs.session-token')
  }

  const localeWithSlash = '/' + nextUrl.pathname.split('/')[1]
  const pathNameWithoutLocale = nextUrl.pathname.substring(nextUrl.pathname.indexOf('/', 1))

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(pathNameWithoutLocale)
  const isAuthRoute = authRoutes.includes(pathNameWithoutLocale)
  const isLandingPageRoute = nextUrl.pathname === localeWithSlash
  const isErrorRoute = errorRoutes.includes(nextUrl.pathname)

  //error routen werden ignoriert
  if (isErrorRoute) {
    return localeMiddleware(req)
  }

  //first site
  if (!nextUrl.pathname.includes('de') && !nextUrl.pathname.includes('en')) {
    return localeMiddleware(req)
  }

  //werden ignoriert
  if (isApiAuthRoute) {
    return localeMiddleware(req)
  }

  //auth routes werden immer erlaubt wenn man nicht eingeloggt ist, falls man aber eingeloggt ist dann geht zur browse seite
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(localeWithSlash + DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return localeMiddleware(req)
  }

  //protected routes wenn nicht eingeloggt dann Startseite
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(localeWithSlash, nextUrl))
  }

  //wenn eingeloggt dann kann man nicht auf landingpage
  if (isLoggedIn && isLandingPageRoute) {
    const route = localeWithSlash + DEFAULT_LOGIN_REDIRECT
    return Response.redirect(new URL(route, nextUrl))
  }

  return localeMiddleware(req)
}

export const config = {
  matcher: ['/', '/(de|en)/:path*'],
}
