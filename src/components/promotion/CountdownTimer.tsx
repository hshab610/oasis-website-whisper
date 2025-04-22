
import React, { useMemo } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  timeRemaining: number;
  className?: string;
  compact?: boolean;
  showIcon?: boolean;
  urgencyThreshold?: {
    warning: number; // seconds when to start showing warning state
    critical: number; // seconds when to start showing critical state
  };
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  timeRemaining, 
  className = "", 
  compact = false,
  showIcon = true,
  urgencyThreshold = { warning: 3600, critical: 600 } // Increased urgency thresholds
}) => {
  // Convert seconds to hours, minutes, seconds
  const formattedTime = useMemo(() => {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    // Format time with leading zeros
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  }, [timeRemaining]);
  
  // Determine urgency levels for visual cues
  const isUrgent = timeRemaining < urgencyThreshold.warning;
  const isVeryUrgent = timeRemaining < urgencyThreshold.critical;
  
  return (
    <div className={cn("flex items-center", className)}>
      {showIcon && !compact && (
        <Clock className={cn(
          "mr-2 h-4 w-4",
          isVeryUrgent ? "animate-pulse text-red-500" : 
          isUrgent ? "animate-pulse text-amber-500" : "text-primary animate-pulse"
        )} />
      )}
      <div 
        className={cn(
          "font-mono font-bold",
          isVeryUrgent ? "text-red-500" : 
          isUrgent ? "text-amber-600" : ""
        )}
      >
        {formattedTime.hours}:{formattedTime.minutes}:
        <span className={cn(
          "inline-block",
          isUrgent && "animate-pulse"
        )}>
          {formattedTime.seconds}
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
