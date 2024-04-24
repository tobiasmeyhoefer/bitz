import NextAuth from "next-auth"
import google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/schemas/migrate"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [google],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      console.log(pathname)
      if (pathname === "/") return !!auth
      return true
    },
  }
})