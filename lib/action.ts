'use server'
import { products } from '@/schema'
import { db } from '../db'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'

export async function addProduct(values: any) {
  const { title, description, price, currency, quantity, location, status } =
    values
  const session = await auth()
  const id = session?.user?.id
  if (id) {
    await db.insert(products).values({
      title: title,
      description: description,
      price: price,
      currency: currency,
      quantity: quantity,
      location: location,
      sellerId: id,
      status: status,
      createdAt: new Date(),
      image: '',
    })
  }
}

// Delete function requiring productId as string
export async function deleteProduct(productId: string) {
  await db.delete(products).where(eq(products.id, productId))
}

// Update function requiring productData as
export async function updateProduct() {}
