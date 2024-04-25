import authConfig from "@/auth.config"
import NextAuth from "next-auth"

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "@/routes"
 
const {auth} = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  
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

  return 

  // if(nextUrl.pathname === "/protected" && !isLoggedIn) {
  //   return Response.redirect(new URL("/", nextUrl))
  // }

})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}