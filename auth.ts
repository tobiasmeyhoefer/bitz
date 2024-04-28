// import NextAuth from "next-auth"
// import google from "next-auth/providers/google"
// import { DrizzleAdapter } from "@auth/drizzle-adapter"
// import { db } from "@/schemas/migrate"
// import authConfig from "./auth.config"
// import Resend from "next-auth/providers/resend"
// import credentials from "next-auth/providers/credentials"
// import resend from "next-auth/providers/resend"
 
// export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { users, accounts, sessions, verificationTokens } from "./schemas/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./schemas/migrate";


export type { Session } from "next-auth";

const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "jwt" }
});

export { handlers, auth, signIn, signOut };