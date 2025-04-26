
import { cn } from "@/lib/utils";

interface NileDividerProps {
  className?: string;
  variant?: "default" | "subtle" | "accent";
}

export function NileDivider({ className, variant = "default" }: NileDividerProps) {
  return (
    <div className={cn(
      "divider-nile my-8",
      variant === "subtle" && "opacity-50",
      variant === "accent" && "before:bg-gradient-to-r before:from-transparent before:via-desertGold/30 before:to-transparent",
      className
    )} />
  );
}
