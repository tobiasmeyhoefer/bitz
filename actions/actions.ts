import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users, UserType } from "@/schemas/schema";
import { and, eq } from "drizzle-orm";
import { db } from "@/schemas/migrate";

export async function getUserFromDb(email: string, password: string) {

  const user: UserType[] = (await db.select().from(users).where(eq(users.email, email)))

  if(user[0].password === password) {
    return user[0]
  }

  return null;
}

// export async function createUser(formData) {
//   await db.insert(users).values({

//   })
// }

