import { db } from '@/db'
import { conversations, products } from '@/schema'
import { getUser } from './useraction'
import { eq } from 'drizzle-orm'

export async function getAllConversations() {
  const user = await getUser()
  return await db.select().from(conversations).where(eq(conversations.buyerId, user![0].id))
}

export async function createConversation(productId: string) {
  const user = await getUser()
  const seller = await db.select().from(products).where(eq(products.id, productId))

  return await db.insert(conversations).values({
    buyerId: user![0].id,
    productId: productId,
    sellerId: seller[0].sellerId
  })
}
