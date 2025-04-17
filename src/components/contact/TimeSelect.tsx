
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const TimeSelect = ({ value, onChange, error }: TimeSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={error ? "border-destructive" : ""}>
        <SelectValue placeholder="Select preferred time" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="morning">Morning (8:00 AM - 12:00 PM)</SelectItem>
        <SelectItem value="afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
        <SelectItem value="evening">Evening (4:00 PM - 7:00 PM)</SelectItem>
        <SelectItem value="flexible">Flexible (Anytime)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;
