import { db } from "@/db";
import { users } from "@/schema";
import { eq } from "drizzle-orm";

// export const getUserByEmail = async (email: string) => {
//   try {
//     const user: UserType[] = await db.select().from(users).where(eq(users.email, email))
//     return user
//   } catch {
//     return null;
//   } 
// }

