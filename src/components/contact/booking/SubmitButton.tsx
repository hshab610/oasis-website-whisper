
import SubmitButton from '@/components/common/SubmitButton';

type SubmitButtonProps = {
  isSubmitting: boolean;
};

// This is a wrapper component that uses the common SubmitButton
const BookingSubmitButton = ({ isSubmitting }: SubmitButtonProps) => (
  <SubmitButton 
    isSubmitting={isSubmitting} 
    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
    text="Request Quote"
    loadingText="Submitting..."
  />
);

export default BookingSubmitButton;
