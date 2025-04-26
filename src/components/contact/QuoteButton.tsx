
import { Button } from "@/components/ui/button";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface QuoteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  icon?: boolean;
  arrow?: boolean;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | "quote";
  size?: "default" | "sm" | "lg" | "xl";
}

const QuoteButton = ({
  text = "Request a Free Quote",
  className,
  icon = true,
  arrow = true,
  variant = "quote",
  size = "lg",
  children,
  ...props
}: QuoteButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform-gpu bg-gradient-to-r from-primary to-primary/90 text-white relative overflow-hidden group",
        className
      )}
      {...props}
    >
      {/* Animated background highlight */}
      <span className="absolute top-0 left-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
      
      {children || (
        <span className="relative z-10 flex items-center justify-center">
          {icon && <CalendarCheck className="mr-2 h-5 w-5" />}
          {text}
          {arrow && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
        </span>
      )}
    </Button>
  );
};

export default QuoteButton;
