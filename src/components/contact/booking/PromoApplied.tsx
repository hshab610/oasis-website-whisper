
import { Check, Clock } from 'lucide-react';
import { usePromotion } from '@/contexts/PromotionContext';
import CountdownTimer from '@/components/promotion/CountdownTimer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { BadgePercent } from 'lucide-react';

const PromoApplied = () => {
  const { isPromotionActive, timeRemaining, discountPercentage, promoCode } = usePromotion();
  
  if (!isPromotionActive) return null;
  
  // Determine if we're in the urgent timing zone
  const isUrgent = timeRemaining < 600;
  
  return (
    <Alert className={cn(
      "mb-6 border-primary/30 bg-primary/5 flex items-start transition-all duration-300", 
      isUrgent ? "border-amber-500/30 bg-amber-50" : ""
    )}>
      <div className={cn(
        "bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5",
        isUrgent && "bg-amber-500/10 text-amber-600"
      )}>
        <BadgePercent className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <AlertTitle className="text-primary font-medium mb-1 flex items-center">
          {discountPercentage}% Discount Applied
          <Check className="h-4 w-4 ml-1.5 text-green-500" />
        </AlertTitle>
        <AlertDescription className="text-sm flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span>
              {isUrgent ? "Limited time offer:" : "Offer valid for:"}
            </span>
            <CountdownTimer 
              timeRemaining={timeRemaining} 
              compact={true} 
              className="text-primary font-semibold"
              showIcon={false}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Code <span className="font-mono bg-muted px-1 py-0.5 rounded">{promoCode}</span> automatically applied at checkout. No hidden fees.
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default PromoApplied;
