
import { useState, useEffect } from 'react';
import { usePromotion } from '@/contexts/PromotionContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';
import { Zap, X } from 'lucide-react';

interface PromoPopupProps {
  trigger?: 'timer' | 'exit';
}

const PromoPopup: React.FC<PromoPopupProps> = ({ trigger = 'timer' }) => {
  const { isPromotionActive, timeRemaining, discountPercentage } = usePromotion();
  const [open, setOpen] = useState(false);

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
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="bg-primary text-primary-foreground p-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-300 animate-pulse" />
          <h3 className="font-bold">Limited Time Offer</h3>
        </div>
        
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl text-center mb-4">
              {discountPercentage}% OFF Your First Move!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p>Book within the next hour to lock in your exclusive discount!</p>
            
            <div className="bg-muted rounded-md p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Time remaining:</p>
              <CountdownTimer timeRemaining={timeRemaining} className="justify-center text-lg" />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                <span className="font-semibold text-red-500">12 people</span> booked in the last hour
              </p>
            </div>
            
            <Link to="/contact" onClick={() => setOpen(false)}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
                Book Now & Save {discountPercentage}%
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoPopup;
