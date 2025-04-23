
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface StripePaymentButtonProps {
  email: string;
  amount: number; // in cents
  purpose?: string;
  bookingId?: string;
}

const StripePaymentButton: React.FC<StripePaymentButtonProps> = ({
  email,
  amount,
  purpose,
  bookingId,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
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
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Stripe session error");
      }
    } catch (err: any) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
        disabled={loading}
        onClick={handlePay}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
      {error && (
        <span className="text-red-600 mt-2 text-sm">{error}</span>
      )}
    </div>
  );
};

export default StripePaymentButton;
