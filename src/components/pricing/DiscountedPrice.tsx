
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
}
const DiscountedPrice: React.FC<DiscountedPriceProps> = ({
  original,
  discounted,
  className = "",
  currency = "$",
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
      "font-bold text-sunsetOrange text-lg md:text-2xl"
    )}>
      {currency}
      {discounted.toFixed(2)}
    </span>
  </div>
);

export default DiscountedPrice;

// To change price color (discount/original), edit text-sunsetOrange or text-muted-foreground above.
