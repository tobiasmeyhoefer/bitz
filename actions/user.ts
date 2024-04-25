import { db } from "@/schemas/migrate"
import { users, UserType } from "@/schemas/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  try {
    const user: UserType[] = await db.select().from(users).where(eq(users.email, email))
    return user
  } catch {
    return null;
  } 
}

