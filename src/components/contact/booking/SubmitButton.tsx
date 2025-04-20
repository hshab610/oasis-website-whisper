
import SubmitButton from '@/components/common/SubmitButton';

type SubmitButtonProps = {
  isSubmitting: boolean;
};

// This is a wrapper component that uses the common SubmitButton
const BookingSubmitButton = ({ isSubmitting }: SubmitButtonProps) => (
  <SubmitButton 
    isSubmitting={isSubmitting} 
    text="Get Free Quote Now"
    loadingText="Submitting Request..."
  />
);

export default BookingSubmitButton;
