import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import resend from "next-auth/providers/resend"
import google from "next-auth/providers/google"
import { db } from "./db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    google,
    resend({
      from: "auth@yournal.de",
    }),
  ],
})

