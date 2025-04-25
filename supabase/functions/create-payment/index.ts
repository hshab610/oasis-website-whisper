
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function for logging
const logEvent = (event: string, details?: any) => {
  console.log(`[CREATE-PAYMENT] ${event}${details ? ` | ${JSON.stringify(details)}` : ''}`);
};

serve(async (req) => {
  // CORS preflight request handling
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const body = await req.json();
    const { email, amount, purpose, bookingId, tipDetails } = body;
    
    if (!email) {
      throw new Error("Customer email is required");
    }
    
    if (!amount || amount < 0) {
      throw new Error("Valid payment amount is required");
    }
    
    logEvent("Processing payment request", { email, amount, bookingId });
    
    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if a Stripe customer record exists for this user
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logEvent("Found existing customer", { customerId });
    } else {
      // Create a new customer
      const customer = await stripe.customers.create({ email });
      customerId = customer.id;
      logEvent("Created new customer", { customerId });
    }
    
    // Create metadata
    const metadata: any = {
      paymentType: "moveBalance",
    };
    
    if (bookingId) {
      metadata.bookingId = bookingId;
    }
    
    if (tipDetails) {
      metadata.tipAmount = tipDetails.amount;
      metadata.crewSize = tipDetails.crewSize;
      metadata.tipSplitMode = tipDetails.splitMode;
    }
    
    // Create a payment session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: purpose || "Moving Service Payment",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?amount=${amount}`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled`,
      metadata,
    });
    
    logEvent("Created payment session", { sessionId: session.id });
    
    // Return the session URL
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    logEvent("Error processing payment", { error: error.message, stack: error.stack });
    
    return new Response(JSON.stringify({ 
      error: error.message,
      code: error.code || 'unknown_error' 
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
