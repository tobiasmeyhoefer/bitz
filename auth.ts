import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import resend from "next-auth/providers/resend"
import google from "next-auth/providers/google"
import { db } from "./db"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
  // providers: [
  //   google,
  //   resend({
  //     from: "auth@yournal.de",
  //   }),
  // ],
  // pages: {
  //   signIn: "/auth/error",
  //   verifyRequest: "/auth/verify"
  // },
})

