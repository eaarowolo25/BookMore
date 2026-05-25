"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Container, FadeIn } from "@/app/page";

export default function CheckoutCancelPage() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const startCheckout = async () => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    try {
      const priceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ID;
      if (!priceId) throw new Error("Price ID missing");
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const payload = await response.json();
      if (payload.url) window.location.href = payload.url;
    } catch (e) {
      console.error(e);
      setIsCheckingOut(false);
      alert("Unable to restart checkout. Please try again from the pricing page.");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] py-12 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <FadeIn className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Your growth is waiting
            </p>
            <h1 className="text-display mt-4 text-4xl md:text-6xl">Don&apos;t leave your calendar to chance.</h1>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
              Every day without automation is another day spent chasing no-shows and missing rebooking opportunities.
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Graph 1: Without Rebooks */}
            <FadeIn delay={0.1} className="card-surface p-8">
              <h3 className="font-bold text-lg mb-2">Without Rebooks</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                Constant effort required to find new clients just to maintain revenue.
              </p>
              
              <div className="relative h-48 w-full bg-gray-50 rounded-xl overflow-hidden p-4 flex items-end">
                <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-20">
                  <div className="h-px w-full bg-gray-300" />
                  <div className="h-px w-full bg-gray-300" />
                  <div className="h-px w-full bg-gray-300" />
                </div>
                
                <svg viewBox="0 0 100 40" className="w-full h-full z-10 overflow-visible">
                  <motion.path
                    d="M0,35 L20,32 L40,34 L60,31 L80,33 L100,30"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  {/* Floating labels */}
                  <motion.circle cx="100" cy="30" r="3" fill="#94a3b8" />
                </svg>
                
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-gray-400">
                  LINEAR GROWTH
                </div>
              </div>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-red-400">✕</span> High cost per customer
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-red-400">✕</span> Unpredictable calendar
                </li>
              </ul>
            </FadeIn>

            {/* Graph 2: With BookMore */}
            <FadeIn delay={0.2} className="card-surface p-8 border-2 border-[var(--color-primary-soft)] relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                REVENUE ACCELERATOR
              </div>
              <h3 className="font-bold text-lg mb-2">With BookMore</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                Automated rebooks create a compounding effect that fills your calendar automatically.
              </p>
              
              <div className="relative h-48 w-full bg-blue-50/30 rounded-xl overflow-hidden p-4 flex items-end">
                <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-20 text-blue-200">
                  <div className="h-px w-full bg-blue-200" />
                  <div className="h-px w-full bg-blue-200" />
                  <div className="h-px w-full bg-blue-200" />
                </div>
                
                <svg viewBox="0 0 100 40" className="w-full h-full z-10 overflow-visible">
                  <motion.path
                    d="M0,35 Q20,35 40,30 T80,15 T100,0"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  />
                  <motion.circle 
                    cx="100" cy="0" r="4" 
                    fill="var(--color-primary)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.5 }}
                  />
                  {/* Glow effect */}
                  <motion.path
                    d="M0,35 Q20,35 40,30 T80,15 T100,0"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="opacity-20 blur-sm"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  />
                </svg>
                
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-[var(--color-primary)]">
                  COMPOUNDING REVENUE
                </div>
              </div>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-green-500">✓</span> Automated rebooking
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-green-500">✓</span> 5-star review loops
                </li>
              </ul>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="mt-16 text-center">
            <div className="card-surface p-8 md:p-12 inline-block w-full">
              <h2 className="text-2xl md:text-3xl font-bold">Ready to secure your future revenue?</h2>
              <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
                Join the salons, barbers, and clinics that have automated their admin and focused back on their craft.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={startCheckout}
                  disabled={isCheckingOut}
                  className="rounded-full bg-[var(--color-primary)] px-10 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-105 active:scale-95 disabled:opacity-70"
                >
                  {isCheckingOut ? "Restarting..." : "Start Automation Setup"}
                </button>
                <Link
                  href="/#pricing"
                  className="rounded-full border border-[var(--color-border)] bg-white px-10 py-4 text-lg font-bold transition hover:bg-gray-50"
                >
                  View Plans
                </Link>
              </div>
              <p className="mt-6 text-sm text-[var(--color-text-muted)]">
                No charge was made. Your selected plan and pricing are locked in.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </main>
  );
}
