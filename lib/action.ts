'use server'
import { products, users } from '@/schema'
import { db } from '../db'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { ProductType} from '@/models/product-model'

export async function getProducts() {
  const response = await db.select().from(products)
  return response
}

export async function addProduct(values:ProductType) {
  let { title, description, price, currency, quantity, location, status } = values
  const session = await auth()
  const id = session?.user?.id
  if (id) {
    const user = await getUserById(id)
    // if(user.location) {
    //   location = user.location
    // }
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

export async function saveUserLocation(values : {city: string, postcode: number}) {
  const session = await auth()
  const id = session?.user?.id
  if(id) {
    // await db.update(users)
    // .set({ location: city + " " + postcode })
    // .where(eq(users.id, id));
  }
}

export async function getUserById(userId :string) {
  const response = await db.select().from(users).where(eq(users.id, userId))
  return response
}

