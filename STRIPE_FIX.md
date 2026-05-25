# Stripe Integration Fix: Resolving "Resource Missing" Errors

The `502 Bad Gateway` error when clicking "Start Now" or "Get Annual Plan" is caused by a **Stripe environment mode mismatch**. Stripe API keys and Price IDs are specific to either "Test Mode" or "Live Mode" and are not interchangeable.

## The Root Cause
The error `No such price: 'price_...'` indicates that your backend successfully authenticated with Stripe, but the Price ID provided does not exist within the account environment corresponding to your `STRIPE_SECRET_KEY`.

## Required Fix (Switch to Test Mode)

To resolve this and ensure safe development, follow these steps precisely:

### 1. Toggle Stripe Dashboard to Test Mode
1.  Log in to the [Stripe Dashboard](https://dashboard.stripe.com/products).
2.  Locate the toggle in the top-right corner and switch it to **"Test mode"**.

### 2. Update API Keys
1.  Navigate to **Developers > API keys**.
2.  Copy your **Test** Secret Key (`sk_test_...`).
3.  Update your `.env` file:
    ```bash
    STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY_HERE
    ```

### 3. Update Price IDs
1.  While still in **Test mode**, go to **Products**.
2.  Select your Monthly and Annual products.
3.  Copy the **API ID** (e.g., `price_1...`) shown for each price.
4.  Update your `.env` file:
    ```bash
    NEXT_PUBLIC_STRIPE_MONTHLY_ID=price_test_MONTHLY_ID
    NEXT_PUBLIC_STRIPE_ANNUAL_ID=price_test_ANNUAL_ID
    ```

### 4. Apply Changes
1.  **Crucial:** Stop your local development server (`Ctrl+C`).
2.  Start the development server again: `npm run dev`.
    *   *Next.js requires a full restart to load updated environment variables.*

## Verification Checklist
- [ ] `.env` uses `sk_test_...` and `price_test_...` IDs.
- [ ] No trailing spaces exist in the `.env` values.
- [ ] The development server was fully restarted after saving `.env`.
- [ ] Clicking the checkout button now redirects to the Stripe test checkout page.
