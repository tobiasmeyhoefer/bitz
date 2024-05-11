import NextAuth from 'next-auth'
import resend from 'next-auth/providers/resend'
import google from 'next-auth/providers/google'
import passkey from 'next-auth/providers/passkey'
import { drizzleAdapter } from './adapter'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: drizzleAdapter,
  providers: [
    google,
    resend({
      from: 'auth@bitztech.de',
    }),
    passkey,
  ],
  callbacks: {
    async session({session, user}) {
      session.user.id = user.id
      return session
    },
  },
  experimental: { enableWebAuthn: true },
})
