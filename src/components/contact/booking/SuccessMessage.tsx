
import { Check } from "lucide-react";

interface SuccessMessageProps {
  onRequestAnother: () => void;
}

const SuccessMessage = ({ onRequestAnother }: SuccessMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-primary/10 p-4 rounded-full mb-6">
        <Check className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Your booking request has been received. We'll get back to you within 24 hours to confirm your move details.
      </p>
      <button 
        onClick={onRequestAnother} 
        className="px-5 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium"
      >
        Request Another Quote
      </button>
    </div>
  );
};

export default SuccessMessage;
