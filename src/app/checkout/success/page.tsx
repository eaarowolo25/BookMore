import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="container-shell">
        <div className="card-surface mx-auto max-w-2xl rounded-[30px] p-8 text-center md:p-10">
          <p className="text-sm uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Payment Received</p>
          <h1 className="mt-3 text-display text-4xl md:text-5xl">You are in. Setup starts now.</h1>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Your subscription is active. Please schedule your onboarding call with us to get your automation flows live.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/checkout/implementation" className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition hover:bg-[var(--color-primary-hover)]">
              Schedule My Implementation Call
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
