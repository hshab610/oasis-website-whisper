
import { Home, Truck, Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface MoveBasicInfoProps {
  bedrooms: number;
  distance: number;
  onBedroomsChange: (value: number) => void;
  onDistanceChange: (value: number) => void;
}

const MoveBasicInfo = ({ 
  bedrooms, 
  distance, 
  onBedroomsChange, 
  onDistanceChange 
}: MoveBasicInfoProps) => {
  // Helper text for better user understanding
  const getDistanceHelperText = () => {
    if (distance < 50) {
      return "Local: 1-50 miles";
    } else {
      return "Long Distance: 50+ miles";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="bedrooms" className="text-base">Number of Bedrooms</Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Larger homes require more time and resources</p>
            </TooltipContent>
          </Tooltip>
        </div>
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
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="distance" className="text-base">
            Moving Distance: {distance} miles
          </Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Moving distance affects travel time and costs</p>
            </TooltipContent>
          </Tooltip>
        </div>
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
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">{getDistanceHelperText()}</span>
          <span className="text-xs font-medium">{distance} miles</span>
        </div>
      </div>
    </div>
  );
};

export default MoveBasicInfo;
