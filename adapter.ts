import { db } from './db'
import { accounts, Authenticator, sessions, users, verificationTokens } from '@/schema'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { and, eq } from 'drizzle-orm'
import type {
  Adapter,
  AdapterAccount,
  AdapterAuthenticator,
} from 'next-auth/adapters'

// Dieser Code ist mit Hilfe eines Discord Users Julius uas Schweden entstanden

export const drizzleAdapter = {
  ...DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  getAccount: async (providerAccountId, provider) => {
    const [account] = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.provider, provider),
          eq(accounts.providerAccountId, providerAccountId),
        ),
      )
    return (account as AdapterAccount) ?? null
  },
  createAuthenticator: async (data) => {
    const id = crypto.randomUUID()
    await db.insert(Authenticator).values({
      id,
      ...data,
    })
    const [authenticator] = await db
      .select()
      .from(Authenticator)
      .where(eq(Authenticator.id, id))
    const { transports, id: _, ...rest } = authenticator
    return { ...rest, transports: transports ?? undefined }
  },
  getAuthenticator: async (credentialId) => {
    const [authenticator] = await db
      .select()
      .from(Authenticator)
      .where(eq(Authenticator.credentialID, credentialId))
    return (authenticator as AdapterAuthenticator) ?? null
  },
  listAuthenticatorsByUserId: async (userId) => {
    const auths = await db
      .select()
      .from(Authenticator)
      .where(eq(Authenticator.userId, userId))
    return auths.map((a) => ({
      ...a,
      transports: a.transports ?? undefined,
    }))
  },
  updateAuthenticatorCounter: async (credentialId, counter) => {
    await db
      .update(Authenticator)
      .set({ counter })
      .where(eq(Authenticator.credentialID, credentialId))
    const [authenticator] = await db
      .select()
      .from(Authenticator)
      .where(eq(Authenticator.credentialID, credentialId))
    return (authenticator as AdapterAuthenticator) ?? null
  },
} satisfies Adapter