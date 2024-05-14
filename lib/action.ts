'use server'
import { products, users, Authenticator } from '@/schema'
import { db } from '../db'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

//TODO funcion checking if user already has passkey registerted
export async function checkPasskey() {
  const session = await auth()
  const id = session?.user?.id
  if (!id) {
    return false
  }

  const response = await db
    .select()
    .from(Authenticator)
    .where(eq(Authenticator.userId, id))

  if (response.length > 0) {
    return true
  } else {
    return false
  }
}

type SignedURLResponse =
  | { failure?: undefined; success: { url: string } }
  | { failure: string; success?: undefined }

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function getSignedURL(filename: string): Promise<SignedURLResponse> {
  const session = await auth()
  if (!session) {
    return { failure: 'not authenticated' }
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: filename,
  })

  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 }, // 60 seconds
  )

  return { success: { url } }
}
