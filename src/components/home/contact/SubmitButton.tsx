
import SubmitButton from '@/components/common/SubmitButton';

type SubmitButtonProps = {
  isSubmitting: boolean;
};

// This is a wrapper component that uses the common SubmitButton
const ContactSubmitButton = ({ isSubmitting }: SubmitButtonProps) => (
  <SubmitButton 
    isSubmitting={isSubmitting} 
    className="w-full"
    text="Send Message"
    loadingText="Sending..."
  />
);

export default ContactSubmitButton;
