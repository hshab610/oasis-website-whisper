
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock, Sun, Sunset, Moon, Check } from "lucide-react";
import { motion } from "framer-motion";

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
  description?: string;
}

const TimeSelect = ({ 
  value, 
  onChange, 
  error, 
  label = "Preferred Time", 
  required = false,
  description
}: TimeSelectProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  
  const timeOptions = [
    { id: 'morning', label: 'Morning (8AM-12PM)', icon: <Sun className="h-4 w-4 mb-1" />, hint: 'Early morning slots are often available with shorter notice' },
    { id: 'afternoon', label: 'Afternoon (12PM-4PM)', icon: <Sun className="h-4 w-4 mb-1" />, hint: 'Our most popular time slot - book early!' },
    { id: 'evening', label: 'Evening (4PM-8PM)', icon: <Sunset className="h-4 w-4 mb-1" />, hint: 'Limited evening availability - perfect for after work moves' },
    { id: 'flexible', label: 'Flexible (Any Time)', icon: <Clock className="h-4 w-4 mb-1" />, hint: 'We\'ll suggest the best available time for your date' }
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor="time" className={error ? "text-destructive" : ""}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {timeOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setHovered(option.id)}
            onHoverEnd={() => setHovered(null)}
          >
            <Button
              type="button"
              variant={value === option.id ? "default" : "outline"}
              className={`h-12 w-full flex flex-col items-center justify-center relative ${value === option.id ? 'bg-primary text-primary-foreground' : 'border-2 hover:bg-primary/10'}`}
              onClick={() => onChange(option.id)}
              aria-pressed={value === option.id}
              aria-describedby={error ? "time-error" : undefined}
            >
              {option.icon}
              <span className="text-xs mt-1">{option.label.split(' ')[0]}</span>
              {value === option.id && (
                <motion.span 
                  className="absolute top-1 right-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Check className="h-3 w-3" />
                </motion.span>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
      
      {error ? (
        <p id="time-error" className="text-sm text-destructive">{error}</p>
      ) : (
        <div className="min-h-[20px]">
          {!error && value && (
            <motion.p 
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {timeOptions.find(option => option.id === value)?.hint}
            </motion.p>
          )}
          {!error && hovered && hovered !== value && (
            <motion.p 
              className="text-xs text-muted-foreground/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {timeOptions.find(option => option.id === hovered)?.hint}
            </motion.p>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeSelect;
