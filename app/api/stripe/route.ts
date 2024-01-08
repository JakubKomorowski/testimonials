import { adminDb } from "@/firebase-admin";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const host = headers().get("host");

  if (!session?.user.id) return console.error("No user Id foud");

  const {
    user: { id },
  } = session;

  //TODO change to https when deploy
  const returnUrl = `http://${host}`;

  const doc = await adminDb.collection("customers").doc(id).get();

  if (!doc.data)
    return console.error("No customer record found with userId: ", id);

  const stripeId = doc.data()?.stripeId;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: returnUrl,
  });
  // redirect(stripeSession.url);
  return new Response(JSON.stringify({ url: stripeSession.url }));
}
