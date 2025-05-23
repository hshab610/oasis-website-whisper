
import React from 'react';
import { TrustBadge } from '@/components/ui/trust-badge';

interface TrustBadgeGroupProps {
  variant?: 'default' | 'highlight' | 'minimal';
  showDot?: boolean;
  showRating?: boolean;
  showInsured?: boolean;
  showOntime?: boolean;
  ratingValue?: string;
  dotValue?: string;
  className?: string;
}

export const TrustBadgeGroup: React.FC<TrustBadgeGroupProps> = ({
  variant = 'default',
  showDot = false,
  showRating = true,
  showInsured = true,
  showOntime = true,
  ratingValue = "5★ Westerville",
  dotValue = "",
  className = "",
}) => {
  const badgeVariant = variant === 'highlight' ? 'highlight' : 'default';
  
  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {showRating && (
        <TrustBadge 
          type="rating" 
          value={ratingValue} 
          variant={variant === 'highlight' ? 'highlight' : 'default'} 
        />
      )}
      
      {showInsured && (
        <TrustBadge 
          type="insured" 
          variant={badgeVariant} 
        />
      )}
      
      {showOntime && (
        <TrustBadge 
          type="ontime" 
          variant={badgeVariant} 
        />
      )}
    </div>
  );
};

export default TrustBadgeGroup;
