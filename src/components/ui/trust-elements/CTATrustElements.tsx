
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
  dotNumber = "123456789",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {showDot && (
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" />
          <span>Licensed & Insured {dotNumber && `• DOT #${dotNumber}`}</span>
        </div>
      )}
      
      {showScheduling && (
        <div className="flex items-center justify-center mt-2 text-sm px-4 py-2 bg-yellow-50 rounded-full border border-desertGold/20">
          <Calendar className="h-4 w-4 text-desertGold mr-2" />
          <span className="font-medium text-desertGold">Westerville Slots Available: Book Now!</span>
        </div>
      )}
    </div>
  );
};

export default CTATrustElements;
