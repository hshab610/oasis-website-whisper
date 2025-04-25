
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface UseDepositPaymentProps {
  email: string;
  name: string;
  bookingId: string;
  moveDate: string;
  phone?: string;
  address?: string;
  onSuccess?: () => void;
  onError?: (err: string) => void;
}

export const useDepositPayment = ({
  email,
  name,
  bookingId,
  moveDate,
  phone,
  address,
  onSuccess,
  onError,
}: UseDepositPaymentProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const processPayment = async () => {
    if (loading) return;
    
    setLoading(true);
    setError("");
    
    try {
      const endpoint = import.meta.env.VITE_SUPABASE_URL 
        ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/deposit-payment` 
        : "/functions/v1/deposit-payment";
      
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(import.meta.env.VITE_SUPABASE_ANON_KEY && {
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          })
        },
        body: JSON.stringify({
          email,
          name,
          bookingId,
          moveDate,
          phone,
          address
        }),
      });
      
      const contentType = resp.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server. Please try again later.");
      }
      
      const data = await resp.json();
      
      if (!resp.ok) {
        throw new Error(data.error || "Deposit payment creation failed");
      }
      
      if (data?.url) {
        console.log("Payment session created successfully", { sessionId: data.sessionId });
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

  return {
    loading,
    error,
    processPayment
  };
};
