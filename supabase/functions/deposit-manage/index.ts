
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
    // Parse request body
    const { action, bookingId, paymentIntentId, adminKey } = await req.json();
    
    // Validate inputs
    if (!action) throw new Error("Action is required");
    if (!bookingId) throw new Error("Booking ID is required");
    
    // Admin actions require authorization
    const isAdminAction = ["override_refund", "cancel_booking"].includes(action);
    if (isAdminAction && (!adminKey || adminKey !== Deno.env.get("ADMIN_SECRET_KEY"))) {
      throw new Error("Unauthorized admin action");
    }
    
    // Retrieve booking deposit info from Supabase
    const { data: depositData, error: depositError } = await supabase
      .from('booking_deposits')
      .select('*')
      .eq('booking_id', bookingId)
      .single();
      
    if (depositError || !depositData) {
      throw new Error(`Deposit information not found for booking ID: ${bookingId}`);
    }
    
    // Get refund status
    const refundDeadline = new Date(depositData.refund_deadline);
    const now = new Date();
    const isRefundable = now < refundDeadline || action === "override_refund";
    
    // Process based on action
    switch (action) {
      case "check_status":
        return new Response(JSON.stringify({
          bookingId,
          depositStatus: depositData.status,
          moveDate: depositData.move_date,
          refundDeadline: depositData.refund_deadline,
          isRefundable,
          timeRemaining: Math.max(0, refundDeadline.getTime() - now.getTime())
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
        
      case "request_refund":
      case "override_refund":
        // Check refund eligibility (unless admin override)
        if (!isRefundable && action !== "override_refund") {
          return new Response(JSON.stringify({
            error: "Refund deadline has passed",
            code: "refund_deadline_passed"
          }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        
        // Find the payment intent if not provided
        let paymentId = paymentIntentId;
        if (!paymentId) {
          // Retrieve from Stripe using session ID
          const session = await stripe.checkout.sessions.retrieve(depositData.stripe_session_id);
          paymentId = session.payment_intent as string;
        }
        
        // Process refund through Stripe
        const refund = await stripe.refunds.create({
          payment_intent: paymentId,
          reason: action === "override_refund" ? "requested_by_customer" : "duplicate"
        });
        
        // Update deposit status in Supabase
        await supabase
          .from('booking_deposits')
          .update({
            status: 'refunded',
            refund_date: new Date().toISOString(),
            refund_id: refund.id,
            admin_override: action === "override_refund"
          })
          .eq('booking_id', bookingId);
        
        // Update booking status
        await supabase
          .from('bookings')
          .update({
            status: 'cancelled'
          })
          .eq('id', bookingId);
        
        return new Response(JSON.stringify({
          success: true,
          refundId: refund.id,
          message: "Refund processed successfully"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
        
      case "cancel_booking":
        // Admin-only action to cancel booking without refund
        await supabase
          .from('booking_deposits')
          .update({
            status: 'cancelled',
            cancel_date: new Date().toISOString(),
            admin_override: true
          })
          .eq('booking_id', bookingId);
          
        // Update booking status
        await supabase
          .from('bookings')
          .update({
            status: 'cancelled'
          })
          .eq('id', bookingId);
        
        return new Response(JSON.stringify({
          success: true,
          message: "Booking cancelled successfully"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
          
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    logEvent("Error processing deposit action", { error: error.message, stack: error.stack });
    
    return new Response(JSON.stringify({ 
      error: error.message,
      code: error.code || 'unknown_error' 
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
