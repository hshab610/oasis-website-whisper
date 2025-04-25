
import React from "react";
import StripePaymentButton from "./StripePaymentButton";
import DepositButton from "./deposit/DepositButton";

interface PaymentSectionProps {
  email: string;
  name: string;
  bookingId: string;
  moveDate: string;
  phone?: string;
  address?: string;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  email,
  name,
  bookingId,
  moveDate,
  phone,
  address
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <DepositButton
        email={email}
        name={name}
        bookingId={bookingId}
        moveDate={moveDate}
        phone={phone}
        address={address}
        onSuccess={() => {
          console.log("Deposit payment successful!");
        }}
        onError={(err) => {
          console.error("Deposit payment error:", err);
        }}
      />
      
      {/* <StripePaymentButton
        email={email}
        amount={10000} // $100 in cents
        purpose="Oasis Move Deposit"
        bookingId={bookingId}
        onSuccess={() => {
          console.log("Stripe payment successful!");
        }}
        onError={(err) => {
          console.error("Stripe payment error:", err);
        }}
      /> */}
    </div>
  );
};

export default PaymentSection;
