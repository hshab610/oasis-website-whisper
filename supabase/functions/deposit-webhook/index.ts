
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Stripe config
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

// Helper function for logging
const logEvent = (event: string, details?: any) => {
  console.log(`[DEPOSIT-WEBHOOK] ${event}${details ? ` | ${JSON.stringify(details)}` : ''}`);
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
    const signature = req.headers.get("stripe-signature");
    const payload = await req.text();
    
    if (!signature) {
      throw new Error("Missing Stripe signature");
    }
    
    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    } catch (err) {
      logEvent("Webhook signature verification failed", { error: err.message });
      return new Response(JSON.stringify({ error: "Webhook signature verification failed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    logEvent("Webhook received", { type: event.type });
    
    // Process event based on type
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object, supabase);
        break;
        
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object, supabase);
        break;
        
      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object, supabase);
        break;
        
      case "charge.refunded":
        await handleRefund(event.data.object, supabase);
        break;
    }
    
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    logEvent("Error processing webhook", { error: error.message, stack: error.stack });
    
    return new Response(JSON.stringify({ 
      error: error.message,
      code: error.code || 'unknown_error' 
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

// Handler functions
async function handleCheckoutCompleted(session: any, supabase: any) {
  logEvent("Processing checkout completion", { session_id: session.id });
  
  // Only process deposit payments
  if (!session.metadata?.depositType || session.metadata.depositType !== "movingDeposit") {
    return;
  }
  
  // Update deposit status in database
  const bookingId = session.metadata.bookingId;
  if (!bookingId) return;
  
  try {
    // Update deposit record
    await supabase
      .from('booking_deposits')
      .update({
        status: 'paid',
        payment_date: new Date().toISOString(),
        stripe_payment_id: session.payment_intent
      })
      .eq('booking_id', bookingId)
      .eq('stripe_session_id', session.id);
      
    // Update booking record
    await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        deposit_paid: true
      })
      .eq('id', bookingId);
      
    logEvent("Deposit payment recorded successfully", { bookingId });
    
    // TODO: Send confirmation email/SMS here
  } catch (err) {
    logEvent("Error updating deposit status", { error: err.message, bookingId });
  }
}

async function handlePaymentSucceeded(paymentIntent: any, supabase: any) {
  // Only relevant for deposit payments
  if (!paymentIntent.metadata?.depositType || paymentIntent.metadata.depositType !== "movingDeposit") {
    return;
  }
  
  const bookingId = paymentIntent.metadata.bookingId;
  if (!bookingId) return;
  
  logEvent("Payment succeeded", { paymentIntentId: paymentIntent.id, bookingId });
  
  // Update payment details
  try {
    await supabase
      .from('booking_deposits')
      .update({
        payment_method: paymentIntent.payment_method_types?.[0] || 'card',
        payment_status: 'succeeded'
      })
      .eq('booking_id', bookingId);
  } catch (err) {
    logEvent("Error updating payment details", { error: err.message, bookingId });
  }
}

async function handlePaymentFailed(paymentIntent: any, supabase: any) {
  // Only relevant for deposit payments
  if (!paymentIntent.metadata?.depositType || paymentIntent.metadata.depositType !== "movingDeposit") {
    return;
  }
  
  const bookingId = paymentIntent.metadata.bookingId;
  if (!bookingId) return;
  
  logEvent("Payment failed", { paymentIntentId: paymentIntent.id, bookingId });
  
  try {
    await supabase
      .from('booking_deposits')
      .update({
        status: 'failed',
        payment_status: 'failed',
        failure_reason: paymentIntent.last_payment_error?.message || 'Payment failed'
      })
      .eq('booking_id', bookingId);
  } catch (err) {
    logEvent("Error updating failed payment", { error: err.message, bookingId });
  }
}

async function handleRefund(charge: any, supabase: any) {
  // Find the corresponding payment intent
  const paymentIntentId = charge.payment_intent;
  if (!paymentIntentId) return;
  
  try {
    // Get the payment intent to access metadata
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    // Only relevant for deposit payments
    if (!paymentIntent.metadata?.depositType || paymentIntent.metadata.depositType !== "movingDeposit") {
      return;
    }
    
    const bookingId = paymentIntent.metadata.bookingId;
    if (!bookingId) return;
    
    logEvent("Refund processed", { chargeId: charge.id, bookingId });
    
    // Update refund status
    await supabase
      .from('booking_deposits')
      .update({
        status: 'refunded',
        refund_date: new Date().toISOString()
      })
      .eq('booking_id', bookingId);
      
    // Update booking status
    await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        deposit_paid: false
      })
      .eq('id', bookingId);
  } catch (err) {
    logEvent("Error processing refund webhook", { error: err.message });
  }
}
