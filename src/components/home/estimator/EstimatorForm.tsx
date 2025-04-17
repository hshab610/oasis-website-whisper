
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
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="service-package" className="text-base mb-2 block">
          Select Service Package
        </Label>
        <Select
          value={packageType}
          onValueChange={onPackageChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select package" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-in-one">
              All-in-One Package ($249 + $100/hr)
            </SelectItem>
            <SelectItem value="local">
              Local Moving ($120/hr)
            </SelectItem>
            <SelectItem value="long-distance">
              Long Distance Moving (Custom)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="bedrooms" className="text-base mb-2 block">
          Number of Bedrooms
        </Label>
        <div className="flex items-center">
          <Home className="mr-2 h-4 w-4 text-muted-foreground" />
          <Select
            value={bedrooms.toString()}
            onValueChange={(value) => onBedroomsChange(parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Studio</SelectItem>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3 Bedrooms</SelectItem>
              <SelectItem value="4">4 Bedrooms</SelectItem>
              <SelectItem value="5">5+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
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
          Local: 1-50 miles, Long Distance: 50+ miles
        </p>
      </div>

      <Button 
        onClick={onCalculate} 
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isCalculating}
      >
        Calculate Estimate
      </Button>
    </div>
  );
};

export default EstimatorForm;
