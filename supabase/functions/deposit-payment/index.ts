
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Stripe config
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });

// Helper function for logging
const logEvent = (event: string, details?: any) => {
  console.log(`[DEPOSIT-SERVICE] ${event}${details ? ` | ${JSON.stringify(details)}` : ''}`);
};

serve(async (req) => {
  // CORS preflight request handling
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Initialize Supabase client
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    logEvent("Deposit request received");
    
    // Parse request body
    const requestData = await req.json();
    const { email, name, bookingId, moveDate, phone, address } = requestData;
    
    // Input validation
    if (!email) throw new Error("Customer email is required");
    if (!bookingId) throw new Error("Booking ID is required");
    if (!moveDate) throw new Error("Move date is required");
    
    // Calculate refund deadline (48 hours before move)
    const moveDateObj = new Date(moveDate);
    const refundDeadline = new Date(moveDateObj);
    refundDeadline.setHours(refundDeadline.getHours() - 48);
    
    // Set fixed deposit amount ($100)
    const depositAmount = 10000; // $100 in cents
    
    logEvent("Deposit request validated", { email, bookingId, moveDate, refundDeadline });

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
          name: name || email.split('@')[0],
          phone,
          metadata: { 
            bookingId,
            moveDate: moveDate.toString(),
            refundDeadline: refundDeadline.toISOString(),
            address
          }
        });
        customerId = customer.id;
        logEvent("Created new customer", { customerId });
      }
    } catch (err) {
      logEvent("Error with customer lookup/creation", { error: err.message });
      // Proceed without customer ID in worst case
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customerId,
      customer_email: !customerId ? email : undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: depositAmount,
            product_data: {
              name: "Oasis Moving - $100 Deposit",
              description: "Secures your moving date reservation",
            },
          },
          quantity: 1,
        }
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?booking=${bookingId}&session_id={CHECKOUT_SESSION_ID}&deposit=true&deadline=${encodeURIComponent(refundDeadline.toISOString())}`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled?booking=${bookingId}`,
      metadata: {
        bookingId,
        depositType: "movingDeposit",
        moveDate: moveDate.toString(),
        refundDeadline: refundDeadline.toISOString(),
        isRefundable: "true"
      },
      payment_intent_data: {
        metadata: {
          bookingId,
          depositType: "movingDeposit",
          moveDate: moveDate.toString(),
          refundDeadline: refundDeadline.toISOString(),
          isRefundable: "true"
        }
      },
    });

    logEvent("Deposit session created", { sessionId: session.id });

    // Store booking deposit info in Supabase
    try {
      const { error } = await supabase
        .from('booking_deposits')
        .insert({
          booking_id: bookingId,
          stripe_session_id: session.id,
          amount: depositAmount,
          move_date: moveDate,
          refund_deadline: refundDeadline.toISOString(),
          status: 'pending',
          customer_email: email,
          customer_name: name || null,
          customer_phone: phone || null,
          address: address || null
        });
        
      if (error) {
        logEvent("Error storing deposit info", { error: error.message });
      } else {
        logEvent("Deposit info stored successfully");
      }
    } catch (err) {
      logEvent("Exception storing deposit info", { error: err.message });
      // Continue even if storage fails - we have the info in Stripe
    }

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id, refundDeadline: refundDeadline.toISOString() }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    logEvent("Error creating deposit payment", { error: error.message, stack: error.stack });
    
    return new Response(JSON.stringify({ 
      error: error.message,
      code: error.code || 'unknown_error' 
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
