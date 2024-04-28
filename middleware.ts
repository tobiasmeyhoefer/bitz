import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "@/routes"

import { auth } from "./auth"
 
export default auth((req) => {
  console.log(req.auth)

  const nextUrl = req.nextUrl
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  console.log(isLoggedIn)
  
  if(isApiAuthRoute) {
    return 
  }

  if(isAuthRoute) {
    if(isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return 
  }

  if(!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl))
  }
})
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}