import NextAuth from 'next-auth'
import resend from 'next-auth/providers/resend'
import google from 'next-auth/providers/google'
import github from 'next-auth/providers/github'
import passkey from 'next-auth/providers/passkey'
import { drizzleAdapter } from './adapter'
import { html, text} from './lib/authSendRequest'

// const locale = useLocale();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: drizzleAdapter,
  providers: [
    google,
    github,
    resend({
      // server: "bitztech.de",
      apiKey: process.env.AUTH_RESEND_KEY!,
      from: 'auth@bitztech.de',
      async sendVerificationRequest({ identifier: email, url, provider: { from } }) {
        // Custom function to send verification email
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: email,
            subject: `Sign in to Your App`,
            html: html({ url, host: "bitztech.de" }),
            text: text({ url, host: "bitztech.de" }),
          }),
        });

        if (!res.ok) throw new Error("Resend error: " + JSON.stringify(await res.json()));
      },
    }),
    passkey,
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
  experimental: { enableWebAuthn: true },
  pages: {
    error: '/en/auth/error',
    signIn: '/en/auth/error',
    verifyRequest: '/en/auth/verify',
  },
})
