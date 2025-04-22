
import { Check, Calendar, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

interface SuccessMessageProps {
  onRequestAnother: () => void;
}

const SuccessMessage = ({ onRequestAnother }: SuccessMessageProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-12 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-primary/10 p-4 rounded-full mb-6"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.2
        }}
      >
        <Check className="h-12 w-12 text-primary" />
      </motion.div>
      
      <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        Your booking request has been received. We'll get back to you within 24 hours to confirm your move details.
      </p>
      
      <div className="bg-primary/5 p-5 rounded-lg mb-6 w-full max-w-md">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <Calendar className="h-5 w-5 text-primary" />
          <p className="font-medium">What happens next?</p>
        </div>
        <ul className="text-sm text-left space-y-2">
          <li className="flex items-start">
            <span className="inline-block bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">1</span>
            <span>Our team will review your request</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">2</span>
            <span>We'll confirm availability for your selected date/time</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">3</span>
            <span>You'll receive a detailed quote with all pricing</span>
          </li>
        </ul>
      </div>
      
      <button 
        onClick={onRequestAnother} 
        className="group px-5 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium flex items-center justify-center transition-all"
      >
        Request Another Quote
        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};

export default SuccessMessage;
