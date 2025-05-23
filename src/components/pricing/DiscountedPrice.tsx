
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Display an original price and discounted price side-by-side, in the site's style.
 *
 * Usage:
 *   <DiscountedPrice original={199} discounted={179.10} className="text-lg" />
 *
 * - To change colors, edit Tailwind classes below.
 */
interface DiscountedPriceProps {
  original: number;
  discounted: number;
  className?: string;
  currency?: string;
  animatePulse?: boolean;
  showBadge?: boolean;
}

const DiscountedPrice: React.FC<DiscountedPriceProps> = ({
  original,
  discounted,
  className = "",
  currency = "$",
  animatePulse = false,
  showBadge = false,
}) => (
  <div className={cn("flex items-baseline gap-2", className)}>
    <span
      className={cn(
        "line-through text-muted-foreground/80 font-medium text-base md:text-lg"
      )}
    >
      {currency}
      {original.toFixed(2)}
    </span>
    <span className={cn(
      "font-bold text-primary text-lg md:text-2xl",
      animatePulse && "relative"
    )}>
      {currency}
      {discounted.toFixed(2)}
      {animatePulse && (
        <span className="absolute -right-1.5 -top-1.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
        </span>
      )}
      {showBadge && (
        <span className="ml-2 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full align-middle inline-block -translate-y-1 border border-primary/10">
          SAVE10
        </span>
      )}
    </span>
  </div>
);

export default DiscountedPrice;
