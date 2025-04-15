
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';

type SubmitButtonProps = {
  isSubmitting: boolean;
};

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => (
  <Button 
    type="submit" 
    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <span className="flex items-center justify-center">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Sending...
      </span>
    ) : (
      <>
        <Send className="mr-2 h-5 w-5" />
        Send Message
      </>
    )}
  </Button>
);

export default SubmitButton;
