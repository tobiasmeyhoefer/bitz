'use server'
import { Authenticator, products } from '@/schema'
import { db } from '../db'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { ProductType} from '@/models/product-model'

export async function getProducts() {
  const response = await db.select().from(products)
  return response
}

export async function addProduct(values:ProductType) {
  const { title, description, price, currency, quantity, location, status } = values
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

//TODO funcion checking if user already has passkey registerted
export async function checkPasskey(): Promise<boolean> {
  const session = await auth()
  const response = await db.select().from(Authenticator).where(eq(Authenticator.userId, session!.user.id))
  return response.length > 0 ? true : false
}
