
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PackageSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PackageSelect = ({ value, onChange, error }: PackageSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={error ? "border-destructive" : ""}>
        <SelectValue placeholder="Select service package" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all-in-one">All-in-One Package</SelectItem>
        <SelectItem value="local">Local Moving</SelectItem>
        <SelectItem value="long-distance">Long Distance Moving</SelectItem>
        <SelectItem value="custom">Custom Service</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default PackageSelect;
