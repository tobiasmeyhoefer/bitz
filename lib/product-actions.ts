'use server'

import { products, favorites, ProductType } from '@/schema'
import { db } from '../db'
import { count, desc, eq, ne, or, sql, ilike, and } from 'drizzle-orm'
import { auth } from '@/auth'
import { getUserById } from './user-actions'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import { revalidatePath } from 'next/cache'
import { addProductStripe, setProductNotActive, updateProductStripe } from './stripe-actions'
import { redirect } from '@/navigation'
import { sortBy } from 'sort-by-typescript'

export async function getProductsBrowse(limit: number = 5, offset: number = 0) {
  const session = await auth()
  const id = session?.user?.id
  const response = await db
    .select()
    .from(products)
    .where(and(ne(products.sellerId, id!), ne(products.isSold, true)))
    .limit(limit)
    .offset(offset)
  return response
}

export async function getProductsOwned(userId: string) {
  const response = await db
    .select()
    .from(products)
    .where(and(eq(products.sellerId, userId), ne(products.isSold, true))) //muss 'eq' sein und nicht 'ne'
  return response
}

export async function addProduct(values: ProductType, imageUrls: string[]) {
  let { title, description, price, category, isDirectlyBuyable } = values
  const session = await auth()
  const id = session?.user?.id
  const created = new Date(Date.now())
  created.setHours(created.getHours() + 2)

  //nicht jeder User will das
  // const {stripeId, paymentLink} = await addProductStripe(title, description ?? '', price, imageUrls)

  if (id) {
    const user = await getUserById(id)
    const product = await db
      .insert(products)
      .values({
        title: title,
        description: description,
        price: price,
        category: category,
        sellerId: id,
        location: user.location ?? null,
        createdAt: created,
        imageUrl1: imageUrls[0],
        imageUrl2: imageUrls[1],
        imageUrl3: imageUrls[2],
        imageUrl4: imageUrls[3],
        imageUrl5: imageUrls[4],
        isDirectlyBuyable: isDirectlyBuyable,
        isSold: false,
        // stripeId: stripeId,
        // paymentLink: paymentLink
      })
      .returning()
    // product[0].id
    const { stripeId, paymentLink } = await addProductStripe(
      title,
      description ?? '',
      price,
      imageUrls,
      product[0].id,
    )
    await db
      .update(products)
      .set({ paymentLink: paymentLink, stripeId: stripeId })
      .where(eq(products.id, product[0].id))
  }
  revalidatePath('/myshop')
  redirect('/myshop')
  // const {stripeId, paymentLink} = await addProductStripe(title, description ?? '', price, imageUrls)
}

// Delete function requiring productId as string
export async function deleteProduct(productId: string) {
  const product = await getProductById(productId)
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
  await db.delete(products).where(eq(products.id, productId))
  await setProductNotActive(product!.stripeId!)
  revalidatePath('/myShop')
}

// Update function requiring productData as
export async function updateProduct(productId: string, values: ProductType) {
  //#endregion
  const existingProduct = await getProductById(productId)
  if (existingProduct) {
    const { title, description, price } = values
    await db
      .update(products)
      .set({
        title: title || existingProduct.title,
        description: description || existingProduct.description,
        price: price || existingProduct.price,
      })
      .where(eq(products.id, productId))
    await updateProductStripe(existingProduct.stripeId!, values)
    revalidatePath('myshop')
  } else {
    throw new Error('Product not found or unauthorized to update.')
  }
}

// getter for a product with id as param
export async function getProductById(productId: string) {
  const response = await db.select().from(products).where(eq(products.id, productId))
  if (response.length === 0) {
    throw new Error('Product not found in DB (getProductById)')
  }
  return response[0]
}

// getter for products with Category as param
export const getProductsByCategory = async (category: string, sellerId: string) => {
  const result = await db
    .select()
    .from(products)
    .where(and(eq(products.category, category), ne(products.sellerId, sellerId)))
  return result
}

// getter for products with title as param
export const searchProductsByTitle = async (title: string, sellerId: string) => {
  const sanitizedTitle = `%${title.replace(/%/g, '\\%').replace(/_/g, '\\_')}%`
  const res = db
    .select()
    .from(products)
    //.where(ilike(products.title, `%${title}%`)) // title
    .where(and(ilike(products.title, sanitizedTitle), ne(products.sellerId, sellerId)))
  return res
}

export async function addToFavorites(productId: string) {
  const session = await auth()
  const id = session?.user?.id
  await db.insert(favorites).values({
    userId: id!,
    productId: productId,
  })
  revalidatePath('/favorites')
}

export async function deleteFavorite(productId: string) {
  await db.delete(favorites).where(eq(favorites.productId, productId))
  revalidatePath('/favorites')
}

export async function getUserFavorites() {
  const session = await auth()
  const id = session?.user?.id
  const response = await db.select().from(favorites).where(eq(favorites.userId, id!))
  return response
}

export async function getFavoriteProducts() {
  const userFavorites = await getUserFavorites()
  if (userFavorites) {
    const favoriteProducts = userFavorites.map(async (product) => {
      return await db.select().from(products).where(eq(products.id, product.productId))
    })
    const productsBySeller = await Promise.all(favoriteProducts)
    const response = productsBySeller.flat()
    return response
  }
}

export async function checkFavorite(productId: string) {
  const userFavorites = await getUserFavorites()
  if (userFavorites) {
    return userFavorites.some((product) => product.productId === productId)
  }
  return false
}

//Code for Storing Images
type SignedURLResponse =
  | { failure?: undefined; success: { url: string } }
  | { failure: string; success?: undefined }

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/heic']

const maxFileSize = 1048576 * 8 // 8 MB

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

type GetSignedURLParams = {
  fileType: string
  fileSize: number
  checksum: string
}

export async function getSignedURL({
  fileType,
  fileSize,
  checksum,
}: GetSignedURLParams): Promise<SignedURLResponse> {
  const session = await auth()
  if (!session) {
    return { failure: 'not authenticated' }
  }

  if (!allowedFileTypes.includes(fileType)) {
    return { failure: 'File type not allowed' }
  }

  if (fileSize > maxFileSize) {
    return { failure: 'File size too large' }
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    // Let's also add some metadata which is stored in s3.
    Metadata: {
      userId: session.user!.id!,
    },
  })

  const url = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 60 })

  return { success: { url } }
}

export async function deleteImageNeon(imageIndex: number, productId: string) {
  const dynamicImageUrl: keyof typeof products =
    `${'imageUrl'}${imageIndex}` as keyof typeof products
  await db
    .update(products)
    .set({ [dynamicImageUrl]: null })
    .where(eq(products.id, productId))
}

export async function deleteImageOnAws(imageUrl: string) {
  const key = imageUrl.split('/').slice(-1)[0]
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  }
  await s3Client.send(new DeleteObjectCommand(deleteParams))
}

export async function updateProductImage(existingImageUrl: string, newImageUrl: string) {
  const product = await db
    .select()
    .from(products)
    .where(
      or(
        eq(products.imageUrl1, existingImageUrl),
        eq(products.imageUrl2, existingImageUrl),
        eq(products.imageUrl3, existingImageUrl),
        eq(products.imageUrl4, existingImageUrl),
        eq(products.imageUrl5, existingImageUrl),
      ),
    )
  const p = product[0]
  if (p) {
    switch (existingImageUrl) {
      case p.imageUrl1:
        await db
          .update(products)
          .set({
            imageUrl1: newImageUrl,
          })
          .where(eq(products.id, p.id))
        await deleteImageOnAws(existingImageUrl)
        break
      case p.imageUrl2:
        await db
          .update(products)
          .set({
            imageUrl2: newImageUrl,
          })
          .where(eq(products.id, p.id))
        await deleteImageOnAws(existingImageUrl)
        break
      case p.imageUrl3:
        await db
          .update(products)
          .set({
            imageUrl3: newImageUrl,
          })
          .where(eq(products.id, p.id))
        await deleteImageOnAws(existingImageUrl)
        break
      case p.imageUrl4:
        await db
          .update(products)
          .set({
            imageUrl4: newImageUrl,
          })
          .where(eq(products.id, p.id))
        await deleteImageOnAws(existingImageUrl)
        break
      case p.imageUrl5:
        await db
          .update(products)
          .set({
            imageUrl5: newImageUrl,
          })
          .where(eq(products.id, p.id))
        await deleteImageOnAws(existingImageUrl)
        break
      default:
        return
    }
    redirect('/myshop')
  }
}

export async function getAllProductsCount() {
  const result = await db.select({ count: count() }).from(products)
  return result[0].count
}

export async function sortProducts(value: string) {
  const session = await auth()
  const id = session?.user?.id
  const response = await db
    .select()
    .from(products)
    .where(and(ne(products.sellerId, id!), ne(products.isSold, true)))
  const result = response.sort(sortBy(value))
  return result
}

export async function sortProductsShop(value: string, userID: string) {
  const response = await db
    .select()
    .from(products)
    .where(and(eq(products.sellerId, userID), ne(products.isSold, true)))
  const result = response.sort(sortBy(value))
  return result
}

export async function getMostExpensiveProduct() {
  const session = await auth()
  const id = session?.user?.id
  const response = await db
    .select()
    .from(products)
    .where(and(ne(products.isSold, true), ne(products.sellerId, id!)))
    .orderBy(desc(products.price))
  if (response.length === 0) {
    throw new Error('No Products found in DB (getMostExpensiveProduct)')
  }
  return response[0]
}

export async function filterProducts(values: {
  category: string
  location: string
  isDirectlyBuyable: boolean
  price: number
}) {
  const session = await auth()
  const id = session?.user?.id
  const { category, location, isDirectlyBuyable, price } = values
  let response = await db
    .select()
    .from(products)
    .where(and(ne(products.sellerId, id!), ne(products.isSold, true)))
  if (category) {
    response = response.filter((item) => item.category == category)
  }
  if (location) {
    response = response.filter((item) => item.location?.includes(location))
  }
  if (isDirectlyBuyable) {
    response = response.filter((item) => item.isDirectlyBuyable === isDirectlyBuyable)
  }
  if (price) {
    response = response.filter((item) => item.price <= price)
  }
  return response
}
export async function checkProfanity(message: string): Promise<boolean> {
  const res = await fetch('https://vector.profanity.dev', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  const json = await res.json()
  return json.isProfanity
}
