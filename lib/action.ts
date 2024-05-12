'use server'

import { products, users, Authenticator } from '@/schema'
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
    if(user[0].location) {
      location = user[0].location
    }
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

//TODO funcion checking if user already has passkey registerted
export async function checkPasskey(){
  const session = await auth()
  const id = session?.user?.id
  if(!id) {
    return false;
  }

  const response = await db.select().from(Authenticator).where(eq(Authenticator.userId, id))
  
  if(response.length > 0) {
    return true
  } else {
    return false
  }
}

export async function updateProduct(productId: string, values:ProductType) {
    const session = await auth()
    const id = session?.user?.id
    if (id) {
        const existingProduct = await getProductById(productId)
        if (existingProduct && existingProduct[0].sellerId === id) {
          const { title, description, price, currency, quantity, location, status } = values
          await db.update(products)
            .set({
              title: title || existingProduct[0].title,
              description: description || existingProduct[0].description,
              price: price || existingProduct[0].price,
              currency: currency || existingProduct[0].currency,
              quantity: quantity || existingProduct[0].quantity,
              location: location || existingProduct[0].location,
              status: status || existingProduct[0].status,
            })
            .where(eq(products.id, productId));
        } else {
          throw new Error("Product not found or unauthorized to update.");
        }
      }
}

// getter for a Product with id as param
export async function getProductById(productId: string) {
    const response = await db.select().from(products).where(eq(products.id, productId))
    return response
  }

export async function saveUserLocation(values : {city: string, postcode: number}) {
  const session = await auth()
  const id = session?.user?.id
  if(id) {
    await db.update(users)
    .set({ location: values.city + " " + values.postcode})
    .where(eq(users.id, id));
  }
}

export async function getUserById(userId :string) {
  const response = await db.select().from(users).where(eq(users.id, userId))
  return response
}
