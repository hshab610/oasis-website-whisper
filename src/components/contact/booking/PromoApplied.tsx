
import { Check, Clock } from 'lucide-react';
import { usePromotion } from '@/contexts/PromotionContext';
import CountdownTimer from '@/components/promotion/CountdownTimer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const PromoApplied = () => {
  const { isPromotionActive, timeRemaining, discountPercentage } = usePromotion();
  
  if (!isPromotionActive) return null;
  
  return (
    <Alert className="mb-6 bg-primary/10 border-primary flex items-start">
      <div className="bg-primary text-primary-foreground rounded-full p-1 mr-2 mt-0.5">
        <Check className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <AlertTitle className="text-primary font-medium mb-1 flex items-center">
          {discountPercentage}% First Hour Discount Applied!
          <span className={cn(
            "ml-2 inline-block",
            timeRemaining < 300 ? "animate-pulse" : ""
          )}>🎉</span>
        </AlertTitle>
        <AlertDescription className="text-sm flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Discount locked in! Time remaining: </span>
          <CountdownTimer 
            timeRemaining={timeRemaining} 
            compact={true} 
            className="text-primary font-semibold"
            showIcon={false}
          />
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default PromoApplied;
