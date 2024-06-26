'use server'
import { users } from '@/schema'
import { db } from '../db'
import { count, eq } from 'drizzle-orm'
import { auth, signOut } from '@/auth'
import { deleteImageOnAws, getProductsOwned } from './product-actions'
import { revalidatePath } from 'next/cache'

export async function saveUserNameLogin(name: string, email: string) {
  const response = await db.select().from(users).where(eq(users.email, email))
  await db.update(users).set({ name: name }).where(eq(users.id, response[0].id))
}

export async function saveUserName(name: string) {
  const session = await auth()
  const id = session?.user?.id
  await db.update(users).set({ name: name }).where(eq(users.id, id!))
}

export async function saveUserLocation(postcode: string, city: string) {
  const session = await auth()
  const id = session?.user?.id
  const location = postcode + ' ' + city
  await db.update(users).set({ location: location }).where(eq(users.id, id!))
}

export async function saveUserAddress(address: string) {
  const session = await auth()
  const id = session?.user?.id
  await db.update(users).set({ adress: address }).where(eq(users.id, id!))
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
  const user = await getUser()
  await db.update(users).set({ onboardingCompleted: state }).where(eq(users.id, user.id))
}

export async function setBanner(bannerURL: string) {
  const user = await getUser()
  await db.update(users).set({ banner: bannerURL }).where(eq(users.id, user.id))
}

export async function getBanner() {
  const user = await getUser()
  const response = await db
    .select({ banner: users.banner })
    .from(users)
    .where(eq(users.id, user.id))
  return response[0].banner!
}

export async function deleteBanner() {
  const user = await getUser()
  await db.update(users).set({ banner: null }).where(eq(users.id, user.id))
}

export async function getShopName() {
  const user = await getUser()
  const response = await db
    .select({ shopname: users.shopname })
    .from(users)
    .where(eq(users.id, user.id))
  return response[0].shopname!
}

export async function setShopName(shopname: string) {
  const user = await getUser()
  await db.update(users).set({ shopname: shopname }).where(eq(users.id, user.id))
}

export async function getShopTextColor() {
  const user = await getUser()
  const response = await db
    .select({ shoptextcolor: users.shoptextcolor })
    .from(users)
    .where(eq(users.id, user.id))
  return response[0].shoptextcolor!
}

export async function setShopTextColor(shoptextcolor: string) {
  const user = await getUser()
  await db.update(users).set({ shoptextcolor: shoptextcolor }).where(eq(users.id, user.id))
}

export async function getShopTextFont() {
  const user = await getUser()
  const response = await db
    .select({ shoptextfont: users.shoptextfont })
    .from(users)
    .where(eq(users.id, user.id))
  return response[0].shoptextfont!
}

export async function setShopTextFont(shoptextfont: string) {
  const user = await getUser()
  await db.update(users).set({ shoptextfont: shoptextfont }).where(eq(users.id, user.id))
}

export async function getBannerById(userId: string) {
  const response = await db.select({ banner: users.banner }).from(users).where(eq(users.id, userId))
  return response[0].banner!
}

export async function getShopNameById(userId: string) {
  const response = await db
    .select({ shopname: users.shopname })
    .from(users)
    .where(eq(users.id, userId))
  return response[0].shopname!
}

export async function getShopTextColorById(userId: string) {
  const response = await db
    .select({ shoptextcolor: users.shoptextcolor })
    .from(users)
    .where(eq(users.id, userId))
  return response[0].shoptextcolor!
}

export async function getShopTextFontById(userId: string) {
  const response = await db
    .select({ shoptextfont: users.shoptextfont })
    .from(users)
    .where(eq(users.id, userId))
  return response[0].shoptextfont!
}
