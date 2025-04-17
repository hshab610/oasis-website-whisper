
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
  description?: string;
}

const PackageSelect = ({ 
  value, 
  onChange, 
  error, 
  label = "Service Package", 
  required = false,
  description
}: PackageSelectProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor="package" className={error ? "text-destructive" : ""}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          id="package"
          className={`w-full ${error ? "border-destructive" : ""}`}
        >
          <SelectValue placeholder="Select service package" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectItem value="all-in-one">All-in-One Package</SelectItem>
          <SelectItem value="local">Local Moving</SelectItem>
          <SelectItem value="long-distance">Long Distance Moving</SelectItem>
          <SelectItem value="commercial">Commercial Moving</SelectItem>
          <SelectItem value="packing">Packing Services</SelectItem>
          <SelectItem value="storage">Storage Services</SelectItem>
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
