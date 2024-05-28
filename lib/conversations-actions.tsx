'use server'

import { db } from '@/db'
import { conversations, products } from '@/schema'
import { getUser } from './useraction'
import { eq, or } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getAllConversations() {
  const user = await getUser()
  return await db
    .select()
    .from(conversations)
    .where(or(eq(conversations.buyerId, user![0].id), eq(conversations.sellerId, user![0].id)))
}

export async function createConversation(productId: string) {
  const user = await getUser()
  const seller = await db.select().from(products).where(eq(products.id, productId))

  return await db.insert(conversations).values({
    buyerId: user![0].id,
    productId: productId,
    sellerId: seller[0].sellerId,
  })
}

export async function declineOffer(id: number) {
  await db.update(conversations).set({ status: 'declined' }).where(eq(conversations.id, id))
  revalidatePath('/conversations')
}

export async function acceptOffer(id: number) {
  await db.update(conversations).set({ status: 'accepted' }).where(eq(conversations.id, id))
  revalidatePath('/conversations')
}
