
import SubmitButton from '@/components/common/SubmitButton';

type SubmitButtonProps = {
  isSubmitting: boolean;
};

// This is a wrapper component that uses the common SubmitButton
const BookingSubmitButton = ({ isSubmitting }: SubmitButtonProps) => (
  <SubmitButton 
    isSubmitting={isSubmitting} 
    text="Get Free Quote Now"
    loadingText="Processing Request..."
    className="bg-primary hover:bg-primary/90 text-lg py-3"
  />
);

export default BookingSubmitButton;
