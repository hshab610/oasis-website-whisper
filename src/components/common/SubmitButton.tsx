
import { Button } from "@/components/ui/button";
import { Loader, LockIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean;
  text?: string;
  loadingText?: string;
  className?: string;
  showSecurityBadge?: boolean;
}

const SubmitButton = ({
  isSubmitting,
  text = "Submit",
  loadingText = "Submitting...",
  className,
  showSecurityBadge = true,
  ...props
}: SubmitButtonProps) => (
  <div className="space-y-2">
    <Button 
      type="submit"
      disabled={isSubmitting}
      className={cn(
        "w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-bold shadow-lg transition-all",
        className
      )}
      {...props}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <Loader className="mr-2 h-5 w-5 animate-spin" />
          {loadingText}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {text}
        </div>
      )}
    </Button>
    {showSecurityBadge && (
      <div className="flex justify-center items-center gap-1 text-xs text-muted-foreground">
        <LockIcon className="h-3 w-3" />
        <span>Your information is secure. We'll never share your data.</span>
      </div>
    )}
  </div>
);

export default SubmitButton;
