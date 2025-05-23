
import React from 'react';
import { Shield, Calendar } from 'lucide-react';

interface CTATrustElementsProps {
  showDot?: boolean;
  showScheduling?: boolean;
  dotNumber?: string;
  className?: string;
}

const CTATrustElements: React.FC<CTATrustElementsProps> = ({
  showDot = true,
  showScheduling = true,
  dotNumber = "",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {showDot && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm border border-primary/10 min-h-[48px]">
          <Shield className="h-4 w-4 text-primary flex-shrink-0" />
          <span>Licensed & Insured</span>
        </div>
      )}
      
      {showScheduling && (
        <div className="flex items-center justify-center mt-2 text-sm px-4 py-2 bg-white/80 rounded-full border border-nileTeal/30 shadow-sm min-h-[48px]">
          <Calendar className="h-4 w-4 text-nileTeal mr-2 flex-shrink-0" />
          <span className="font-medium text-foreground">Available Slots in Westerville: Book Now!</span>
        </div>
      )}
    </div>
  );
};

export default CTATrustElements;
