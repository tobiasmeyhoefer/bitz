import { DrizzleAdapter } from "@auth/drizzle-adapter"
import type { NextAuthConfig } from "next-auth"
import google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import resend from "next-auth/providers/resend"
import { db } from "./schemas/migrate"
import { users, accounts, sessions, verificationTokens } from "./schemas/schema"
import { getUserFromDb } from "./actions/actions"
import credentials from "next-auth/providers/credentials"

export default {
  providers: [google, resend({
    from: "auth@yournal.de"
  })],
} satisfies NextAuthConfig
