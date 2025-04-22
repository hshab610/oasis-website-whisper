
import { Check, Calendar, ArrowRight, Mail } from "lucide-react";
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
        className="bg-primary/10 p-4 rounded-full mb-6 relative"
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
        <motion.div 
          className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Mail className="h-3.5 w-3.5 text-white" />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Your booking request has been received. We'll get back to you within 24 hours to confirm your move details.
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-primary/5 p-5 rounded-lg mb-7 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-center space-x-4 mb-2">
          <Calendar className="h-5 w-5 text-primary" />
          <p className="font-medium">What happens next?</p>
        </div>
        <ul className="text-sm text-left space-y-2">
          <motion.li 
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-block bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">1</span>
            <span>Our team will review your request</span>
          </motion.li>
          <motion.li 
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="inline-block bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">2</span>
            <span>We'll confirm availability for your selected date/time</span>
          </motion.li>
          <motion.li 
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="inline-block bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">3</span>
            <span>You'll receive a detailed quote with all pricing</span>
          </motion.li>
        </ul>
      </motion.div>
      
      <motion.button 
        onClick={onRequestAnother} 
        className="group px-5 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium flex items-center justify-center transition-all shadow-md hover:shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        Request Another Quote
        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
};

export default SuccessMessage;
