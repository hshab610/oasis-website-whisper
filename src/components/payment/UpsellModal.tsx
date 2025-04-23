
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DiscountedPrice from "@/components/pricing/DiscountedPrice";

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
  const saving = balanceDue - discounted;

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-xl font-semibold">Complete Your Payment</DialogTitle>
        
        <div className="mt-2 space-y-4">
          <p className="text-muted-foreground">
            Would you like to pay your remaining balance now and receive {discount}% off?
          </p>
          
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Original Balance:</span>
                <span>${(balanceDue / 100).toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span className="text-sm font-medium">Discount ({discount}%):</span>
                  <span>-${(saving / 100).toFixed(2)}</span>
                </div>
              )}
              
              <div className="pt-2 border-t border-border flex justify-between items-center">
                <span className="font-semibold">Total Due Today:</span>
                <DiscountedPrice 
                  original={balanceDue / 100} 
                  discounted={discounted / 100}
                  showBadge={false}
                  className="text-base"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              onClick={onAccept} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Pay Now & Save ${(saving / 100).toFixed(2)}
            </Button>
            <Button 
              variant="outline" 
              onClick={onDecline}
              className="w-full"
            >
              Pay Later
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            Your payment is secured with bank-level encryption.
            Standard payment terms apply.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellModal;
