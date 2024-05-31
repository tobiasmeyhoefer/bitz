'use server'

import { products, favorites } from '@/schema'
import { db } from '../db'
import { eq, ne, or } from 'drizzle-orm'
import { auth } from '@/auth'
import { getUser, getUserById } from './useraction'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import { ProductType } from './types'
import { revalidatePath } from 'next/cache'
import { redirect } from '@/navigation'

export async function getProductsBrowse() {
  const session = await auth()
  const id = session?.user?.id
  if (id) {
    const response = await db.select().from(products).where(ne(products.sellerId, id))
    if (response) {
      return response
    }
  }
}

export async function getProductsOwned(userId: string) {
  /* const session = await auth()
  const id = session?.user?.id */
  let id = userId
  let response
  if (id) {
    response = await db.select().from(products).where(eq(products.sellerId, id)) //muss 'eq' sein und nicht 'ne'
    if (response) {
      return response
    }
  }
}

export async function addProduct(values: ProductType, imageUrls: string[]) {
  let { title, description, price, quantity, category } = values
  const session = await auth()
  const id = session?.user?.id
  const created = new Date(Date.now())
  created.setHours(created.getHours() + 2)
  if (id) {
    const user = await getUserById(id)
    await db.insert(products).values({
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      category: category,
      sellerId: id,
      location: user[0].location ?? null,
      createdAt: created,
      imageUrl1: imageUrls[0],
      imageUrl2: imageUrls[1],
      imageUrl3: imageUrls[2],
      imageUrl4: imageUrls[3],
      imageUrl5: imageUrls[4],
    })
  }
}

// Delete function requiring productId as string
export async function deleteProduct(productId: string) {
  const product = await getProductById(productId)
  const rightproduct = product[0]
  const imageUrls = [
    rightproduct.imageUrl1,
    rightproduct.imageUrl2,
    rightproduct.imageUrl3,
    rightproduct.imageUrl4,
    rightproduct.imageUrl5,
  ]
  for (const imageUrl of imageUrls) {
    if (imageUrl) {
      await deleteImageOnAws(imageUrl)
    }
  }
  await db.delete(products).where(eq(products.id, productId))
  revalidatePath('/myShop')
}

// Update function requiring productData as
export async function updateProduct(productId: string, values: ProductType) {
  const existingProduct = await getProductById(productId)
  if (existingProduct) {
    const { title, description, price, quantity } = values
    await db
      .update(products)
      .set({
        title: title || existingProduct[0].title,
        description: description || existingProduct[0].description,
        price: price || existingProduct[0].price,
        quantity: quantity || existingProduct[0].quantity,
      })
      .where(eq(products.id, productId))
  } else {
    throw new Error('Product not found or unauthorized to update.')
  }
}

// getter for a Product with id as param
export async function getProductById(productId: string) {
  const response = await db.select().from(products).where(eq(products.id, productId))
  return response
}

export async function addToFavorites(productId: string) {
  const session = await auth()
  const id = session?.user?.id
  if (id) {
    await db.insert(favorites).values({
      userId: id,
      productId: productId,
    })
  }
  revalidatePath('/favorites')
}

export async function deleteFavorite(productId: string) {
  await db.delete(favorites).where(eq(favorites.productId, productId))
  revalidatePath('/favorites')
}

export async function getUserFavorites() {
  const session = await auth()
  const id = session?.user?.id
  if (id) {
    const response = await db.select().from(favorites).where(eq(favorites.userId, id))
    return response
  }
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
  // console.log('test')
  const key = imageUrl.split('/').slice(-1)[0]
  // console.log(key)
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
