
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Sun, Sunset, Moon, Check } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  
  const timeOptions = [
    { id: 'morning', label: 'Morning (8AM-12PM)', icon: <Sun className="h-4 w-4 mb-1" /> },
    { id: 'afternoon', label: 'Afternoon (12PM-4PM)', icon: <Sun className="h-4 w-4 mb-1" /> },
    { id: 'evening', label: 'Evening (4PM-8PM)', icon: <Sunset className="h-4 w-4 mb-1" /> },
    { id: 'flexible', label: 'Flexible (Any Time)', icon: <Clock className="h-4 w-4 mb-1" /> }
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
          <Button
            key={option.id}
            type="button"
            variant={value === option.id ? "default" : "outline"}
            className={`h-12 flex flex-col items-center justify-center relative ${value === option.id ? 'bg-primary text-primary-foreground' : 'border-2 hover:bg-primary/10'}`}
            onClick={() => onChange(option.id)}
            aria-pressed={value === option.id}
            aria-describedby={error ? "time-error" : undefined}
          >
            {option.icon}
            <span className="text-xs mt-1">{option.label.split(' ')[0]}</span>
            {value === option.id && (
              <span className="absolute top-1 right-1">
                <Check className="h-3 w-3" />
              </span>
            )}
          </Button>
        ))}
      </div>
      
      {error && (
        <p id="time-error" className="text-sm text-destructive">{error}</p>
      )}
      
      {!error && value && (
        <p className="text-xs text-muted-foreground">
          {value === 'morning' && "Early morning slots are often available with shorter notice"}
          {value === 'afternoon' && "Our most popular time slot - book early!"}
          {value === 'evening' && "Limited evening availability - perfect for after work moves"}
          {value === 'flexible' && "We'll suggest the best available time for your date"}
        </p>
      )}
    </div>
  );
};

export default TimeSelect;
