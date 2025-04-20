
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
import { Clock } from "lucide-react";

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
    { id: 'morning', label: 'Morning (8AM-12PM)' },
    { id: 'afternoon', label: 'Afternoon (12PM-4PM)' },
    { id: 'evening', label: 'Evening (4PM-8PM)' },
    { id: 'flexible', label: 'Flexible (Any Time)' }
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
            className={`h-12 flex flex-col items-center justify-center ${value === option.id ? 'bg-primary text-primary-foreground' : 'border-2 hover:bg-primary/10'}`}
            onClick={() => onChange(option.id)}
          >
            <span className="text-sm">{option.label}</span>
          </Button>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default TimeSelect;
