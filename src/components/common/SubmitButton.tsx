
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  isSubmitting: boolean;
  className?: string;
  text?: string;
  loadingText?: string;
};

const SubmitButton = ({ 
  isSubmitting, 
  className = "w-full", 
  text = "Send Message", 
  loadingText = "Sending..." 
}: SubmitButtonProps) => (
  <Button 
    type="submit" 
    className={cn(className, isSubmitting ? "" : "animate-pulse")}
    disabled={isSubmitting}
    variant={className.includes("bg-primary") ? "default" : "default"}
    size={className.includes("py-6") ? "xl" : "default"}
  >
    {isSubmitting ? (
      <span className="flex items-center">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        {loadingText}
      </span>
    ) : (
      <>
        <Send className="mr-2 h-5 w-5" />
        {text}
      </>
    )}
  </Button>
);

export default SubmitButton;
