'use server'
import { products, users, Authenticator } from '@/schema'
import { db } from '../db'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { ProductType} from '@/models/product-model'

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


