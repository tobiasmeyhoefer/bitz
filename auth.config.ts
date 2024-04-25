import { DrizzleAdapter } from "@auth/drizzle-adapter"
import type { NextAuthConfig } from "next-auth"
import google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import resend from "next-auth/providers/resend"
import { db } from "./schemas/migrate"
import { getUserFromDb } from "./actions/actions"

export default {
  providers: [google],
} satisfies NextAuthConfig
