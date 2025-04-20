
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TimeSelect from '../TimeSelect';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useState } from 'react';

interface MoveDetailsFieldsProps {
  formData: {
    move_date: string;
    move_time: string;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (value: string) => void;
  errors?: {
    move_date?: string;
    move_time?: string;
    address?: string;
  };
}

const MoveDetailsFields = ({ 
  formData, 
  onChange, 
  onTimeChange,
  errors = {}
}: MoveDetailsFieldsProps) => {
  const [isFlexible, setIsFlexible] = useState(false);
  
  // Function to get tomorrow's date in YYYY-MM-DD format as the min date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleFlexibleToggle = () => {
    setIsFlexible(!isFlexible);
    if (!isFlexible) {
      // If toggling to flexible, reset the time selection
      onTimeChange("flexible");
    }
  };

  return (
    <div>
      <h4 className="text-lg font-medium mb-3">Move Details</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="flexible-date" className="cursor-pointer">My move date is flexible</Label>
            <Switch 
              id="flexible-date" 
              checked={isFlexible} 
              onCheckedChange={handleFlexibleToggle}
            />
          </div>
          <span className="text-xs text-muted-foreground">Flexible dates may get better rates</span>
        </div>

        {!isFlexible ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="move_date" className={errors.move_date ? "text-destructive" : ""}>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  Move Date *
                </div>
              </Label>
              <Input 
                id="move_date"
                name="move_date"
                type="date"
                value={formData.move_date}
                onChange={onChange}
                min={getTomorrowDate()}
                className={`text-base h-12 ${errors.move_date ? "border-destructive" : ""}`}
                required
              />
              {errors.move_date && (
                <p className="text-sm text-destructive">{errors.move_date}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className={errors.move_time ? "text-destructive" : ""}>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  Preferred Time *
                </div>
              </Label>
              <TimeSelect 
                value={formData.move_time} 
                onChange={onTimeChange}
                error={errors.move_time}
              />
              {errors.move_time && (
                <p className="text-sm text-destructive">{errors.move_time}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm">We'll contact you to schedule the best time for your move.</p>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="address" className={errors.address ? "text-destructive" : ""}>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              Moving From Address *
            </div>
          </Label>
          <Input 
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Enter your current address"
            className={`text-base h-12 ${errors.address ? "border-destructive" : ""}`}
            required
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address}</p>
          )}
          <p className="text-xs text-muted-foreground">Exact destination can be provided later</p>
        </div>
      </div>
    </div>
  );
};

export default MoveDetailsFields;
