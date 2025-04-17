
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface AdditionalFeesProps {
  hasHeavyItems: boolean;
  heavyItemsCount: number;
  hasStairs: boolean;
  stairsCount: number;
  lastMinuteBooking: boolean;
  onHeavyItemsChange: (value: boolean) => void;
  onHeavyItemsCountChange: (value: number) => void;
  onStairsChange: (value: boolean) => void;
  onStairsCountChange: (value: number) => void;
  onLastMinuteBookingChange: (value: boolean) => void;
}

const AdditionalFees = ({
  hasHeavyItems,
  heavyItemsCount,
  hasStairs,
  stairsCount,
  lastMinuteBooking,
  onHeavyItemsChange,
  onHeavyItemsCountChange,
  onStairsChange,
  onStairsCountChange,
  onLastMinuteBookingChange
}: AdditionalFeesProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Potential Additional Fees</Label>
      
      <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
        <Checkbox 
          id="heavyItems" 
          checked={hasHeavyItems}
          onCheckedChange={() => onHeavyItemsChange(!hasHeavyItems)}
        />
        <div className="grid gap-1">
          <Label htmlFor="heavyItems" className="text-sm">Heavy Items (piano, safe, etc.)</Label>
          <p className="text-xs text-muted-foreground">+$50 fee per item</p>
        </div>
      </div>
      
      {hasHeavyItems && (
        <div className="pl-7 -mt-1">
          <Label htmlFor="heavyCount" className="text-xs">Number of heavy items:</Label>
          <div className="flex items-center gap-2 mt-1">
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 text-xs"
              onClick={() => onHeavyItemsCountChange(Math.max(1, heavyItemsCount - 1))}
            >-</Button>
            <span className="w-8 text-center">{heavyItemsCount}</span>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 text-xs"
              onClick={() => onHeavyItemsCountChange(heavyItemsCount + 1)}
            >+</Button>
          </div>
        </div>
      )}
      
      <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
        <Checkbox 
          id="stairs" 
          checked={hasStairs}
          onCheckedChange={() => onStairsChange(!hasStairs)}
        />
        <div className="grid gap-1">
          <Label htmlFor="stairs" className="text-sm">Stairs Involved</Label>
          <p className="text-xs text-muted-foreground">+$20 fee per staircase</p>
        </div>
      </div>
      
      {hasStairs && (
        <div className="pl-7 -mt-1">
          <Label htmlFor="stairsCount" className="text-xs">Number of staircases:</Label>
          <div className="flex items-center gap-2 mt-1">
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 text-xs"
              onClick={() => onStairsCountChange(Math.max(1, stairsCount - 1))}
            >-</Button>
            <span className="w-8 text-center">{stairsCount}</span>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 text-xs"
              onClick={() => onStairsCountChange(stairsCount + 1)}
            >+</Button>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
        <div className="grid gap-1">
          <Label htmlFor="lastMinute" className="text-sm">Last Minute Booking</Label>
          <p className="text-xs text-muted-foreground">+$75 fee (less than 48h notice)</p>
        </div>
        <Switch
          id="lastMinute"
          checked={lastMinuteBooking}
          onCheckedChange={onLastMinuteBookingChange}
        />
      </div>
    </div>
  );
};

export default AdditionalFees;
