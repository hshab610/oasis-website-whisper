
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Stripe config — uses secret from project secrets
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });

// Always check POST body: { email: string, amount: number, purpose: string }
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { email, amount, purpose, bookingId } = await req.json();
    if (!email || !amount || amount < 1) throw new Error("Invalid payment data");

    // Create checkout session (USD, one-off)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount, // cents
            product_data: {
              name: purpose || "Oasis Move Payment",
            },
          },
          quantity: 1,
        }
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?booking=${bookingId || ""}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled?booking=${bookingId || ""}`,
      metadata: bookingId ? { bookingId } : {},
    });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
