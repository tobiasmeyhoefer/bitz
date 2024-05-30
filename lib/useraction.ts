'use server'
import { users } from '@/schema'
import { db } from '../db'
import { eq } from 'drizzle-orm'
import { auth, signOut } from '@/auth'
import { deleteImageOnAws, getProductsOwned } from './productaction'
import { revalidatePath } from 'next/cache'

export async function saveUserName(name: string) {
  const session = await auth()
  const id = session?.user?.id
  if (id) {
    await db.update(users).set({ name: name }).where(eq(users.id, id))
  }
}

export async function saveUserLocation(values: { postcode: string }) {
  const session = await auth()
  const id = session?.user?.id
  if (id) {
    await db.update(users).set({ location: values.postcode }).where(eq(users.id, id))
  }
}

export async function getUserById(userId: string) {
  const response = await db.select().from(users).where(eq(users.id, userId))
  return response
}

export async function getUser() {
  const session = await auth()
  const id = session?.user?.id
  if (id) {
    const response = await db.select().from(users).where(eq(users.id, id))
    return response
  }
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
    if (user?.[0].image) {
      await deleteImageOnAws(user[0].image)
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
    if (user?.[0].image) {
      await deleteImageOnAws(user[0].image)
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
