import { pgTable, integer, serial, text, timestamp } from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   username: text("username").notNull().unique(),
//   email: text("email").unique(),
//   password: text("password"),
//   screatedAt: timestamp("created_at").notNull().defaultNow(),
// });

// export const bitz = pgTable("bitz", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   image: text("image").notNull(),
//   description: text("description").notNull(),
//   price: text("price").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });

export {
  postgresUsersTable as users,
  postgresAccountsTable as accounts,
  postgresSessionsTable as sessions,
  postgresVerificationTokensTable as verificationTokens,
} from '@auth/drizzle-adapter'
