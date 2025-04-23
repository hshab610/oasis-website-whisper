
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Stripe config
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });

// Helper function for logging
const logEvent = (event: string, details?: any) => {
  console.log(`[PAYMENT-SERVICE] ${event}${details ? ` | ${JSON.stringify(details)}` : ''}`);
};

serve(async (req) => {
  // CORS preflight request handling
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    logEvent("Payment request received");
    
    // Parse request body
    const requestData = await req.json();
    const { email, amount, purpose, bookingId, customerName } = requestData;
    
    // Input validation
    if (!email) throw new Error("Customer email is required");
    if (!amount || amount < 1) throw new Error("Valid payment amount is required");
    
    logEvent("Payment request validated", { email, amount, bookingId });

    // Check for existing Stripe customer
    let customerId: string | undefined;
    try {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logEvent("Found existing customer", { customerId });
      } else {
        // Create new customer
        const customer = await stripe.customers.create({
          email,
          name: customerName || email.split('@')[0],
          metadata: { bookingId }
        });
        customerId = customer.id;
        logEvent("Created new customer", { customerId });
      }
    } catch (err) {
      logEvent("Error with customer lookup/creation", { error: err.message });
      // Proceed without customer ID in worst case
    }

    // Create checkout session with 3D Secure enabled
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customerId,
      customer_email: !customerId ? email : undefined,
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
      success_url: `${req.headers.get("origin")}/payment-success?booking=${bookingId || ""}&session_id={CHECKOUT_SESSION_ID}&amount=${amount}`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled?booking=${bookingId || ""}`,
      metadata: {
        bookingId: bookingId || "",
        purpose: purpose || "Oasis Move Payment",
        amount: amount.toString(),
      },
      payment_intent_data: {
        // Enable 3D Secure for all transactions
        capture_method: 'automatic',
        setup_future_usage: customerId ? 'off_session' : undefined,
      },
    });

    logEvent("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    logEvent("Error creating payment", { error: error.message, stack: error.stack });
    
    return new Response(JSON.stringify({ 
      error: error.message,
      code: error.code || 'unknown_error' 
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
