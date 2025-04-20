
import React from 'react';
import { usePromotion } from '@/contexts/PromotionContext';
import CountdownTimer from './CountdownTimer';
import { Fire, X } from 'lucide-react';
import { useState } from 'react';

interface PromoBannerProps {
  className?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ className = "" }) => {
  const { isPromotionActive, timeRemaining, discountPercentage } = usePromotion();
  const [isVisible, setIsVisible] = useState(true);

  if (!isPromotionActive || !isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`bg-primary text-primary-foreground py-2 px-4 flex items-center justify-between sticky top-0 z-50 shadow-md transition-all ${className}`}>
      <div className="w-6"></div> {/* Spacer for centering */}
      
      <div className="flex items-center justify-center gap-2 text-sm sm:text-base flex-grow">
        <Fire className="h-5 w-5 text-yellow-300 animate-pulse" />
        <span className="font-semibold">
          Book within <CountdownTimer timeRemaining={timeRemaining} compact={true} /> & get {discountPercentage}% OFF your first move!
        </span>
      </div>
      
      <button 
        className="text-primary-foreground hover:text-white transition-colors"
        onClick={handleClose}
        aria-label="Close promotion banner"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default PromoBanner;
