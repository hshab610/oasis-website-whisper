
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function for logging
const logEvent = (event: string, details?: any) => {
  console.log(`[DEPOSIT-MANAGE] ${event}${details ? ` | ${JSON.stringify(details)}` : ''}`);
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
    // Verify admin authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Authorization header is required");

    const token = authHeader.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !authData.user) {
      throw new Error("Authentication failed");
    }
    
    // Check if user is an admin
    const { data: isAdmin } = await supabase.rpc('is_admin', { user_id: authData.user.id });
    if (!isAdmin) {
      throw new Error("Admin privileges required");
    }
    
    // Process the request
    const body = await req.json();
    const { action, depositId, adminOverride, reason } = body;
    
    if (!action || !depositId) {
      throw new Error("Action and depositId are required");
    }
    
    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Perform the requested action
    switch (action) {
      case "refund":
        return await handleRefund(depositId, adminOverride, reason, stripe, supabase);
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    logEvent("Error in deposit-manage", { error: error.message });
    
    return new Response(JSON.stringify({ 
      error: error.message,
      code: error.code || 'unknown_error' 
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function handleRefund(
  depositId: string, 
  adminOverride: boolean, 
  reason: string,
  stripe: Stripe,
  supabase: any
) {
  logEvent("Processing refund request", { depositId, adminOverride });
  
  // Get deposit details
  const { data: deposit, error } = await supabase
    .from('booking_deposits')
    .select('*')
    .eq('id', depositId)
    .single();
  
  if (error || !deposit) {
    throw new Error(`Deposit not found: ${error?.message || 'Unknown error'}`);
  }
  
  // Verify deposit status
  if (deposit.status !== 'paid') {
    throw new Error(`Cannot refund deposit with status: ${deposit.status}`);
  }
  
  // Check refund deadline if not admin override
  if (!adminOverride) {
    const now = new Date();
    const refundDeadline = new Date(deposit.refund_deadline);
    
    if (now > refundDeadline) {
      throw new Error("Refund deadline has passed. Admin override required.");
    }
  }
  
  // Get payment details
  const paymentId = deposit.stripe_payment_id;
  if (!paymentId) {
    throw new Error("No payment ID associated with this deposit");
  }
  
  try {
    // Process the refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
      reason: 'requested_by_customer'
    });
    
    logEvent("Refund created", { refundId: refund.id });
    
    // Update deposit status
    await supabase
      .from('booking_deposits')
      .update({
        status: 'refunded',
        refund_date: new Date().toISOString(),
        refund_id: refund.id,
        admin_override: adminOverride,
      })
      .eq('id', depositId);
    
    // Update booking status
    await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        deposit_paid: false
      })
      .eq('id', deposit.booking_id);
    
    logEvent("Refund processed successfully", { depositId, refundId: refund.id });
    
    return new Response(JSON.stringify({ 
      success: true,
      refundId: refund.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
    
  } catch (stripeError: any) {
    logEvent("Stripe refund error", { error: stripeError.message });
    throw new Error(`Refund processing failed: ${stripeError.message}`);
  }
}
