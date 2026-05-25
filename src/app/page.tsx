"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// --- Components ---

export function FadeIn({ children, delay = 0, direction = "up", className = "" }: { children: React.ReactNode; delay?: number; direction?: "up" | "down" | "left" | "right" | "none"; className?: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const directions = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: isMobile ? 0 : 24, y: 0 },
    right: { x: isMobile ? 0 : -24, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container-shell ${className}`}>{children}</div>;
}

// --- Data ---

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Who It's For", href: "#who-its-for" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const metrics = [
  { headline: "↓ 38% fewer no-shows", copy: "Automatic reminders improve appointment attendance consistency." },
  { headline: "↑ More repeat bookings", copy: "Timed rebooking prompts bring clients back before churn." },
  { headline: "Save hours every week", copy: "Routine communication runs automatically in the background." },
];

const industries = [
  "Hair Salons", "Barbers", "Beauty Clinics", "Nail Studios", "Lash Studios", "Aesthetic Clinics"
];

const logos = [
  { name: "Booksy", src: "/Images/Logos/Booksy_ids73C7DI8_0.svg" },
  { name: "Acuity", src: "/Images/Logos/Acuity_Scheduling_Logo.svg" },
  { name: "Stripe", src: "/Images/Logos/960px-Stripe_Logo,_revised_2016.svg.png" },
  { name: "Twilio", src: "/Images/Logos/960px-Twilio-logo-red.svg.png" },
];

const faqs = [
  {
    question: "What happens after I sign up?",
    answer: "You get onboarding support to connect your booking stack, confirm messaging, and activate your automation system."
  },
  {
    question: "Does this work with my booking software?",
    answer: "Yes. BookMore is configured around your existing booking workflow and communication stack including Acuity, Booksy, and more."
  },
  {
    question: "Can clients reply to messages?",
    answer: "Yes. Replies route back to your team so staff can step in manually when needed."
  },
  {
    question: "Can I edit the message copy?",
    answer: "Yes. You can update wording, timing, and campaign tone as your brand evolves."
  },
  {
    question: "Is setup included?",
    answer: "Yes. Initial setup and onboarding are included in the £49/month plan."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. You can cancel your subscription from your billing account settings at any time."
  }
];

// --- Main Page ---

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const startCheckout = async (priceId: string) => {
    if (!priceId) {
      console.error("Stripe Price ID is missing. Check NEXT_PUBLIC_STRIPE_MONTHLY_ID in Vercel.");
      alert("Configuration Error: Stripe Price ID is not defined. If you just added the environment variables, please redeploy your site on Vercel.");
      return;
    }
    
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId })
      });
      const payload = await response.json();
      if (payload.url) {
        window.location.href = payload.url;
      } else {
        const detail = payload.details ? `\n\nStripe says: ${payload.details}` : "";
        throw new Error((payload.error || "Checkout failed") + detail);
      }
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "An unexpected error occurred during checkout.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-[var(--color-border-soft)] bg-[rgba(248,247,244,0.8)] backdrop-blur-md">
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">BookMore</Link>
          
          <div className="flex items-center gap-3">
            {/* Mobile CTA */}
            <button
              onClick={() => startCheckout(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ID || "")}
              disabled={isCheckingOut}
              className="md:hidden rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-[var(--color-primary-hover)] disabled:opacity-70"
            >
              {isCheckingOut ? "..." : "Start Now"}
            </button>

            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]">
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => startCheckout(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ID || "")}
                disabled={isCheckingOut}
                className="rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--color-primary-hover)] disabled:opacity-70"
              >
                {isCheckingOut ? "Connecting..." : "Automate My Salon"}
              </button>
            </nav>
          </div>
        </Container>
      </header>

      <main className="pt-20">
        {/* Section 1: Hero */}
        <section className="relative flex min-h-[90vh] items-center overflow-hidden py-12 md:py-20">
          <div className="hero-grid absolute inset-0 opacity-20" />
          <Container className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeIn direction="up" className="flex flex-col items-center lg:items-start">
              <p className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] text-center lg:text-left">
                Automation for Salons, Barbers & Beauty Clinics
              </p>
              <h1 className="text-display mt-4 text-3xl leading-tight md:text-7xl md:leading-[1.1] text-center lg:text-left break-words max-w-full">
                Reduce no-shows and increase repeat bookings automatically.
              </h1>
              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)] text-center lg:text-left mx-auto lg:mx-0">
                BookMore automates confirmations, reminders, reviews, and rebooking follow-ups so your team spends less time chasing clients and more time delivering appointments.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center lg:items-start">
                <button
                  onClick={() => startCheckout(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ID || "")}
                  disabled={isCheckingOut}
                  className="w-full sm:w-auto rounded-full bg-[var(--color-primary)] px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:scale-105 active:scale-95 disabled:opacity-70"
                >
                  Automate My Salon
                </button>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-8 py-4 text-base font-semibold text-[var(--color-text-primary)] transition hover:bg-gray-50"
                >
                  View Example Flows
                </a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] md:text-sm font-medium text-[var(--color-text-muted)]">
                <span className="flex items-center gap-2 whitespace-nowrap">✓ Setup Included</span>
                <span className="flex items-center gap-2 whitespace-nowrap">✓ Cancel Anytime</span>
                <span className="flex items-center gap-2 whitespace-nowrap">✓ Works With Your Software</span>
              </div>
            </FadeIn>

            <div className="relative h-[400px] sm:h-[500px] w-full lg:h-[700px] mt-12 lg:mt-0">
              <FadeIn delay={0.2} direction="none" className="h-full">
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-1/2 top-1/2 z-20 w-[180px] -translate-x-1/2 -translate-y-1/2 md:w-[300px]"
                >
                  <Image
                    src="/Images/iPhone_mockup_iMessage_luxury_salon_202605241124.jpeg"
                    alt="Rebooking Reminder"
                    width={600}
                    height={1200}
                    className="rounded-[30px] md:rounded-[40px] shadow-2xl"
                  />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute right-0 top-0 z-30 w-[140px] md:-right-8 md:top-20 md:w-[260px]"
                >
                  <Image
                    src="/Images/WhatsApp_conversation_UI_mockup_202605241130.jpeg"
                    alt="WhatsApp Reminder"
                    width={600}
                    height={1200}
                    className="rounded-[24px] md:rounded-[40px] shadow-2xl"
                  />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 left-0 z-10 w-[140px] md:-left-8 md:bottom-20 md:w-[260px]"
                >
                  <Image
                    src="/Images/iMessage_Google_review_request_202605241127.jpeg"
                    alt="Review Request"
                    width={600}
                    height={1200}
                    className="rounded-[24px] md:rounded-[40px] shadow-2xl"
                  />
                </motion.div>
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-[var(--color-primary)] opacity-10 blur-[60px] md:blur-[100px]" />
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Section 2: Social Proof Metrics */}
        <section className="bg-white py-24">
          <Container>
            <div className="grid gap-8 md:grid-cols-3">
              {metrics.map((metric, i) => (
                <FadeIn key={i} delay={i * 0.1} className="w-full flex justify-center">
                  <div className="card-surface h-full p-6 md:p-10 text-center flex flex-col items-center transition hover:shadow-lg w-full">
                    <h3 className="text-display text-2xl md:text-3xl font-bold">{metric.headline}</h3>
                    <p className="mt-4 text-sm md:text-base text-[var(--color-text-secondary)]">{metric.copy}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Section 3: Workflow Visual */}
        <section id="how-it-works" className="bg-gradient-to-b from-white to-[#f0f4ff] py-24 overflow-hidden">
          <Container>
            <FadeIn className="text-center flex flex-col items-center">
              <h2 className="text-display text-4xl md:text-6xl">How the automation works</h2>
              <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)] text-center mx-auto">
                From booking confirmation to repeat appointments — everything happens automatically.
              </p>
            </FadeIn>
            
            <div className="mt-12 md:mt-20 relative">
              {/* Desktop Connecting Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -translate-y-1/2 hidden lg:block z-0" />
              
              <div className="flex overflow-x-auto pb-8 lg:pb-0 lg:overflow-x-visible lg:grid lg:grid-cols-7 gap-6 relative z-10 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
                {[
                  {
                    title: "Booking Created",
                    desc: "Appointment scheduled in the system",
                    icon: (
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 16l2 2 4-4" />
                      </svg>
                    ),
                    indicator: <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                  },
                  {
                    title: "Confirmation Sent",
                    desc: "Email summary to client",
                    icon: (
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    indicator: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  {
                    title: "24hr Reminder Text",
                    desc: "SMS message sent 1 day prior",
                    icon: (
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        <text x="9" y="13" fontSize="4" fontWeight="bold" fill="currentColor">SMS</text>
                      </svg>
                    ),
                    indicator: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )
                  },
                  {
                    title: "2hr Reminder Text",
                    desc: "Final message before service",
                    icon: (
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 13a2 2 0 100-4 2 2 0 000 4z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 13c2 0 2-2 2-2s-2-2-2-2-2 2-2 2 2 2 2 2z" />
                      </svg>
                    ),
                    indicator: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )
                  },
                  {
                    title: "Appointment Complete",
                    desc: "Service finalized",
                    icon: (
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                    indicator: (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                      </div>
                    )
                  },
                  {
                    title: "Review Request",
                    desc: "Solicit feedback after service",
                    icon: (
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ),
                    indicator: (
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-[10px]">★</span>)}
                      </div>
                    )
                  },
                  {
                    title: "Rebook Reminder",
                    desc: "Gentle prompt for next visit",
                    icon: (
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ),
                    indicator: (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )
                  }
                ].map((step, i) => (
                  <FadeIn key={i} delay={i * 0.1} direction="none">
                    <div className="bg-white border border-blue-50 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center h-full relative hover:shadow-md transition-all group">
                      <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        {step.icon}
                      </div>
                      <h3 className="font-bold text-sm leading-tight mb-2 min-h-[2.5rem] flex items-center">{step.title}</h3>
                      <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed mb-6">{step.desc}</p>
                      <div className="mt-auto pt-4 flex justify-center w-full">
                        {step.indicator}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Section 4: Reminder Automation */}
        <section className="py-24">
          <Container className="grid items-center gap-16 md:grid-cols-2">
            <FadeIn direction="left" className="text-center md:text-left flex flex-col items-center md:items-start">
              <h2 className="text-display text-3xl md:text-5xl leading-tight">Never manually chase appointments again.</h2>
              <p className="mt-6 text-base md:text-lg text-[var(--color-text-secondary)]">
                Confirmation, 24-hour reminders, and 2-hour reminders are automatically delivered through SMS and WhatsApp so clients always know when and where to arrive.
              </p>
              <ul className="mt-8 space-y-4 text-left inline-block">
                {[
                  "Appointment reminders",
                  "Parking links",
                  "Location guidance",
                  "Policy links",
                  "Reduced no-shows",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-xs text-[var(--color-primary)] font-bold shrink-0">✓</span>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn direction="right" className="flex justify-center">
              <div className="relative rotate-3 transform max-w-full md:max-w-none mx-auto md:mx-0">
                <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[40px] bg-[var(--color-primary-soft)]" />
                <Image
                  src="/Images/WhatsApp_conversation_UI_mockup_202605241130.jpeg"
                  alt="WhatsApp Reminder"
                  width={500}
                  height={1000}
                  className="rounded-[40px] shadow-2xl max-w-full h-auto"
                />
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* Section 5: Review Generation */}
        <section className="bg-white py-24">
          <Container className="grid items-center gap-16 md:grid-cols-2">
            <FadeIn direction="left" className="order-2 md:order-1 flex justify-center">
              <div className="relative -rotate-3 transform max-w-full md:max-w-none mx-auto md:mx-0">
                <div className="absolute inset-0 -z-10 -translate-x-4 translate-y-4 rounded-[40px] bg-[var(--color-primary-soft)]" />
                <Image
                  src="/Images/iMessage_Google_review_request_202605241127.jpeg"
                  alt="Review Request"
                  width={500}
                  height={1000}
                  className="rounded-[40px] shadow-2xl max-w-full h-auto"
                />
              </div>
            </FadeIn>
            <FadeIn direction="right" className="order-1 md:order-2 text-center md:text-left flex flex-col items-center md:items-start">
              <h2 className="text-display text-3xl md:text-5xl leading-tight">Generate more 5-star reviews automatically.</h2>
              <p className="mt-6 text-base md:text-lg text-[var(--color-text-secondary)]">
                Send review requests while the appointment experience is still fresh to increase social proof and local visibility.
              </p>
              <ul className="mt-8 space-y-4 text-left inline-block">
                {[
                  "Google review requests",
                  "Incentive offers",
                  "Post-appointment follow-up",
                  "Increased local trust",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-xs text-[var(--color-primary)] font-bold shrink-0">✓</span>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </Container>
        </section>

        {/* Section 6: Testimonials */}
        <section className="bg-[#f8f7f4] py-24">
          <Container>
            <FadeIn className="text-center flex flex-col items-center">
              <h2 className="text-display text-3xl md:text-6xl leading-tight max-w-full">Your clients notice the difference.</h2>
              <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-[var(--color-text-secondary)] text-center">
                Professional communication creates a premium experience clients remember.
              </p>
            </FadeIn>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <FadeIn delay={0.1} className="flex justify-center">
                <div className="card-surface group overflow-hidden p-4 transition-all hover:-translate-y-2 hover:shadow-2xl flex justify-center w-full">
                  <Image
                    src="/Images/Google_review_luxury_hair_salon_202605241133.jpeg"
                    alt="Salon Review"
                    width={800}
                    height={600}
                    className="rounded-2xl w-full h-auto"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="flex justify-center">
                <div className="card-surface group overflow-hidden p-4 transition-all hover:-translate-y-2 hover:shadow-2xl flex justify-center w-full">
                  <Image
                    src="/Images/Customer_discusses_automated_reb…_202605241135.jpeg"
                    alt="Client Experience"
                    width={800}
                    height={600}
                    className="rounded-2xl w-full h-auto"
                  />
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Section 7: Industry Grid */}
        <section id="who-its-for" className="bg-white py-24">
          <Container>
            <FadeIn className="text-center flex flex-col items-center">
              <h2 className="text-display text-3xl md:text-4xl">Built for your industry.</h2>
            </FadeIn>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {industries.map((industry, i) => (
                <FadeIn key={industry} delay={i * 0.05} className="flex justify-center">
                  <div className="card-surface flex h-32 w-full items-center justify-center p-4 text-center text-sm font-semibold transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                    {industry}
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Section 8: Software Integrations */}
        <section className="border-y border-[var(--color-border-soft)] py-16">
          <Container>
            <p className="text-center lg:text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Works With Your Existing Stack</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {logos.map((logo) => (
                <Image
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="h-6 md:h-8 w-auto object-contain transition-all hover:scale-105"
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Section 9: Pricing */}
        <section id="pricing" className="bg-[var(--color-background)] py-32">
          <Container>
            <FadeIn className="text-center mb-16 w-full flex flex-col items-center">
              <h2 className="text-display text-4xl md:text-6xl max-w-4xl leading-tight">
                Simple pricing for salons, barbers <br className="hidden md:block" /> & beauty professionals.
              </h2>
              <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl text-center mx-auto">
                Everything you need to automate your client communication in one simple plan.
              </p>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Monthly Plan */}
              <FadeIn delay={0.1} className="flex justify-center w-full">
                <div className="card-surface max-w-xl w-full p-8 md:p-12 text-center shadow-[var(--shadow-md)] bg-[var(--color-surface)] rounded-[30px]">
                  <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Monthly</p>
                  <div className="mt-6 flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold">£49</span>
                    <span className="text-lg text-[var(--color-text-secondary)]">/mo</span>
                  </div>
                  <ul className="mt-8 space-y-4 text-left mx-auto max-w-[240px]">
                    {["Reminder automations", "Review request flows", "Rebooking sequences", "Onboarding support"].map((item) => (
                      <li key={item} className="flex items-center gap-3 font-medium">
                        <span className="text-[var(--color-primary)] font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => startCheckout(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ID || "")}
                    className="mt-10 w-full rounded-full border-2 border-[var(--color-primary)] py-4 font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition"
                  >
                    Start Monthly
                  </button>
                </div>
              </FadeIn>

              {/* Annual Plan */}
              <FadeIn delay={0.2} className="flex justify-center w-full">
                <div className="card-surface max-w-xl w-full p-8 md:p-12 text-center shadow-[var(--shadow-md)] bg-[var(--color-surface)] rounded-[30px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white text-xs font-bold px-4 py-1 rounded-bl-xl">SAVE 15%</div>
                  <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Annual</p>
                  <div className="mt-6 flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold">£400</span>
                    <span className="text-lg text-[var(--color-text-secondary)]">/yr</span>
                  </div>
                  <ul className="mt-8 space-y-4 text-left mx-auto max-w-[240px]">
                    {["All monthly features", "Priority setup", "Dedicated support", "Save £88 annually"].map((item) => (
                      <li key={item} className="flex items-center gap-3 font-medium">
                        <span className="text-[var(--color-primary)] font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => startCheckout(process.env.NEXT_PUBLIC_STRIPE_ANNUAL_ID || "")}
                    className="mt-10 w-full rounded-full border-2 border-[var(--color-primary)] py-4 font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition"
                  >
                    Get Annual Plan
                  </button>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Section 10: FAQ */}
        <section id="faq" className="bg-white py-24">
          <Container className="max-w-3xl">
            <FadeIn className="text-center flex flex-col items-center">
              <h2 className="text-display text-3xl md:text-4xl">Frequently Asked Questions</h2>
            </FadeIn>
            <div className="mt-12 space-y-4">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="card-surface overflow-hidden">
                    <button
                      className="flex w-full items-center justify-between p-6 text-left font-semibold"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="pr-4">{faq.question}</span>
                      <span className={`transform transition-transform shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="border-t border-[var(--color-border-soft)] p-6 text-[var(--color-text-secondary)] text-sm md:text-base text-left">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Section 11: Final CTA */}
        <section className="bg-gradient-to-t from-[#f0f4ff] to-white py-32">
          <Container>
            <FadeIn className="text-center flex flex-col items-center">
              <h2 className="text-display text-4xl md:text-6xl text-[var(--color-text-primary)]">Operate like a modern premium salon.</h2>
              <p className="mx-auto mt-8 max-w-2xl text-xl text-[var(--color-text-secondary)] text-center">
                Automate client communication, reduce no-shows, and keep your calendar consistently full.
              </p>

              <button
                onClick={() => startCheckout(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ID || "")}
                disabled={isCheckingOut}
                className="mt-12 rounded-full bg-[var(--color-primary)] px-10 py-5 text-xl font-bold text-white shadow-[var(--shadow-md)] transition hover:scale-105 active:scale-95 disabled:opacity-70"
              >
                Start My Automation Setup
              </button>
            </FadeIn>
          </Container>
        </section>
      </main>

      <footer className="bg-white border-t border-[var(--color-border-soft)] py-20">
        <Container className="grid gap-12 md:grid-cols-4 text-center">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold">BookMore</h3>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-[240px] mx-auto">
              Premium automation for local service businesses.
            </p>
          </div>
          <div>
            <h4 className="font-bold">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li><a href="#how-it-works" className="hover:text-[var(--color-primary)] transition">How it works</a></li>
              <li><a href="#who-its-for" className="hover:text-[var(--color-primary)] transition">Who it's for</a></li>
              <li><a href="#pricing" className="hover:text-[var(--color-primary)] transition">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>hello@bookmore.io</li>
              <li>Support</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>© {new Date().getFullYear()} BookMore</li>
            </ul>
          </div>
        </Container>
      </footer>
    </div>
  );
}
