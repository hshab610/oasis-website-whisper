
import { Button } from "@/components/ui/button";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
  icon?: boolean;
  arrow?: boolean;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | "quote";
  size?: "default" | "sm" | "lg" | "xl";
}

const QuoteButton = ({
  text = "Request a Free Quote",
  className,
  onClick,
  icon = true,
  arrow = true,
  variant = "quote",
  size = "lg"
}: QuoteButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "font-bold shadow-lg transition-all hover:shadow-xl hover:scale-105 transform-gpu",
        className
      )}
      onClick={onClick}
    >
      {icon && <CalendarCheck className="mr-2 h-5 w-5" />}
      {text}
      {arrow && <ArrowRight className="ml-2 h-5 w-5" />}
    </Button>
  );
};

export default QuoteButton;
