
import SubmitButton from '@/components/common/SubmitButton';

type SubmitButtonProps = {
  isSubmitting: boolean;
};

// This is a wrapper component that uses the common SubmitButton
// It's kept for backward compatibility
const BookingSubmitButton = ({ isSubmitting }: SubmitButtonProps) => (
  <SubmitButton 
    isSubmitting={isSubmitting} 
    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
    text="Send Message"
    loadingText="Sending..."
  />
);

export default BookingSubmitButton;
