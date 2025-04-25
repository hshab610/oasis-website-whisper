
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LockIcon, CreditCard, Loader, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import CountdownTimer from "@/components/promotion/CountdownTimer";

interface DepositButtonProps {
  email: string;
  name: string;
  bookingId: string;
  moveDate: string;
  phone?: string;
  address?: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (err: string) => void;
}

const DepositButton: React.FC<DepositButtonProps> = ({
  email,
  name,
  bookingId,
  moveDate,
  phone,
  address,
  className = "",
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const isMobile = useIsMobile();
  
  // Calculate refund deadline (48 hours before move)
  const moveDateTime = new Date(moveDate);
  const refundDeadline = new Date(moveDateTime);
  refundDeadline.setHours(refundDeadline.getHours() - 48);
  
  // Format deadline for display
  const formatDeadline = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const handlePay = async () => {
    setShowTerms(true);
  };
  
  const processPayment = async () => {
    if (loading) return;
    
    setLoading(true);
    setError("");
    
    try {
      // Create the deposit payment
      const resp = await fetch("/functions/v1/deposit-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          bookingId,
          moveDate,
          phone,
          address
        }),
      });
      
      const data = await resp.json();
      
      if (!resp.ok) {
        throw new Error(data.error || "Deposit payment creation failed");
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
            <LockIcon className="mr-2 h-5 w-5" />
            Secure My Move Date
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
        <span className="leading-relaxed">$100 fully refundable deposit (48-hour policy applies)</span>
      </div>
      
      {/* Terms Dialog */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit Payment Terms</DialogTitle>
            <DialogDescription>
              Please review and confirm our deposit refund policy
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h3 className="text-amber-800 font-medium">48-Hour Refund Policy</h3>
              </div>
              <p className="text-amber-800 text-sm">
                Your $100 deposit is <strong>fully refundable</strong> if cancelled more than 48 hours before your scheduled move.
              </p>
              <div className="mt-3 bg-white bg-opacity-70 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Your move is scheduled for:</p>
                <p className="font-medium text-gray-700">{formatDeadline(moveDateTime)}</p>
                
                <div className="h-px bg-gray-200 my-3" />
                
                <p className="text-xs text-gray-500 mb-1">Refund deadline:</p>
                <p className="font-bold text-red-600">{formatDeadline(refundDeadline)}</p>
                
                <div className="mt-2 p-2 bg-red-50 rounded border border-red-100 flex flex-col items-center">
                  <p className="text-xs text-red-700 mb-1">Time remaining until non-refundable:</p>
                  <CountdownTimer 
                    timeRemaining={Math.max(0, refundDeadline.getTime() - Date.now()) / 1000} 
                    className="text-red-600 font-bold"
                    showIcon={false}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted} 
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} 
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-700 leading-tight cursor-pointer">
                I agree that my deposit becomes non-refundable within 48 hours of my scheduled move date. I understand this policy is in place to reserve crew and truck resources.
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowTerms(false)}
              className="sm:mr-2"
            >
              Cancel
            </Button>
            <Button 
              disabled={!termsAccepted || loading} 
              onClick={processPayment}
              className="bg-primary"
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay $100 Deposit
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepositButton;
