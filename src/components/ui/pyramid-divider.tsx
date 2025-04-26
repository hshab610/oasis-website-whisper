
import { cn } from "@/lib/utils";

interface PyramidDividerProps {
  className?: string;
  variant?: "light" | "bold" | "gradient";
}

export function PyramidDivider({ className, variant = "light" }: PyramidDividerProps) {
  return (
    <div 
      className={cn(
        "pyramid-divider",
        variant === "bold" && "before:opacity-30",
        variant === "gradient" && "bg-gradient-to-r from-transparent via-desertGold/10 to-transparent",
        className
      )}
    />
  );
}
