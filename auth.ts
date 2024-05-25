import NextAuth from 'next-auth'
import resend from 'next-auth/providers/resend'
import google from 'next-auth/providers/google'
import github from 'next-auth/providers/github'
import passkey from 'next-auth/providers/passkey'
import { drizzleAdapter } from './adapter'

// const locale = useLocale();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: drizzleAdapter,
  providers: [
    google,
    github,
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
  pages: {
    error: "/en/auth/error",
    signIn: "/en/auth/error",
    verifyRequest: "/en/auth/verify"
  }
})
