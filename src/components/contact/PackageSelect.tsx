
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
        <div className="flex items-center gap-2">
          <Label htmlFor="package" className={error ? "text-destructive" : ""}>
            {label} {required && <span className="text-destructive">*</span>}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                Select the service that best matches your moving needs. This helps us prepare an accurate quote.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
          <SelectItem value="all-in-one">All-in-One Package (Full Service Move)</SelectItem>
          <SelectItem value="local-small">Local Moving - Small (Studio/1BR)</SelectItem>
          <SelectItem value="local-medium">Local Moving - Medium (2-3BR)</SelectItem>
          <SelectItem value="local-large">Local Moving - Large (4+BR)</SelectItem>
          <SelectItem value="long-distance">Long Distance Moving (50+ miles)</SelectItem>
          <SelectItem value="commercial">Commercial Moving</SelectItem>
          <SelectItem value="packing-only">Packing Services Only</SelectItem>
          <SelectItem value="loading-only">Loading/Unloading Only</SelectItem>
          <SelectItem value="storage-short">Storage - Short Term (1-3 months)</SelectItem>
          <SelectItem value="storage-long">Storage - Long Term (3+ months)</SelectItem>
          <SelectItem value="senior">Senior Moving Specialist</SelectItem>
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
