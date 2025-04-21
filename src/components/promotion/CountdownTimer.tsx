
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  timeRemaining: number;
  className?: string;
  compact?: boolean;
  showIcon?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  timeRemaining, 
  className = "", 
  compact = false,
  showIcon = true
}) => {
  // Convert seconds to hours, minutes, seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  // Format time with leading zeros
  const formatTime = (time: number) => time.toString().padStart(2, '0');
  
  // Determine urgency levels for visual cues
  const isUrgent = timeRemaining < 300; // Less than 5 minutes remaining
  const isVeryUrgent = timeRemaining < 60; // Less than 1 minute remaining
  
  return (
    <div className={cn("flex items-center", className)}>
      {showIcon && !compact && (
        <Clock className="mr-2 h-4 w-4 text-primary animate-pulse" />
      )}
      <div 
        className={cn(
          "font-mono font-bold",
          isVeryUrgent ? "text-red-500 animate-pulse" : 
          isUrgent ? "text-amber-600" : ""
        )}
      >
        {formatTime(hours)}:{formatTime(minutes)}:
        <span className={cn(
          isUrgent && "inline-block animate-pulse"
        )}>
          {formatTime(seconds)}
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
