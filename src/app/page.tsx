"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const trustItems = [
  { name: "Acuity", src: "https://logo.clearbit.com/acuityscheduling.com" },
  { name: "Booksy", src: "https://logo.clearbit.com/booksy.com" },
  { name: "Twilio", src: "https://logo.clearbit.com/twilio.com" },
  { name: "Stripe", src: "https://logo.clearbit.com/stripe.com" },
];

const outcomes = [
  {
    title: "Fewer no-shows",
    desc: "Automatic confirmations and timed reminders keep appointment attendance consistent.",
  },
  {
    title: "More repeat bookings",
    desc: "Post-visit and timed rebooking prompts bring clients back before churn.",
  },
  {
    title: "Less manual admin",
    desc: "Routine communication runs in the background so your team can stay client-focused.",
  },
];

const features = [
  {
    title: "Reminder Sequences",
    desc: "Confirmation, 24-hour and 2-hour reminders are sent automatically by SMS and email.",
  },
  {
    title: "Review Requests",
    desc: "Send review prompts after completed appointments while the client experience is fresh.",
  },
  {
    title: "Rebooking Automation",
    desc: "Trigger follow-up nudges based on service cadence and preferred rebooking windows.",
  },
];

const steps = [
  "Connect your booking software",
  "Enable your brand voice and message timing",
  "Launch reminders, reviews, and rebooking flows",
];

const faqs = [
  {
    question: "What happens after I pay?",
    answer:
      "You get onboarding support to connect your booking stack, confirm messaging, and activate your automation system.",
  },
  {
    question: "Does this work with Acuity and Booksy?",
    answer:
      "Yes. SignalFlow is configured around your existing booking workflow and communication stack.",
  },
  {
    question: "Can I edit message copy later?",
    answer:
      "Yes. You can update wording, timing, and campaign tone as your offers and brand evolve.",
  },
  {
    question: "Do client replies come back to us?",
    answer:
      "Yes. Replies route back to your team so staff can step in manually when needed.",
  },
  {
    question: "Can I cancel any time?",
    answer:
      "Yes. You can cancel your subscription from your billing account settings.",
  },
  {
    question: "Is setup included in the monthly price?",
    answer:
      "Yes. Initial setup and onboarding are included in the £49/month plan.",
  },
];

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [open, setOpen] = useState<number | null>(0);
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
    <div className="text-[var(--color-text-primary)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border-soft)] bg-[rgba(250,250,249,0.86)] backdrop-blur-xl">
        <div className="container-shell flex h-18 items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">SignalFlow</span>
          <div className="flex items-center gap-6">
            <nav className="hidden gap-5 text-sm text-[var(--color-text-secondary)] md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-[var(--color-text-primary)]">
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={startCheckout}
              disabled={isCheckingOut}
              className="rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-surface)] shadow-[var(--shadow-md)] transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isCheckingOut ? "Opening Checkout..." : "Start Automation Setup"}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden py-18 md:py-24 lg:py-30">
          <div className="hero-grid absolute inset-0 opacity-25" />
          <div className="container-shell relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Fade>
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Automation for salons and clinics</p>
                <h1 className="mt-3 text-display max-w-xl text-4xl leading-tight md:text-6xl">
                  Turn every booking into repeat revenue.
                </h1>
                <p className="mt-6 max-w-xl text-lg text-[var(--color-text-secondary)]">
                  SignalFlow automates reminders, review requests, and rebooking outreach so you keep chairs full without daily follow-up work.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={startCheckout}
                    disabled={isCheckingOut}
                    className="rounded-full bg-[var(--color-primary)] px-7 py-3 text-sm font-semibold text-[var(--color-surface)] shadow-[var(--shadow-md)] transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isCheckingOut ? "Opening Checkout..." : "Start Automation Setup"}
                  </button>
                  <a
                    href="#how-it-works"
                    className="rounded-full border border-[var(--color-border)] bg-white px-7 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-primary)]"
                  >
                    See How It Works
                  </a>
                </div>
                {checkoutError ? <p className="mt-4 text-sm text-red-700">{checkoutError}</p> : null}
                <p className="mt-4 text-xs text-[var(--color-text-muted)]">£49/month • Setup included • Cancel anytime</p>
              </div>
            </Fade>

            <Fade delay={0.1}>
              <div className="card-surface rounded-[30px] p-6 shadow-[var(--shadow-md)]">
                <p className="text-sm uppercase tracking-[0.12em] text-[var(--color-text-muted)]">What you launch immediately</p>
                <div className="mt-4 grid gap-3">
                  {[
                    "Appointment confirmations",
                    "24h + 2h reminder sequence",
                    "Post-visit review requests",
                    "Timed rebooking prompts",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-[var(--color-border-soft)] bg-white p-4 text-sm text-[var(--color-text-secondary)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </div>
        </section>

        <section className="py-6 md:py-10">
          <div className="container-shell">
            <p className="mb-4 text-center text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Built around tools your team already uses</p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {trustItems.map((logo) => (
                <div key={logo.name} className="flex min-h-18 items-center justify-center rounded-xl border border-[var(--color-border-soft)] bg-white px-4 py-3">
                  <Image
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    width={112}
                    height={28}
                    className="h-7 w-auto opacity-80 grayscale"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-18">
          <div className="container-shell">
            <Fade>
              <h2 className="text-display max-w-3xl text-3xl md:text-5xl">Built to improve retention, without growing admin load.</h2>
            </Fade>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {outcomes.map((card, i) => (
                <Fade key={card.title} delay={i * 0.05}>
                  <div className="card-surface h-full p-6">
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{card.desc}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-18">
          <div className="container-shell space-y-5">
            {features.map((feature, i) => (
              <Fade key={feature.title} delay={i * 0.05}>
                <div className="card-surface grid gap-5 p-6 md:grid-cols-[1.3fr_0.7fr] md:items-center md:p-8">
                  <div>
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                    <p className="mt-3 text-[var(--color-text-secondary)]">{feature.desc}</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-primary-soft)]/45 p-4">
                    <div className="space-y-2.5">
                      <div className="h-8 rounded-lg bg-white/90" />
                      <div className="h-8 rounded-lg bg-white/80" />
                      <div className="h-8 rounded-lg bg-white/70" />
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="py-12 md:py-18">
          <div className="container-shell">
            <Fade>
              <h2 className="text-display text-3xl md:text-5xl">How setup works</h2>
            </Fade>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map((step, i) => (
                <Fade key={step} delay={i * 0.05}>
                  <div className="card-surface h-full p-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]">Step {i + 1}</p>
                    <p className="mt-2 font-semibold">{step}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-12 md:py-18">
          <div className="container-shell">
            <Fade>
              <div className="card-surface mx-auto max-w-2xl rounded-[30px] p-8 text-center md:p-10">
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--color-text-muted)]">One Plan</p>
                <p className="mt-2 text-display text-5xl">£49/month</p>
                <p className="mx-auto mt-4 max-w-xl text-[var(--color-text-secondary)]">
                  Includes setup, reminder automation, review flows, and rebooking automation for your team.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={startCheckout}
                    disabled={isCheckingOut}
                    className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-surface)] shadow-[var(--shadow-md)] transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isCheckingOut ? "Opening Checkout..." : "Start Automation Setup"}
                  </button>
                  <Link href="/pricing" className="rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold">
                    View Plan Details
                  </Link>
                </div>
                <p className="mt-4 text-xs text-[var(--color-text-muted)]">SMS usage limits apply.</p>
              </div>
            </Fade>
          </div>
        </section>

        <section id="faq" className="py-12 md:py-18">
          <div className="container-shell max-w-3xl">
            <Fade>
              <h2 className="text-display text-3xl md:text-5xl">FAQ</h2>
            </Fade>
            <div className="mt-8 space-y-3">
              {faqs.map((faq, i) => (
                <div key={faq.question} className="card-surface overflow-hidden">
                  <button
                    className="flex w-full items-center justify-between px-5 py-4 text-left font-medium"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span>{faq.question}</span>
                    <span className="text-[var(--color-text-muted)]">{open === i ? "−" : "+"}</span>
                  </button>
                  {open === i ? (
                    <p className="border-t border-[var(--color-border-soft)] px-5 py-4 text-sm text-[var(--color-text-secondary)]">{faq.answer}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-14 pt-10 md:pb-20 md:pt-14">
          <div className="container-shell">
            <div className="card-surface mx-auto max-w-3xl rounded-[30px] p-7 text-center md:p-10">
              <h2 className="text-display text-3xl md:text-5xl">Ready to automate client follow-up?</h2>
              <p className="mx-auto mt-4 max-w-xl text-[var(--color-text-secondary)]">
                Start your checkout now and we will begin setup onboarding right after payment.
              </p>
              <button
                type="button"
                onClick={startCheckout}
                disabled={isCheckingOut}
                className="mt-7 rounded-full bg-[var(--color-primary)] px-8 py-3 text-sm font-semibold text-[var(--color-surface)] shadow-[var(--shadow-md)] transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isCheckingOut ? "Opening Checkout..." : "Start Automation Setup"}
              </button>
              {checkoutError ? <p className="mt-4 text-sm text-red-700">{checkoutError}</p> : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-border-soft)] bg-white/75 py-10">
        <div className="container-shell grid gap-8 text-sm text-[var(--color-text-secondary)] md:grid-cols-4">
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">SignalFlow</p>
            <p className="mt-2">Automated client communication for local service businesses.</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">Product</p>
            <p className="mt-2">Features</p>
            <p>Pricing</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">Contact</p>
            <p className="mt-2">hello@signalflow.io</p>
            <p>Instagram</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">Legal</p>
            <p className="mt-2">© {new Date().getFullYear()} SignalFlow</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
