
import React, { createContext, useContext, useState, useEffect } from 'react';

type PromotionContextType = {
  isPromotionActive: boolean;
  timeRemaining: number;
  promoCode: string;
  discountPercentage: number;
  activatePromotion: () => void;
  resetPromotion: () => void;
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
  const [isPromotionActive, setIsPromotionActive] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 1 hour in seconds
  const [promoCode] = useState('FIRSTHOUR');
  const [discountPercentage] = useState(10);

  useEffect(() => {
    // Check if there's a saved timer in localStorage
    const savedTime = localStorage.getItem('promotionTimeRemaining');
    const startTime = localStorage.getItem('promotionStartTime');
    
    if (savedTime && startTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const remainingTime = Math.max(0, parseInt(savedTime) - elapsedTime);
      
      if (remainingTime > 0) {
        setTimeRemaining(remainingTime);
        setIsPromotionActive(true);
      } else {
        setIsPromotionActive(false);
        setTimeRemaining(0);
      }
    } else {
      // Initialize timer if not already set
      localStorage.setItem('promotionTimeRemaining', timeRemaining.toString());
      localStorage.setItem('promotionStartTime', Date.now().toString());
    }

    // Set up interval to update timer
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
    setTimeRemaining(60 * 60);
    localStorage.setItem('promotionTimeRemaining', (60 * 60).toString());
    localStorage.setItem('promotionStartTime', Date.now().toString());
  };

  const resetPromotion = () => {
    setIsPromotionActive(false);
    setTimeRemaining(0);
    localStorage.removeItem('promotionTimeRemaining');
    localStorage.removeItem('promotionStartTime');
  };

  return (
    <PromotionContext.Provider
      value={{
        isPromotionActive,
        timeRemaining,
        promoCode,
        discountPercentage,
        activatePromotion,
        resetPromotion
      }}
    >
      {children}
    </PromotionContext.Provider>
  );
};
