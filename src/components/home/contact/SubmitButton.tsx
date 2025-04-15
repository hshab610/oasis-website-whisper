
import SubmitButton from '@/components/common/SubmitButton';

type SubmitButtonProps = {
  isSubmitting: boolean;
};

// This is a wrapper component that uses the common SubmitButton
// It's kept for backward compatibility
const ContactSubmitButton = ({ isSubmitting }: SubmitButtonProps) => (
  <SubmitButton 
    isSubmitting={isSubmitting} 
    className="w-full"
  />
);

export default ContactSubmitButton;
