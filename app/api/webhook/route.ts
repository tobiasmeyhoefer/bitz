import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { handleCompletedCheckoutSession, savePayment } from "@/lib/stripe-actions";
import { getUser } from "@/lib/useraction";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleDateString();

  const secret = process.env.NODE_ENV === "production" ? process.env.STRIPE_WEBHOOK_SECRET : process.env.STRIPE_WEBHOOK_SECRET_LOCAL

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      secret!
    );

    switch (event.type) {
      case "checkout.session.completed": 
        const savedSession = await handleCompletedCheckoutSession(event)
        break;
    }

    return NextResponse.json({ status: "success", event: event.type, response: res });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}