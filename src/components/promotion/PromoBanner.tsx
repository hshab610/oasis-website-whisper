import React, { useState, useEffect } from 'react';
import { usePromotion } from '@/contexts/PromotionContext';
import CountdownTimer from './CountdownTimer';
import { BadgePercent, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromoBannerProps {
  className?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ className = "" }) => {
  const {
    isPromotionActive,
    timeRemaining,
    discountPercentage,
    promoCode,
    activatePromotion,
    promoApplied,
    applyPromoCode,
  } = usePromotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isPulsing, setIsPulsing] = useState(true); // Start with pulsing for visibility

  // Responsive: Track width for sticky footer on mobile
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const onResize = () =>
      setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Urgency styling
  const isUrgent = timeRemaining < 3600;
  const isVeryUrgent = timeRemaining < 300;

  // Pulse attention
  useEffect(() => {
    if (!isPromotionActive) return;
    
    // Initial pulse for visibility
    setIsPulsing(true);
    const initialTimeout = setTimeout(() => setIsPulsing(false), 3000);
    
    // Periodic pulsing
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 2000);
    }, 20000); // Every 20 seconds to draw attention
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(pulseInterval);
    };
  }, [isPromotionActive]);
  
  useEffect(() => {
    if (timeRemaining <= 300 && timeRemaining % 60 === 0) {
      setIsPulsing(true);
      const urgencyTimeout = setTimeout(() => setIsPulsing(false), 3000);
      return () => clearTimeout(urgencyTimeout);
    }
  }, [timeRemaining]);

  // Force visibility for the first day
  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenPromoBanner');
    if (!hasSeen) {
      setIsVisible(true);
      localStorage.setItem('hasSeenPromoBanner', 'true');
    }
  }, []);

  if (!isPromotionActive || !isVisible) return null;

  // Toggle banner close
  const handleClose = () => setIsVisible(false);

  // Apply promo code (autolock on click)
  const handleApply = () => {
    applyPromoCode();
    activatePromotion();
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between z-50 shadow-md transition-all duration-300",
        isMobile
          ? "fixed bottom-0 left-0 right-0 py-2 px-3 bg-primary text-primary-foreground rounded-t-lg border-t border-sandGold/40"
          : "sticky top-0 py-2 px-4 bg-primary text-primary-foreground",
        isVeryUrgent ? "bg-red-500 text-white" :
        isUrgent ? "bg-amber-500 text-white" : "",
        isPulsing ? "scale-[1.02] animate-pulse" : "",
        className
      )}
      style={{ minHeight: "44px" }}
    >
      <div className={isMobile ? "w-4" : "w-6"}></div> {/* Spacer */}

      <button
        type="button"
        aria-label={
          promoApplied
            ? "10% Discount Applied"
            : "Activate 10% Promo Discount"
        }
        tabIndex={0}
        onClick={handleApply}
        className={cn(
          "flex items-center gap-2 font-semibold transition-transform cursor-pointer",
          "hover:scale-105",
          promoApplied ? "opacity-90" : "shadow-sm",
        )}
      >
        <BadgePercent className="h-5 w-5" />
        <span>
          <span className="font-bold">10% OFF</span> for 24 hours &ndash; Use code{" "}
          <span className="bg-sunsetOrange/90 text-white rounded px-2 py-0.5 mx-1 font-mono tracking-wide">{promoCode}</span>
        </span>
        <CountdownTimer
          timeRemaining={timeRemaining}
          compact={true}
          showIcon={false}
          className="ml-2"
        />
      </button>

      <button
        className={cn(
          "transition-colors ml-3",
          isUrgent ? "text-white hover:text-gray-200" : "text-primary-foreground hover:text-sunsetOrange"
        )}
        onClick={handleClose}
        aria-label="Close promotion banner"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default PromoBanner;
