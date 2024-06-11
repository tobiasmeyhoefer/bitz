'use server'

import { db } from '@/db'
import { conversations, products } from '@/schema'
import { getUser } from './useraction'
import { desc, eq, or, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getAllConversations() {
  const user = await getUser()
  return await db
    .select()
    .from(conversations)
    .where(or(eq(conversations.buyerId, user.id), eq(conversations.sellerId, user.id)))
    .orderBy(desc(conversations.createdAt))
}

export async function createConversation(productId: string) {
  const user = await getUser()
  const seller = await db.select().from(products).where(eq(products.id, productId))

  await db.insert(conversations).values({
    buyerId: user.id,
    productId: productId,
    sellerId: seller[0].sellerId,
  })

  revalidatePath('/conversations')
}

export async function checkIfConversationAlreadyExist(productId: string): Promise<boolean> {
  const user = await getUser()
  const result = await db
    .select()
    .from(conversations)
    .where(and(eq(conversations.productId, productId), eq(conversations.buyerId, user.id)))
  if (result[0]) {
    return true
  }
  return false
}

export async function deleteConversation(productId: string, buyerId: string) {
  await db
    .delete(conversations)
    .where(or(eq(conversations.productId, productId), eq(conversations.buyerId, buyerId)))
}

export async function declineOffer(id: number) {
  await db.update(conversations).set({ status: 'declined' }).where(eq(conversations.id, id))
  revalidatePath('/conversations')
}

export async function acceptOffer(id: number, message: string) {
  await db
    .update(conversations)
    .set({ status: 'accepted', message1: message })
    .where(eq(conversations.id, id))
  revalidatePath('/conversations')
}

export async function acceptDealTime(id: number, message: string) {
  await db
    .update(conversations)
    .set({ message2: message, status: 'deal' })
    .where(eq(conversations.id, id))
  revalidatePath('/conversations')
}

export async function addConversationDelay(id: number, delay: string) {
  await db.update(conversations).set({ delay: delay }).where(eq(conversations.id, id))
  revalidatePath('/conversations')
}
