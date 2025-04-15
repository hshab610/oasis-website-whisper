
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimeSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const TimeSelect = ({ value, onValueChange }: TimeSelectProps) => (
  <div>
    <Label htmlFor="move_time">Preferred Time</Label>
    <Select 
      name="move_time" 
      value={value} 
      onValueChange={onValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select preferred time" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time Slots</SelectLabel>
          <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
          <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
          <SelectItem value="evening">Evening (4PM - 7PM)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default TimeSelect;
