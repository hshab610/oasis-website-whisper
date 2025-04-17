
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

const TimeSelect = ({ 
  value, 
  onChange, 
  error, 
  label = "Preferred Time", 
  required = false 
}: TimeSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="time" className={error ? "text-destructive" : ""}>
        {label} {required && "*"}
      </Label>
      
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          id="time"
          className={error ? "border-destructive" : ""}
        >
          <SelectValue placeholder="Select preferred time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="morning">Morning (8:00 AM - 12:00 PM)</SelectItem>
          <SelectItem value="afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
          <SelectItem value="evening">Evening (4:00 PM - 7:00 PM)</SelectItem>
          <SelectItem value="flexible">Flexible (Anytime)</SelectItem>
        </SelectContent>
      </Select>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default TimeSelect;
