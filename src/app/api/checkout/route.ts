import { NextResponse } from "next/server";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export async function POST() {
  try {
    const stripeSecretKey = requiredEnv("STRIPE_SECRET_KEY");
    const stripePriceId = requiredEnv("STRIPE_PRICE_ID");
    const appUrl = requiredEnv("NEXT_PUBLIC_APP_URL");

    const params = new URLSearchParams();
    params.set("mode", "subscription");
    params.set("success_url", `${appUrl}/checkout/success`);
    params.set("cancel_url", `${appUrl}/checkout/cancel`);
    params.set("line_items[0][price]", stripePriceId);
    params.set("line_items[0][quantity]", "1");
    params.set("billing_address_collection", "required");
    params.set("allow_promotion_codes", "true");

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: "Stripe checkout session creation failed", details: errorText }, { status: 502 });
    }

    const session = (await response.json()) as { url?: string };

    if (!session.url) {
      return NextResponse.json({ error: "Stripe checkout URL missing from response" }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected checkout error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
