
import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * To change the promo code, discount, or timer:
 * - Promo code: Edit the value of PROMO_CODE below.
 * - Discount: Change DISCOUNT_PERCENTAGE below.
 * - Timer: Modify PROMO_DURATION_SECONDS for hours/minutes.
 */
const PROMO_CODE = 'SAVE10';
const DISCOUNT_PERCENTAGE = 10;
const PROMO_DURATION_SECONDS = 24 * 60 * 60; // 24 hours

type PromotionContextType = {
  isPromotionActive: boolean;
  timeRemaining: number;
  promoCode: string;
  discountPercentage: number;
  activatePromotion: () => void;
  resetPromotion: () => void;
  applyPromoCode: () => void;
  promoApplied: boolean;
  setPromoApplied: (val: boolean) => void;
};

const PromotionContext = createContext<PromotionContextType | undefined>(undefined);

export const usePromotion = () => {
  const context = useContext(PromotionContext);
  if (context === undefined) {
    throw new Error('usePromotion must be used within a PromotionProvider');
  }
  return context;
};

export const PromotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Force promotion to be active for all users initially
  const [isPromotionActive, setIsPromotionActive] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(PROMO_DURATION_SECONDS);
  const [promoCode] = useState(PROMO_CODE);
  const [discountPercentage] = useState(DISCOUNT_PERCENTAGE);
  const [promoApplied, setPromoApplied] = useState(true); // Auto-apply for all users

  useEffect(() => {
    // Always activate the promotion for new users
    if (!localStorage.getItem('promotionTimeRemaining')) {
      localStorage.setItem('promotionTimeRemaining', PROMO_DURATION_SECONDS.toString());
      localStorage.setItem('promotionStartTime', Date.now().toString());
    }
    
    const savedTime = localStorage.getItem('promotionTimeRemaining');
    const startTime = localStorage.getItem('promotionStartTime');
    
    if (savedTime && startTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const remainingTime = Math.max(0, parseInt(savedTime) - elapsedTime);
      
      if (remainingTime > 0) {
        setTimeRemaining(remainingTime);
        setIsPromotionActive(true);
      } else {
        // Reset promotion for testing purposes in development
        localStorage.setItem('promotionTimeRemaining', PROMO_DURATION_SECONDS.toString());
        localStorage.setItem('promotionStartTime', Date.now().toString());
        setTimeRemaining(PROMO_DURATION_SECONDS);
        setIsPromotionActive(true);
      }
    }
    
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = Math.max(0, prevTime - 1);
        localStorage.setItem('promotionTimeRemaining', newTime.toString());
        if (newTime === 0) {
          setIsPromotionActive(false);
          clearInterval(timer);
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const activatePromotion = () => {
    setIsPromotionActive(true);
    setTimeRemaining(PROMO_DURATION_SECONDS);
    localStorage.setItem('promotionTimeRemaining', PROMO_DURATION_SECONDS.toString());
    localStorage.setItem('promotionStartTime', Date.now().toString());
    setPromoApplied(true);
  };

  const resetPromotion = () => {
    setIsPromotionActive(false);
    setTimeRemaining(0);
    localStorage.removeItem('promotionTimeRemaining');
    localStorage.removeItem('promotionStartTime');
    setPromoApplied(false);
  };

  const applyPromoCode = () => {
    setPromoApplied(true);
  };

  return (
    <PromotionContext.Provider
      value={{
        isPromotionActive,
        timeRemaining,
        promoCode,
        discountPercentage,
        activatePromotion,
        resetPromotion,
        applyPromoCode,
        promoApplied,
        setPromoApplied,
      }}
    >
      {children}
    </PromotionContext.Provider>
  );
};

// To update promo code/discount/timer, change PROMO_CODE, DISCOUNT_PERCENTAGE, PROMO_DURATION_SECONDS above.
