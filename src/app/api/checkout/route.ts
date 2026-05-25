import { NextResponse } from "next/server";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();
    if (!priceId) return NextResponse.json({ error: "Missing priceId" }, { status: 400 });

    const stripeSecretKey = requiredEnv("STRIPE_SECRET_KEY");
    const appUrl = requiredEnv("NEXT_PUBLIC_APP_URL");

    // Construct form data using Stripe's expected format for custom fields
    const body = new URLSearchParams();
    body.set("mode", "subscription");
    body.set("success_url", `${appUrl}/checkout/success`);
    body.set("cancel_url", `${appUrl}/checkout/cancel`);
    body.set("line_items[0][price]", priceId);
    body.set("line_items[0][quantity]", "1");
    body.set("billing_address_collection", "required");
    
    // Add Custom Fields for Calendly/Onboarding
    body.set("custom_fields[0][key]", "company_name");
    body.set("custom_fields[0][label][type]", "custom");
    body.set("custom_fields[0][label][custom]", "Company Name");
    body.set("custom_fields[0][type]", "text");
    body.set("custom_fields[0][text][required]", "true");

    body.set("custom_fields[1][key]", "calendly_link");
    body.set("custom_fields[1][label][type]", "custom");
    body.set("custom_fields[1][label][custom]", "Your Calendly Booking Link");
    body.set("custom_fields[1][type]", "text");
    body.set("custom_fields[1][text][required]", "true");

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
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
