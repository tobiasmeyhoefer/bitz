'use server'
import { users } from '@/schema'
import { db } from '../db'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'

export async function saveUserLocation(values : {city: string, postcode: number}) {
  const session = await auth()
  const id = session?.user?.id
  if(id) {
    await db.update(users)
    .set({ location: values.city + " " + values.postcode})
    .where(eq(users.id, id));
  }
}

export async function getUserById(userId :string) {
  const response = await db.select().from(users).where(eq(users.id, userId))
  return response
}
