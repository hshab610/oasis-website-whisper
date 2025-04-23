
import React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UpsellModalProps {
  onAccept: () => void;
  onDecline: () => void;
  balanceDue: number; // cents
  discount?: number; // percent
}

const UpsellModal: React.FC<UpsellModalProps> = ({
  onAccept,
  onDecline,
  balanceDue,
  discount = 0,
}) => {
  const discounted = discount > 0 ? Math.round(balanceDue * (1 - discount / 100)) : balanceDue;

  return (
    <Dialog open>
      <DialogContent>
        <DialogTitle>Pay Your Balance with {discount}% Off?</DialogTitle>
        <p>
          Get {discount}% off your remaining balance of ${ (balanceDue / 100).toFixed(2) } if you pay now!
        </p>
        <p className="font-bold text-xl mb-2">
          Total Due Today: ${ (discounted / 100).toFixed(2) }
        </p>
        <div className="flex gap-2 mt-4">
          <Button onClick={onAccept}>Pay Now &amp; Save</Button>
          <Button variant="outline" onClick={onDecline}>Pay Later</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UpsellModal;
