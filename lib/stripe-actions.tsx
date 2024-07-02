'use server'

import Stripe from 'stripe'
import { db } from '@/db'
import { checkoutSession, products, transactions, ProductType } from '@/schema'
import { desc, eq, or } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { getUser, getUserById } from './user-actions'
import { revalidatePath } from 'next/cache'
import axios from 'axios'
import { getProductById } from './product-actions'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function addProductStripe(
  title: string,
  description: string,
  price: number,
  images: string[],
  productId: string,
): Promise<{ stripeId: string; paymentLink: string }> {
  const product = await stripe.products.create({
    name: title,
    description: description,
    images: images,
    default_price_data: {
      unit_amount: price * 100,
      currency: 'eur',
    },
    expand: ['default_price'],
    metadata: { productId: productId },
  })
  const priceId = (product.default_price as Stripe.Price).id
  const paymentLink = await createPaymentLink(priceId)
  return { stripeId: product.id, paymentLink: paymentLink }
}

export async function setProductNotActive(productId: string) {
  await stripe.products.update(productId, {
    active: false,
  })
}

// experimental
export async function updateProductStripe(productId: string, values: ProductType) {
  // const product = await stripe.products.retrieve(productId)

  const price = await stripe.prices.create({
    currency: 'eur',
    product: productId,
    unit_amount: values.price * 100,
  })

  const newPaymentLink = await createPaymentLink(price.id)
  await db
    .update(products)
    .set({ paymentLink: newPaymentLink })
    .where(eq(products.stripeId, productId))

  await stripe.products.update(productId, {
    name: values.title,
    description: values.description,
    default_price: price.id,
  })
}

async function createPaymentLink(priceId: string): Promise<string> {
  const cookieStore = cookies()
  const locale = cookieStore.get('NEXT_LOCALE')
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    after_completion: {
      type: 'redirect',
      redirect: {
        url:
          process.env.NODE_ENV === 'development'
            ? `http://localhost:3000/${locale?.value}/transactions`
            : `https://bitztech.de/${locale?.value}/transactions`,
      },
    },
  })
  return paymentLink.url
}

// TODO: add productSold bool on product and create an entry in transactions table
export async function savePayment(productId: string) {
  const buyerId = await getUserFromCheckoutSession(productId)
  const result = await db
    .select({ sellerId: products.sellerId, price: products.price })
    .from(products)
    .where(eq(products.id, productId))
  const { sellerId, price } = result[0]
  await createTransaction(buyerId, productId, sellerId, price)
  // await db.insert(transactions).values({buyerId: buyerId, productId: productId, sellerId: sellerId, price: price})
}

export async function createTransaction(
  buyerId: string,
  productId: string,
  sellerId: string,
  price: number,
) {
  await db
    .insert(transactions)
    .values({ buyerId: buyerId, productId: productId, sellerId: sellerId, price: price })
  revalidatePath('/conversations')
}

export async function handleCompletedCheckoutSession(event: Stripe.CheckoutSessionCompletedEvent) {
  try {

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      (event.data.object as Stripe.Checkout.Session).id,
      { expand: ['line_items'] },
    )
    const lineItems = sessionWithLineItems.line_items
    if (!lineItems) return false

    const product = await stripe.products.retrieve(lineItems.data[0].price?.product as string)
    const dbProduct = await getProductById(product.metadata.productId)
    const seller = await getUserById(dbProduct.sellerId)

    await fetch('/api/mail/productDirectlySold', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: seller.email,
        productName: dbProduct.title,
        address: seller.adress
      }),
    })

    changeProductStateToSold(product.metadata.productId)
    await savePayment(product.metadata.productId)
    await deleteCheckoutSession(product.metadata.productId)
  } catch (error) {}
}
export async function changeProductStateToSold(productId: string) {
  await db.update(products).set({ isSold: true }).where(eq(products.id, productId)) //set isSold true on product
}

export async function createCheckoutSession(userId: string, productId: string) {
  await db.insert(checkoutSession).values({ buyerId: userId, productId: productId })
}

export async function productHasCheckoutSessionOpened(productId: string) {
  const result = await db
    .select()
    .from(checkoutSession)
    .where(eq(checkoutSession.productId, productId))
  if (result.length > 0) {
    return true
  }

  return false
}

export async function deleteCheckoutSession(productId: string) {
  await db.delete(checkoutSession).where(eq(checkoutSession.productId, productId))
}

async function getUserFromCheckoutSession(productId: string) {
  const result = await db
    .select({ id: checkoutSession.buyerId })
    .from(checkoutSession)
    .where(eq(checkoutSession.productId, productId))
  return result[0].id
}

export async function getUserTransactions() {
  const user = await getUser()
  return await db
    .select()
    .from(transactions)
    .where(or(eq(transactions.buyerId, user.id), eq(transactions.sellerId, user.id)))
    .orderBy(desc(transactions.createdAt))
}
