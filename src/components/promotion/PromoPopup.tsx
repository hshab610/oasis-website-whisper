
import { useState, useEffect } from 'react';
import { usePromotion } from '@/contexts/PromotionContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';
import { BadgePercent, X, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromoPopupProps {
  trigger?: 'timer' | 'exit';
}

const PromoPopup: React.FC<PromoPopupProps> = ({ trigger = 'timer' }) => {
  const { isPromotionActive, timeRemaining, discountPercentage, promoCode } = usePromotion();
  const [open, setOpen] = useState(false);

  // Determine urgency level based on time remaining
  const isUrgent = timeRemaining < 600;

  useEffect(() => {
    if (!isPromotionActive) return;

    // For timer trigger - show after a delay
    if (trigger === 'timer') {
      // Check if user has dismissed this popup before
      const hasSeenPromo = sessionStorage.getItem('promoPopupShown');
      
      if (!hasSeenPromo) {
        const timer = setTimeout(() => {
          setOpen(true);
          sessionStorage.setItem('promoPopupShown', 'true');
        }, 8000); // Longer delay to be less intrusive
        
        return () => clearTimeout(timer);
      }
    }
    
    // For exit trigger - less sensitive detection
    if (trigger === 'exit') {
      const hasSeenExitPopup = sessionStorage.getItem('exitPopupShown');
      
      if (!hasSeenExitPopup) {
        const handleExit = (e: MouseEvent) => {
          // Only trigger when mouse is very close to the top edge and moving up
          if (e.clientY <= 5 && e.movementY < 0) {
            setOpen(true);
            sessionStorage.setItem('exitPopupShown', 'true');
            // Remove listener after showing once
            document.removeEventListener('mousemove', handleExit);
          }
        };
        
        document.addEventListener('mousemove', handleExit);
        return () => document.removeEventListener('mousemove', handleExit);
      }
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
          "p-4 flex items-center gap-2 bg-primary/5 border-b border-primary/10",
          isUrgent && "bg-amber-50 border-amber-100"
        )}>
          <BadgePercent className="h-5 w-5 text-primary" />
          <h3 className="font-medium">
            Special Offer for New Customers
          </h3>
        </div>
        
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl text-center mb-2">
              {discountPercentage}% OFF Your First Booking
            </DialogTitle>
            <DialogDescription className="text-center">
              Professional moving services at a special new-customer rate
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="rounded-md p-3 text-center bg-primary/5 border border-primary/10">
              <p className="text-sm text-muted-foreground mb-1 flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1 text-primary/70" />
                Limited time offer:
              </p>
              <CountdownTimer 
                timeRemaining={timeRemaining} 
                className="justify-center text-lg" 
                showIcon={false}
              />
            </div>
            
            <div className="text-center p-3 border border-primary/10 rounded-md">
              <p className="text-sm">
                Use code <span className="font-mono font-medium bg-muted px-2 py-0.5 rounded">{promoCode}</span> at checkout
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                No hidden fees. Automatically applied for new customers.
              </p>
            </div>
            
            <Link to="/contact" onClick={() => setOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 mt-2 group shadow-sm hover:shadow transition-all">
                Book Now & Save 10%
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoPopup;
