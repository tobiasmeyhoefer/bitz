import Stripe from 'stripe'
import { NextResponse, NextRequest } from 'next/server'
import { handleCompletedCheckoutSession, savePayment } from '@/lib/stripe-actions'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
export async function POST(req: NextRequest) {
  const payload = await req.text()
  const res = JSON.parse(payload)

  const sig = req.headers.get('stripe-signature')
  console.log("Signature: " + sig)

  const secret =
    process.env.NODE_ENV === 'production'
      ? process.env.STRIPE_WEBHOOK_SECRET!
      : process.env.STRIPE_WEBHOOK_SECRET_LOCAL!

  console.log("secret: " + secret)

  try {
    let event = stripe.webhooks.constructEvent(payload, sig!, secret!)

    console.log(event)

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('checkout.session.completed')
        const savedSession = await handleCompletedCheckoutSession(event)
        break
    }

    return NextResponse.json({ status: 'success', event: event.type, response: res })
  } catch (error) {
    return NextResponse.json({ status: 'Failed', error })
  }
}
