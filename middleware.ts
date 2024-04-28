// import authConfig from "@/auth.config"
// import NextAuth from "next-auth"

// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "@/routes"
import NextAuth from "next-auth";
 
// const {auth} = NextAuth(authConfig)

// export default auth((req) => {
//   const { nextUrl } = req
//   const isLoggedIn = !!req.auth

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname)

//   console.log(isLoggedIn)
  
//   if(isApiAuthRoute) {
//     return 
//   }

//   if(isAuthRoute) {
//     if(isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
//     }
//     return 
//   }

//   if(!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL("/", nextUrl))
//   }

//   return 

// })

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }

// --------------------

// export const { auth: middleware } = NextAuth(authConfig)

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// ---------------------

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authConfig from "./auth.config";
 
export function middleware(request: NextRequest) {

  const { nextUrl } = request
  const isLoggedIn = !!request.cookies.get("authjs.session-token")

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

  return 
}
 
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  };

  // -----------

  // export { auth as middleware } from "@/auth"