
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CountdownTimer from "@/components/promotion/CountdownTimer";

interface DepositTermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  moveDateTime: Date;
  refundDeadline: Date;
  onConfirm: () => void;
}

const formatDeadline = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

const DepositTermsDialog: React.FC<DepositTermsDialogProps> = ({
  open,
  onOpenChange,
  loading,
  termsAccepted,
  setTermsAccepted,
  moveDateTime,
  refundDeadline,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={() => onOpenChange(false)}
            className="sm:mr-2"
          >
            Cancel
          </Button>
          <Button 
            disabled={!termsAccepted || loading} 
            onClick={onConfirm}
            className="bg-primary"
          >
            Pay $100 Deposit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepositTermsDialog;
