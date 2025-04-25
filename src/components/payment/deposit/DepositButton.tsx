
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LockIcon, Loader } from "lucide-react";
import { useDepositPayment } from "@/hooks/use-deposit-payment";
import DepositTermsDialog from "./DepositTermsDialog";

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
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Calculate refund deadline (48 hours before move)
  const moveDateTime = new Date(moveDate);
  const refundDeadline = new Date(moveDateTime);
  refundDeadline.setHours(refundDeadline.getHours() - 48);
  
  const { loading, error, processPayment } = useDepositPayment({
    email,
    name,
    bookingId,
    moveDate,
    phone,
    address,
    onSuccess,
    onError,
  });

  const handlePay = () => {
    setShowTerms(true);
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

      <DepositTermsDialog
        open={showTerms}
        onOpenChange={setShowTerms}
        loading={loading}
        termsAccepted={termsAccepted}
        setTermsAccepted={setTermsAccepted}
        moveDateTime={moveDateTime}
        refundDeadline={refundDeadline}
        onConfirm={processPayment}
      />
    </div>
  );
};

export default DepositButton;
