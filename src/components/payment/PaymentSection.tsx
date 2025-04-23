
import React, { useState } from "react";
import StripePaymentButton from "./StripePaymentButton";
import UpsellModal from "./UpsellModal";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface PaymentSectionProps {
  email: string;
  bookingId?: string;
  depositAmount: number; // in cents
  totalAmount: number; // in cents
  onPaymentComplete?: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  email,
  bookingId,
  depositAmount,
  totalAmount,
  onPaymentComplete,
}) => {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'deposit-paid' | 'fully-paid'>('pending');
  const [showUpsell, setShowUpsell] = useState(false);
  
  const balanceDue = totalAmount - depositAmount;
  const discountPercent = 10; // 10% discount for paying full amount
  
  const handleDepositSuccess = () => {
    setPaymentStatus('deposit-paid');
    setShowUpsell(true);
  };
  
  const handleUpsellAccept = () => {
    setShowUpsell(false);
    // This will be handled by redirect to Stripe and then the success page
  };
  
  const handleUpsellDecline = () => {
    setShowUpsell(false);
    if (onPaymentComplete) onPaymentComplete();
  };
  
  const handleFullPayment = () => {
    // Will be handled via redirect
  };

  if (paymentStatus === 'fully-paid') {
    return (
      <div className="p-6 border border-green-200 bg-green-50 rounded-lg text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
        <h3 className="text-xl font-semibold text-green-700">Payment Complete</h3>
        <p className="text-green-600 mt-1">
          Thank you for your payment. Your booking is confirmed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6 bg-card">
        <h3 className="text-xl font-semibold mb-4">Secure Your Booking</h3>
        
        {paymentStatus === 'pending' ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="font-medium">Booking Deposit</p>
                <p className="text-sm text-muted-foreground">
                  Secures your moving date
                </p>
              </div>
              <Badge variant="secondary" className="text-primary">
                Required
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              A deposit of ${(depositAmount / 100).toFixed(2)} is required to confirm your booking. 
              The remaining ${(balanceDue / 100).toFixed(2)} will be due on the day of service.
            </p>
            
            <StripePaymentButton 
              email={email}
              amount={depositAmount}
              purpose="Oasis Moving - Booking Deposit"
              bookingId={bookingId}
              onSuccess={handleDepositSuccess}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center text-green-600 mb-4">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              <span className="font-medium">Deposit Paid Successfully</span>
            </div>
            
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="font-medium">Remaining Balance</p>
                <p className="text-sm text-muted-foreground">
                  Due on moving day
                </p>
              </div>
              <Badge variant="outline" className="text-muted-foreground">
                Optional
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              You can pay your remaining balance of ${(balanceDue / 100).toFixed(2)} now or on the day of service.
            </p>
            
            <StripePaymentButton 
              email={email}
              amount={balanceDue}
              purpose="Oasis Moving - Remaining Balance"
              bookingId={bookingId}
              onSuccess={handleFullPayment}
            />
          </div>
        )}
      </div>
      
      {showUpsell && (
        <UpsellModal
          onAccept={handleUpsellAccept}
          onDecline={handleUpsellDecline}
          balanceDue={balanceDue}
          discount={discountPercent}
        />
      )}
    </div>
  );
};

export default PaymentSection;
