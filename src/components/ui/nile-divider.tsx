
import { cn } from "@/lib/utils";

interface NileDividerProps {
  className?: string;
  variant?: "default" | "subtle" | "accent" | "prominent";
  animated?: boolean;
}

export function NileDivider({ 
  className, 
  variant = "default", 
  animated = true 
}: NileDividerProps) {
  return (
    <div className={cn(
      "divider-nile my-8 relative",
      variant === "subtle" && "opacity-50",
      variant === "accent" && "before:bg-gradient-to-r before:from-transparent before:via-desertGold/30 before:to-transparent",
      variant === "prominent" && "before:bg-gradient-to-r before:from-transparent before:via-desertGold before:to-transparent before:h-3 my-12",
      animated === false && "before:!animation-none",
      className
    )}>
      {variant === "prominent" && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-nileDeep rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-desertGold rounded-full"></div>
        </div>
      )}
    </div>
  );
}
