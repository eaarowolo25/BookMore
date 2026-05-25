"use client";

import { InlineWidget } from "react-calendly";
import { Container } from "@/app/page"; // Assuming shared container component structure

export default function ImplementationPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] py-20">
      <div className="container-shell mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Payment Received!</h1>
        <p className="text-xl text-[var(--color-text-secondary)] mb-12">
          Thank you for choosing BookMore. We&apos;re excited to automate your client communication.
          To get started with your implementation, please book a call with our team.
        </p>
        
        <div className="card-surface p-8">
          <h2 className="text-2xl font-bold mb-6">Schedule Your Setup Call</h2>
          <InlineWidget url="https://calendly.com/usebookmore/30min" />
        </div>
      </div>
    </div>
  );
}
