
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
  const [isPulsing, setIsPulsing] = useState(false);

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

  // Pulse attention - more subtle approach
  useEffect(() => {
    if (!isPromotionActive) return;
    
    // Initial pulse for visibility
    setIsPulsing(true);
    const initialTimeout = setTimeout(() => setIsPulsing(false), 2000);
    
    // Periodic pulsing but less frequent and less intrusive
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1500);
    }, 45000); // Every 45 seconds to be less annoying
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(pulseInterval);
    };
  }, [isPromotionActive]);
  
  // Only pulse on urgency milestones
  useEffect(() => {
    if (timeRemaining <= 300 && timeRemaining % 60 === 0) {
      setIsPulsing(true);
      const urgencyTimeout = setTimeout(() => setIsPulsing(false), 2000);
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
        "flex items-center justify-between z-50 shadow-sm transition-all duration-300",
        isMobile
          ? "fixed bottom-0 left-0 right-0 py-2 px-3 bg-white text-primary border-t border-primary/10 rounded-t-lg"
          : "sticky top-0 py-2 px-4 bg-white border-b border-primary/10 text-primary",
        isVeryUrgent ? "bg-amber-50 border-amber-200/30" : "",
        isPulsing ? "scale-[1.01]" : "",
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
          "flex items-center gap-2 font-medium transition-transform cursor-pointer",
          "hover:scale-102",
          promoApplied ? "opacity-95" : "",
        )}
      >
        <BadgePercent className={cn(
          "h-5 w-5 text-primary",
          isPulsing && "animate-pulse"
        )} />
        <span>
          <span className="font-semibold">10% OFF</span> your first booking &ndash; Use code{" "}
          <span className="bg-primary/10 text-primary rounded px-2 py-0.5 mx-1 font-mono tracking-wide">{promoCode}</span>
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
          "transition-colors ml-3 opacity-70 hover:opacity-100",
          isUrgent ? "text-amber-600" : "text-primary"
        )}
        onClick={handleClose}
        aria-label="Close promotion banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PromoBanner;
