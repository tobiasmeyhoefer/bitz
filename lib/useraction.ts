'use server'
import { users } from '@/schema'
import { db } from '../db'
import { eq } from 'drizzle-orm'
import { auth, signOut } from '@/auth'
import { deleteImageOnAws, getProductsOwned } from './productaction'

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
            console.log('---------------_DSJHIAHSIDS')
            await deleteImageOnAws(imageUrl)
          }
        }
      }
    }
    await db.delete(users).where(eq(users.id, id))
    await signOut()
  }
}
