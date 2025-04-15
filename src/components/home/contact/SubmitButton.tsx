
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';

type SubmitButtonProps = {
  isSubmitting: boolean;
};

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => (
  <Button 
    type="submit" 
    className="w-full"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <span className="flex items-center">
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
