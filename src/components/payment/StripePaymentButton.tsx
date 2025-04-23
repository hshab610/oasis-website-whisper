
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LockIcon, CreditCard, Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface StripePaymentButtonProps {
  email: string;
  amount: number; // in cents
  purpose?: string;
  bookingId?: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (err: string) => void;
}

const StripePaymentButton: React.FC<StripePaymentButtonProps> = ({
  email,
  amount,
  purpose,
  bookingId,
  className = "",
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);

  const handlePay = async () => {
    if (loading) return;
    
    setLoading(true);
    setError("");
    
    try {
      // Create the checkout session
      const resp = await fetch("/functions/v1/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount,
          purpose: purpose || "Oasis Move Payment",
          bookingId,
        }),
      });
      
      const data = await resp.json();
      
      if (!resp.ok) {
        throw new Error(data.error || "Payment session creation failed");
      }
      
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
        if (onSuccess) onSuccess();
      } else {
        throw new Error("Invalid response from payment service");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      const errorMessage = err.message || "Payment failed. Please try again.";
      setError(errorMessage);
      
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      if (onError) onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-lg py-3 h-auto min-h-[48px] transform active:scale-[0.98] transition-transform"
        disabled={loading}
        onClick={handlePay}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Pay {formattedAmount}
          </div>
        )}
      </Button>
      
      {error && (
        <div className="text-red-600 mt-4 text-sm p-3 bg-red-50 rounded-md w-full">
          {error}
        </div>
      )}
      
      <div className="flex items-center mt-3 text-xs text-muted-foreground">
        <LockIcon className="h-3 w-3 mr-1" />
        <span className="leading-relaxed">Secure checkout powered by Stripe</span>
      </div>
    </div>
  );
};

export default StripePaymentButton;
