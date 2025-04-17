
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
}

const QuoteButton = ({
  text = "Request a Free Quote",
  className,
  onClick,
  icon = true,
  arrow = true,
  variant = "quote"
}: QuoteButtonProps) => {
  return (
    <Button
      variant={variant}
      size="lg"
      className={cn(
        "font-semibold shadow-md transition-all hover:shadow-lg",
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
