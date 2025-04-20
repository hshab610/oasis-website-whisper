
import React from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  timeRemaining: number;
  className?: string;
  compact?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  timeRemaining, 
  className = "", 
  compact = false 
}) => {
  // Convert seconds to hours, minutes, seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  // Format time with leading zeros
  const formatTime = (time: number) => time.toString().padStart(2, '0');
  
  return (
    <div className={`flex items-center ${className}`}>
      {!compact && <Clock className="mr-2 h-4 w-4 text-primary animate-pulse" />}
      <div className="font-mono font-bold">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </div>
    </div>
  );
};

export default CountdownTimer;
