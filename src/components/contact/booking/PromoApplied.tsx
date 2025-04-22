
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
      "mb-6 border-primary flex items-start transition-all duration-300", 
      isUrgent ? "bg-primary/15 animate-pulse" : "bg-primary/10"
    )}>
      <div className={cn(
        "bg-primary text-primary-foreground rounded-full p-1 mr-2 mt-0.5",
        isUrgent && "animate-pulse"
      )}>
        <BadgePercent className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <AlertTitle className="text-primary font-medium mb-1 flex items-center">
          {discountPercentage}% Special Discount Applied!
          <span className={cn(
            "ml-2 inline-block",
            timeRemaining < 300 ? "animate-pulse" : ""
          )}>🎉</span>
        </AlertTitle>
        <AlertDescription className="text-sm flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className={isUrgent ? "font-medium" : ""}>
              {isUrgent ? "Hurry! Discount expiring soon:" : "Discount locked in for new customers! Time remaining:"}
            </span>
            <CountdownTimer 
              timeRemaining={timeRemaining} 
              compact={true} 
              className={cn("text-primary font-semibold", isUrgent && "text-red-500")}
              showIcon={false}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Promo code <span className="font-mono bg-muted px-1 py-0.5 rounded">{promoCode}</span> automatically applied at checkout for new customers
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default PromoApplied;
