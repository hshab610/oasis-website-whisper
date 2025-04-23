
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DiscountedPrice from "@/components/pricing/DiscountedPrice";
import { BadgePercent, Check, ShieldCheck } from "lucide-react";

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
      <DialogContent className="sm:max-w-md w-[90%] max-w-[400px] mx-auto">
        <DialogTitle className="flex items-center text-xl font-semibold text-primary tracking-tight">
          <BadgePercent className="mr-2 h-5 w-5" />
          Special Offer Available
        </DialogTitle>
        
        <div className="mt-4 space-y-6">
          <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
            <div className="flex flex-col gap-2">
              <p className="text-foreground font-medium leading-tight">
                Pay your balance today and receive a {discount}% discount
              </p>
              <p className="text-sm text-muted-foreground leading-normal">
                Complete your payment now to receive this exclusive offer
              </p>
            </div>
          </div>
          
          <div className="rounded-md border bg-background p-4">
            <div className="space-y-4">
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
          
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <Button 
                onClick={onAccept} 
                className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center h-12 min-h-[48px]"
              >
                <Check className="mr-2 h-5 w-5" />
                Save ${(saving / 100).toFixed(2)} Now
              </Button>
              <Button 
                variant="outline" 
                onClick={onDecline}
                className="w-full h-12 min-h-[48px]"
              >
                Pay Later
              </Button>
            </div>
            
            <div className="flex items-center justify-center text-xs text-muted-foreground gap-1 pt-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="leading-relaxed">Secure payment • Bank-level encryption</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellModal;
