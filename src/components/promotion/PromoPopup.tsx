
import { useState, useEffect } from 'react';
import { usePromotion } from '@/contexts/PromotionContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';
import { Zap, X, Clock, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromoPopupProps {
  trigger?: 'timer' | 'exit';
}

const PromoPopup: React.FC<PromoPopupProps> = ({ trigger = 'timer' }) => {
  const { isPromotionActive, timeRemaining, discountPercentage } = usePromotion();
  const [open, setOpen] = useState(false);
  const [peopleBooking] = useState(() => {
    // Generate a random number between 8 and 16 to show as social proof
    return Math.floor(Math.random() * 9) + 8;
  });

  // Determine urgency level based on time remaining
  const isUrgent = timeRemaining < 300;

  useEffect(() => {
    if (!isPromotionActive) return;

    // For timer trigger - show after 5 seconds on page
    if (trigger === 'timer') {
      const timer = setTimeout(() => {
        // Only show if user hasn't seen it before in this session
        if (!sessionStorage.getItem('promoPopupShown')) {
          setOpen(true);
          sessionStorage.setItem('promoPopupShown', 'true');
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
    
    // For exit trigger
    if (trigger === 'exit') {
      const handleExit = (e: MouseEvent) => {
        // Only trigger if mouse leaves to the top of the page
        if (e.clientY <= 0 && !sessionStorage.getItem('exitPopupShown')) {
          setOpen(true);
          sessionStorage.setItem('exitPopupShown', 'true');
        }
      };
      
      document.addEventListener('mouseleave', handleExit);
      return () => document.removeEventListener('mouseleave', handleExit);
    }
  }, [isPromotionActive, trigger]);

  if (!isPromotionActive) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <button 
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          onClick={() => setOpen(false)}
          aria-label="Close promotion popup"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className={cn(
          "p-4 flex items-center gap-2",
          isUrgent ? "bg-amber-500 text-white" : "bg-primary text-primary-foreground"
        )}>
          <Zap className={cn(
            "h-5 w-5", 
            isUrgent ? "text-white animate-pulse" : "text-yellow-300 animate-pulse"
          )} />
          <h3 className="font-bold">
            {isUrgent ? "Limited Time Remaining!" : "Limited Time Offer"}
          </h3>
        </div>
        
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl text-center mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>{discountPercentage}% OFF Your First Move!</span>
              <Sparkles className="h-5 w-5 text-primary" />
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-center">
              {isUrgent 
                ? "Hurry! Your exclusive discount is about to expire!" 
                : "Book within the next hour to lock in your exclusive discount!"}
            </p>
            
            <div className={cn(
              "rounded-md p-4 text-center",
              isUrgent ? "bg-red-50 border border-red-100" : "bg-muted"
            )}>
              <p className="text-sm text-muted-foreground mb-2 flex items-center justify-center">
                <Clock className={cn(
                  "h-4 w-4 mr-1",
                  isUrgent && "text-red-500"
                )} />
                Time remaining:
              </p>
              <CountdownTimer 
                timeRemaining={timeRemaining} 
                className="justify-center text-lg" 
                showIcon={false}
              />
            </div>
            
            <div className="text-center bg-primary/5 rounded-md p-3">
              <p className="text-sm flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-semibold text-red-500">{peopleBooking} people</span> 
                <span>booked in the last hour</span>
              </p>
            </div>
            
            <Link to="/contact" onClick={() => setOpen(false)}>
              <Button className={cn(
                "w-full text-primary-foreground mt-4 group shadow-md hover:shadow-lg transition-all",
                isUrgent ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
              )}>
                {isUrgent ? "Book Now Before Offer Expires!" : "Book Now & Save 10%"}
                <Zap className="ml-2 group-hover:animate-pulse" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoPopup;
