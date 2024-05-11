import NextAuth from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import resend from 'next-auth/providers/resend'
import google from 'next-auth/providers/google'
import passkey from 'next-auth/providers/passkey'
import { db } from './db'
import { accounts, sessions, users, verificationTokens } from './schema'
import { drizzleAdapter } from './adapter'

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: DrizzleAdapter(db),
  adapter: drizzleAdapter,
  providers: [
    google,
    resend({
      from: 'auth@bitztech.de',
    }),
    passkey,
  ],
  experimental: { enableWebAuthn: true },
  // pages: {
  //   signIn: "/auth/error",
  //   verifyRequest: "/auth/verify"
  // },
})
