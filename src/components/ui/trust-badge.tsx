
import * as React from "react";
import { cn } from "@/lib/utils";
import { Phone, Shield, Star, Clock, BadgePercent, Award, AlertCircle } from "lucide-react";

interface TrustBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "phone" | "insured" | "ontime" | "rating" | "discount" | "dot" | "bbb" | "important";
  value?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "muted" | "highlight";
}

const TrustBadge = React.forwardRef<HTMLDivElement, TrustBadgeProps>(
  ({ className, type, value, size = "md", variant = "default", ...props }, ref) => {
    const getIcon = () => {
      switch (type) {
        case "phone": return <Phone className={iconClassName} />;
        case "insured": return <Shield className={iconClassName} />;
        case "ontime": return <Clock className={iconClassName} />;
        case "rating": return <Star className={`${iconClassName} ${type === "rating" ? "fill-yellow-500 text-yellow-500" : ""}`} />;
        case "discount": return <BadgePercent className={iconClassName} />;
        case "dot": return <Shield className={iconClassName} />;
        case "bbb": return <Award className={iconClassName} />;
        case "important": return <AlertCircle className={iconClassName} />;
        default: return null;
      }
    };
    
    const getText = () => {
      switch (type) {
        case "phone": return value || "(614) 740-0275";
        case "insured": return "Licensed & Insured";
        case "ontime": return "On-Time Service";
        case "rating": return value || "4.8★ Rated";
        case "discount": return value || "Special Offer";
        case "dot": return `DOT #${value || "123456789"}`;
        case "bbb": return "BBB Accredited";
        case "important": return value || "Important Notice";
        default: return null;
      }
    };
    
    const sizeClassName = {
      sm: "text-xs py-1 px-2",
      md: "text-sm py-1.5 px-3",
      lg: "text-base py-2 px-4",
    };
    
    const variantClassName = {
      default: "bg-white/95 shadow-sm",
      outline: "border border-primary/20 bg-transparent",
      muted: "bg-muted/20",
      highlight: "bg-primary/10 border border-primary/20",
    };
    
    const iconClassName = {
      sm: "h-3 w-3 mr-1.5", 
      md: "h-4 w-4 mr-2", 
      lg: "h-5 w-5 mr-2.5",
    }[size];
    
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          sizeClassName[size],
          variantClassName[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {getIcon()}
        <span>{getText()}</span>
      </div>
    );
  }
);

TrustBadge.displayName = "TrustBadge";

export { TrustBadge };
