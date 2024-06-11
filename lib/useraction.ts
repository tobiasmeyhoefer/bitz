'use server'
import { users } from '@/schema'
import { db } from '../db'
import { count, eq } from 'drizzle-orm'
import { auth, signOut } from '@/auth'
import { deleteImageOnAws, getProductsOwned } from './productaction'
import { revalidatePath } from 'next/cache'

export async function saveUserNameLogin(name: string, email: string) {
  const response = await db.select().from(users).where(eq(users.email, email))
  await db
    .update(users)
    .set({ name: name })
    .where(eq(users.id, response[0].id))
    .catch((error) => console.log(error)) 
}

export async function saveUserName(name: string) {
  const session = await auth()
  const id = session?.user?.id
  await db.update(users).set({ name: name }).where(eq(users.id, id!))
}

export async function saveUserLocation(values: { postcode: string }) {
  const session = await auth()
  const id = session?.user?.id
  await db.update(users).set({ location: values.postcode }).where(eq(users.id, id!))
}

export async function saveUserAdress(adress: string) {
  const session = await auth()
  const id = session?.user?.id
  await db.update(users).set({ adress: adress }).where(eq(users.id, id!))
}

export async function getUserById(userId: string) {
  const response = await db.select().from(users).where(eq(users.id, userId))
  if (response.length === 0) {
    throw new Error('User not found in DB (getUserById)')
  }
  return response[0]
}

export async function getUserByEmail(email: string) {
  const response = await db.select().from(users).where(eq(users.email, email))
  if (response.length === 0) {
    throw new Error('User not found in DB (getUserByEmail)')
  }
  return response[0]
}

export async function getUser() {
  const session = await auth()
  const id = session?.user?.id
  const response = await db.select().from(users).where(eq(users.id, id!))
  if (response.length === 0) {
    throw new Error('User not found in DB (getUser)')
  }
  return response[0]
}

// kann man vlt noch schöner machen
export async function deleteAccount() {
  const session = await auth()
  const id = session?.user?.id
  if (id) {
    const products = await getProductsOwned(id)
    const user = await getUser()
    // imageUrls wenn gesetzt aus AWS löschen
    if (products) {
      for (const product of products) {
        const imageUrls = [
          product.imageUrl1,
          product.imageUrl2,
          product.imageUrl3,
          product.imageUrl4,
          product.imageUrl5,
        ]
        for (const imageUrl of imageUrls) {
          if (imageUrl) {
            await deleteImageOnAws(imageUrl)
          }
        }
      }
    }
    if (user.image) {
      await deleteImageOnAws(user.image)
    }
    await db.delete(users).where(eq(users.id, id))
    await signOut()
  }
}

export async function changeUserImage(imageUrl: string) {
  const session = await auth()
  const id = session?.user?.id
  if (id) {
    const user = await getUser()
    if (user.image) {
      await deleteImageOnAws(user.image)
    }
    await db
      .update(users)
      .set({
        image: imageUrl,
      })
      .where(eq(users.id, id))
    revalidatePath('/settings')
  }
}

export async function getAllUsersCount() {
  const result = await db.select({ count: count() }).from(users)
  return result[0].count
}

export async function getAddressByUserId(userId: string): Promise<string> {
  const result = await db.select({ address: users.adress }).from(users).where(eq(users.id, userId))
  return result[0].address!
}

export async function getOnboardingState() {
  const user = await getUser()
  const result = await db.select().from(users).where(eq(users.id, user.id))
  return result[0].onboardingCompleted
}

export async function setOnboardingState(state: boolean) {
  const user = await getUser();
  await db.update(users)
    .set({ onboardingCompleted: state })
    .where(eq(users.id, user.id));
}