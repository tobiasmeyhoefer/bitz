'use server'

import Stripe from 'stripe'
import { ProductType } from './types'
import { getUser } from './useraction'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function addProductStripe(
  title: string,
  description: string,
  price: number,
  images: string[],
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
  })
  const priceId = (product.default_price as Stripe.Price).id
  const paymentLink = await createPaymentLink(priceId)
  return { stripeId: product.id, paymentLink: paymentLink }
}

async function deleteProductStripe(id: string) {
  const deleted = await stripe.products.del(id)
}

// experimental
async function updateProductStripe(productId: string, values: ProductType) {
  const product = await stripe.products.retrieve(productId)

  const price = await stripe.prices.create({
    currency: 'eur',
    unit_amount: values.price,
  })

  const updatedProduct = await stripe.products.update(productId, {
    name: values.title,
    description: values.description,
    default_price: price.id,
  })
}

async function createPaymentLink(priceId: string): Promise<string> {
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })
  return paymentLink.url
}

// TODO: add productSold bool on product and create an entry in sales table
export async function savePayment(stripeProductId: string) {}

export async function handleCompletedCheckoutSession(event: Stripe.CheckoutSessionCompletedEvent) {
  console.log('test')
  try {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      (event.data.object as any).id,
      { expand: ['line_items'] },
    )
    const lineItems = sessionWithLineItems.line_items
    if (!lineItems) return false
    console.log(lineItems)
    console.log('-----')
    console.log(lineItems.data[0].price)
    await savePayment(lineItems.data[0].price?.product as string)
  } catch (error) {}
}
