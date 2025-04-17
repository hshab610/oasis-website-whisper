
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PackageSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

const PackageSelect = ({ 
  value, 
  onChange, 
  error, 
  label = "Service Package", 
  required = false 
}: PackageSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="package" className={error ? "text-destructive" : ""}>
        {label} {required && "*"}
      </Label>
      
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          id="package"
          className={error ? "border-destructive" : ""}
        >
          <SelectValue placeholder="Select service package" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-in-one">All-in-One Package</SelectItem>
          <SelectItem value="local">Local Moving</SelectItem>
          <SelectItem value="long-distance">Long Distance Moving</SelectItem>
          <SelectItem value="custom">Custom Service</SelectItem>
        </SelectContent>
      </Select>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default PackageSelect;
