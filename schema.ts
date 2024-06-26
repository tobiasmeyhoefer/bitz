import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uniqueIndex,
  boolean,
  pgEnum,
  serial,
} from 'drizzle-orm/pg-core'
import type { AdapterAccount } from 'next-auth/adapters'
import { genId } from './lib/utils'

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  location: text('location'),
  adress: text('adress'),
  phoneVerified: boolean('phoneVerified').default(false),
  onboardingCompleted: boolean('onboardingCompleted').default(false),
})

export const products = pgTable('product', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  location: text('location'),
  category: text('category'),
  sellerId: text('sellerId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull(),
  imageUrl1: text('imageUrl1'),
  imageUrl2: text('imageUrl2'),
  imageUrl3: text('imageUrl3'),
  imageUrl4: text('imageUrl4'),
  imageUrl5: text('imageUrl5'),
  stripeId: text('stripeId'),
  paymentLink: text('paymentLink'),
  isDirectlyBuyable: boolean('isDirectlyBuyable'),
  isSold: boolean('isSold'),
})

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationNumberSessions = pgTable(
  'verificationNumberSessions',
  {
    verificationNumber: text('verificationNumber').notNull(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.createdAt] }),
    }
  },
)

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const Authenticator = pgTable(
  'authenticator',
  {
    id: text('id')
      .notNull()
      .primaryKey()
      .$defaultFn(() => genId('ath')),
    credentialID: text('credentialId').notNull(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    userIdIdx: uniqueIndex('Authenticator_credentialID_key').on(authenticator.credentialID),
  }),
)

export const favorites = pgTable(
  'favorites',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    productId: text('productId')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      id: primaryKey({ columns: [table.userId, table.productId] }),
    }
  },
)

export const transactions = pgTable('transactions', {
  buyerId: text('buyerId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  sellerId: text('sellerId').references(() => users.id, { onDelete: 'cascade' }),
  productId: text('productId')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' })
    .primaryKey(),
  price: integer('price'),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
})

export const checkoutSession = pgTable('checkoutSession', {
  buyerId: text('buyerId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  productId: text('productId')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' })
    .primaryKey(),
})

/*
Der Käufer klickt den Kaunfe Button, es wird ein Eintrag gemacht und der Verkäufer erhält in seinem Posteingang eine Nachricht dafür...
Es gibt eine Seite für Konversation, auf button click eröffnet man eine Konversation die hat erstmal diese Felder: Käufer, Verkäufer, Produkt, Status
*/

export const statusEnum = pgEnum('status', ['offen', 'accepted', 'declined', 'deal', 'verkauft'])

export const conversations = pgTable(
  'conversations',
  {
    id: text('id')
      .$defaultFn(() => crypto.randomUUID())
      .notNull().unique(),
    buyerId: text('buyerId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    sellerId: text('sellerId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    productId: text('productId')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    status: statusEnum('status').default('offen'),
    createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
    message1: text('message1'),
    message2: text('message2'),
    delay: text('delay'),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.buyerId, table.productId] }),
    }
  },
)

export const messages = pgTable('messages', {
  id: text('id')
    .$defaultFn(() => crypto.randomUUID())
    .notNull()
    .primaryKey(),
  content: text('content').notNull(),
  senderId: text("senderId").references(() => users.id).notNull(),
  conversationId: text("conversationId").references(() => conversations.id).notNull(),
  timestamp: timestamp('timestamp', { mode: 'date' }).notNull().defaultNow(),
  isSystemMessage: boolean("isSystemMessage").default(false).notNull(),
  wasRead: boolean("wasRead").default(false).notNull()
})

export type UserType = typeof users.$inferSelect
export type MessageType = typeof messages.$inferSelect
export type ProductType = typeof products.$inferSelect
export type ConversationType = typeof conversations.$inferSelect
export type TransactionType = typeof transactions.$inferSelect
