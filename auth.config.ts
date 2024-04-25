import { DrizzleAdapter } from "@auth/drizzle-adapter"
import type { NextAuthConfig } from "next-auth"
import google from "next-auth/providers/google"
import resend from "next-auth/providers/resend"
import { db } from "./schemas/migrate"
 
export default { providers: [google] } satisfies NextAuthConfig