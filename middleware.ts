import authConfig from "@/auth.config"
import NextAuth from "next-auth"
 
const {auth} = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  
  if(nextUrl.pathname === "/protected" && !isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl))
  }

  return 
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}