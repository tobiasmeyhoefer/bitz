import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "@/routes"
 
const localeMiddleware = createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en'
});

export async function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const { nextUrl } = req
  const isLoggedIn = !!cookies.get("authjs.session-token")

  const localeWithSlash = "/" + nextUrl.pathname.split("/")[1]
  const pathNameWithoutLocale = nextUrl.pathname.substring(nextUrl.pathname.indexOf("/", 1));

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(pathNameWithoutLocale)
  const isAuthRoute = authRoutes.includes(pathNameWithoutLocale)
  const isLandingPageRoute = nextUrl.pathname === localeWithSlash

  //first site
  if(!nextUrl.pathname.includes("de") && !nextUrl.pathname.includes("en")) {
    // console.log(localeMiddleware.toString())
    return localeMiddleware(req)
  }

  // console.log("test")
  console.log(nextUrl.pathname)

  //werden ignoriert
  if(isApiAuthRoute) {
    // console.log("test1")
    return localeMiddleware(req)
  }

  //auth routes werden immer erlaubt wenn man nicht eingeloggt ist, falls man aber eingeloggt ist dann geht zur browse seite
  if(isAuthRoute) {
    if(isLoggedIn) {
      // console.log("test2")
      return Response.redirect(new URL(localeWithSlash + DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return localeMiddleware(req)
  }

  //protected routes wenn nicht eingeloggt dann Startseite
  if(!isLoggedIn && !isPublicRoute) {
    // console.log("test3")
    return Response.redirect(new URL(localeWithSlash, nextUrl))
  }

  //wenn eingeloggt dann kann man nicht auf landingpage
  if(isLoggedIn && isLandingPageRoute) {
    // console.log("test4")
    const route = localeWithSlash + DEFAULT_LOGIN_REDIRECT
    // const env = process.env.NODE_ENV;
    return Response.redirect(new URL(route, nextUrl))
  }

  console.log(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl).pathname)

  return localeMiddleware(req)
}
 
export const config = {
  matcher: ['/', '/(de|en)/:path*']
};