# BookMore Design Document

## 1. Project Overview
BookMore is an automation platform designed for local service businesses (salons, clinics, barbershops) to reduce no-shows and increase repeat revenue through automated client communication.

### Core Value Proposition
- **Retention:** Bring clients back before they churn.
- **Efficiency:** Reduce manual admin tasks.
- **Reliability:** Ensure every client receives professional follow-up.

---

## 2. Design Principles
- **Clarity:** Information should be easy to digest at a glance.
- **Trust:** The aesthetic should feel professional, modern, and reliable.
- **Minimalism:** Remove friction from the onboarding process.
- **Polished Motion:** Use subtle animations to guide the user's focus.

---

## 3. Visual Identity

### Typography
- **Display Font:** `Playfair Display` (Serif) - Used for headings to provide a premium, clinic-like feel.
- **UI Font:** `Inter` (Sans-serif) - Used for body text and functional elements for high legibility.

### Color Palette
| Token | Value | Usage |
| :--- | :--- | :--- |
| `Background` | `#f8f7f4` | Page backgrounds (soft, off-white) |
| `Surface` | `#ffffff` | Cards and containers |
| `Primary` | `#0b5fff` | Call-to-action buttons, active states |
| `Text Primary` | `#111014` | Main headings and body text |
| `Text Secondary`| `#4a4a56` | Subheadings and descriptions |
| `Border Soft` | `#ebe8e1` | Low-contrast separators |

### Layout & Spacing
- **Grid:** Responsive shell with a maximum width of `1200px`.
- **Radius:** Large border radii (`24px` to `30px`) for a soft, modern feel.
- **Shadows:** Deep, soft shadows for depth (`var(--shadow-md)`).

---

## 4. Technical Architecture

### Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (v4) with CSS Variables for theme management.
- **Animation:** Framer Motion for scroll-triggered reveals and transitions.
- **Language:** TypeScript.

### Backend/APIs
- **Checkout:** Stripe Integration via Next.js API Routes (`/api/checkout`).
- **Data Flow:** Serverless functions for processing payments and onboarding.

---

## 5. Key Features & Flows
1. **Landing Page:** Educational flow detailing the "Outcome-based" benefits (Fewer no-shows, repeat bookings).
2. **Pricing:** Single-plan model (£49/month) to simplify decision-making.
3. **Checkout Flow:** Direct transition from landing/pricing to Stripe Checkout to maximize conversion.
4. **Integration Focus:** Visual cues showing compatibility with existing stacks (Acuity, Booksy, Twilio, Stripe).

---

## 6. Future Roadmap
- **Dashboard:** Client-facing portal to manage message templates and timing.
- **Analytics:** Visualizing "Revenue Recovered" from rebooking campaigns.
- **Multi-channel:** WhatsApp integration alongside SMS and Email.
