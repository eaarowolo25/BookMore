"use client";

import Link from "next/link";
import { useState } from "react";

const features = [
  "SMS reminders",
  "Email automation",
  "Automated review requests",
  "Rebooking flows",
  "Managed setup included",
  "Support included",
];

export default function PricingPage() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const startCheckout = async () => {
    if (isCheckingOut) {
      return;
    }

    setCheckoutError(null);
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const payload = (await response.json()) as { error?: string; url?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Unable to start checkout.");
      }

      window.location.href = payload.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to start checkout.";
      setCheckoutError(message);
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="min-h-screen py-12 md:py-20">
      <div className="container-shell">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-display text-4xl md:text-5xl">Pricing</h1>
          <Link
            href="/"
            className="rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold"
          >
            Back to Home
          </Link>
        </div>

        <div className="card-surface mx-auto max-w-3xl rounded-[30px] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Automation System</p>
          <p className="mt-2 text-display text-5xl">£49/month</p>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Built for salons, barbers, beauticians, and aesthetics clinics that want reliable communication without manual admin.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="rounded-2xl border border-[var(--color-border-soft)] bg-white px-4 py-3 text-sm">
                {feature}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startCheckout}
              disabled={isCheckingOut}
              className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-surface)] shadow-[var(--shadow-md)] transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isCheckingOut ? "Opening Checkout..." : "Start Automation Setup"}
            </button>
            <Link
              href="/#faq"
              className="rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold"
            >
              Read FAQ
            </Link>
          </div>

          {checkoutError ? <p className="mt-4 text-sm text-red-700">{checkoutError}</p> : null}
          <p className="mt-4 text-xs text-[var(--color-text-muted)]">SMS usage limits apply.</p>
        </div>
      </div>
    </main>
  );
}
