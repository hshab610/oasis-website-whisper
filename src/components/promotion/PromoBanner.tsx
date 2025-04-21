
import React from 'react';
import { usePromotion } from '@/contexts/PromotionContext';
import CountdownTimer from './CountdownTimer';
import { Zap, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PromoBannerProps {
  className?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ className = "" }) => {
  const { isPromotionActive, timeRemaining, discountPercentage } = usePromotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isPulsing, setIsPulsing] = useState(false);

  // Add pulsing effect every 30 seconds to draw attention
  useEffect(() => {
    if (!isPromotionActive) return;
    
    // Initial pulse
    setIsPulsing(true);
    const initialTimeout = setTimeout(() => setIsPulsing(false), 2000);
    
    // Set up interval for pulsing
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 2000);
    }, 30000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(pulseInterval);
    };
  }, [isPromotionActive]);

  // Pulse again when approaching the end of the timer
  useEffect(() => {
    if (timeRemaining <= 300 && timeRemaining % 60 === 0) {
      setIsPulsing(true);
      const urgencyTimeout = setTimeout(() => setIsPulsing(false), 3000);
      return () => clearTimeout(urgencyTimeout);
    }
  }, [timeRemaining]);

  if (!isPromotionActive || !isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div 
      className={`bg-primary text-primary-foreground py-2 px-4 flex items-center justify-between sticky top-0 z-50 shadow-md transition-all ${
        isPulsing ? 'bg-primary-900 scale-[1.02]' : ''
      } ${className}`}
    >
      <div className="w-6"></div> {/* Spacer for centering */}
      
      <div className="flex items-center justify-center gap-2 text-sm sm:text-base flex-grow">
        <Zap className={`h-5 w-5 text-yellow-300 ${isPulsing ? 'animate-bounce' : 'animate-pulse'}`} />
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
