
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Home, Truck } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface EstimatorFormProps {
  packageType: string;
  bedrooms: number;
  distance: number;
  onPackageChange: (value: string) => void;
  onBedroomsChange: (value: number) => void;
  onDistanceChange: (value: number) => void;
  onCalculate: () => void;
  isCalculating: boolean;
  calculationProgress: number;
}

const EstimatorForm = ({
  packageType,
  bedrooms,
  distance,
  onPackageChange,
  onBedroomsChange,
  onDistanceChange,
  onCalculate,
  isCalculating,
  calculationProgress
}: EstimatorFormProps) => {
  // Define bedroom options for quick selection
  const bedroomOptions = [
    { value: 0, label: "Studio" },
    { value: 1, label: "1 Bedroom" },
    { value: 2, label: "2 Bedrooms" },
    { value: 3, label: "3 Bedrooms" },
    { value: 4, label: "4 Bedrooms" },
    { value: 5, label: "5+ Bedrooms" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="service-package" className="text-base mb-2 block">
          Service Package
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant={packageType === "all-in-one" ? "default" : "outline"}
            className={`h-auto py-3 flex flex-col items-center justify-center ${packageType === "all-in-one" ? 'bg-primary text-primary-foreground' : 'border-2 hover:bg-primary/10'}`}
            onClick={() => onPackageChange("all-in-one")}
          >
            <span className="text-xs font-normal">All-in-One</span>
            <span className="text-xs font-medium mt-1">Premium</span>
          </Button>
          <Button
            type="button"
            variant={packageType === "local" ? "default" : "outline"}
            className={`h-auto py-3 flex flex-col items-center justify-center ${packageType === "local" ? 'bg-primary text-primary-foreground' : 'border-2 hover:bg-primary/10'}`}
            onClick={() => onPackageChange("local")}
          >
            <span className="text-xs font-normal">Local Move</span>
            <span className="text-xs font-medium mt-1">Standard</span>
          </Button>
          <Button
            type="button"
            variant={packageType === "long-distance" ? "default" : "outline"}
            className={`h-auto py-3 flex flex-col items-center justify-center ${packageType === "long-distance" ? 'bg-primary text-primary-foreground' : 'border-2 hover:bg-primary/10'}`}
            onClick={() => onPackageChange("long-distance")}
          >
            <span className="text-xs font-normal">Long Distance</span>
            <span className="text-xs font-medium mt-1">Custom</span>
          </Button>
        </div>
      </div>
      
      <div>
        <Label htmlFor="bedrooms" className="text-base mb-2 block">
          Home Size
        </Label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {bedroomOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={bedrooms === option.value ? "default" : "outline"}
              className={`h-auto py-2 flex flex-col items-center justify-center ${bedrooms === option.value ? 'bg-primary text-primary-foreground' : 'border-2 hover:bg-primary/10'}`}
              onClick={() => onBedroomsChange(option.value)}
            >
              <Home className="h-3 w-3 mb-1" />
              <span className="text-xs">{option.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <Label htmlFor="distance" className="text-base mb-2 block">
          Moving Distance: {distance} miles
        </Label>
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <Slider
            id="distance"
            min={1}
            max={100}
            step={1}
            value={[distance]}
            onValueChange={([value]) => onDistanceChange(value)}
            className="flex-1"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {distance < 50 ? "Local Move" : "Long Distance Move"}
        </p>
      </div>

      <Button 
        onClick={onCalculate} 
        className="w-full bg-primary hover:bg-primary/90 h-12 font-bold text-base"
        disabled={isCalculating}
      >
        Get Instant Estimate
      </Button>
    </div>
  );
};

export default EstimatorForm;
