
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
        "font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform-gpu bg-primary text-primary-foreground",
        className
      )}
      {...props}
    >
      {children || (
        <>
          {icon && <CalendarCheck className="mr-2 h-5 w-5" />}
          {text}
          {arrow && <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />}
        </>
      )}
    </Button>
  );
};

export default QuoteButton;
