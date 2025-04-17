
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdditionalServicesProps {
  needsAssembly: boolean;
  assemblyItems: number;
  needsTvMount: boolean;
  needsJunkRemoval: boolean;
  onAssemblyChange: (value: boolean) => void;
  onAssemblyItemsChange: (value: number) => void;
  onTvMountChange: (value: boolean) => void;
  onJunkRemovalChange: (value: boolean) => void;
}

const AdditionalServices = ({
  needsAssembly,
  assemblyItems,
  needsTvMount,
  needsJunkRemoval,
  onAssemblyChange,
  onAssemblyItemsChange,
  onTvMountChange,
  onJunkRemovalChange
}: AdditionalServicesProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Additional Services</Label>
      
      <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
        <Checkbox 
          id="assembly" 
          checked={needsAssembly}
          onCheckedChange={() => onAssemblyChange(!needsAssembly)}
        />
        <div className="grid gap-1">
          <Label htmlFor="assembly" className="text-sm">Furniture Assembly</Label>
          <p className="text-xs text-muted-foreground">$90 (up to 5) / $120 (over 5 items)</p>
        </div>
      </div>
      
      {needsAssembly && (
        <div className="pl-7 -mt-1">
          <Label htmlFor="assemblyCount" className="text-xs">Items to assemble:</Label>
          <div className="flex items-center gap-2">
            <Select
              value={assemblyItems.toString()}
              onValueChange={(value) => onAssemblyItemsChange(parseInt(value))}
            >
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'item' : 'items'}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
        <Checkbox 
          id="tvMount" 
          checked={needsTvMount}
          onCheckedChange={() => onTvMountChange(!needsTvMount)}
        />
        <div className="grid gap-1">
          <Label htmlFor="tvMount" className="text-sm">TV Mounting</Label>
          <p className="text-xs text-muted-foreground">$60 flat rate (customer provides mount)</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
        <Checkbox 
          id="junkRemoval" 
          checked={needsJunkRemoval}
          onCheckedChange={() => onJunkRemovalChange(!needsJunkRemoval)}
        />
        <div className="grid gap-1">
          <Label htmlFor="junkRemoval" className="text-sm">Junk Removal</Label>
          <p className="text-xs text-muted-foreground">$150 flat rate (dumping fees may apply)</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalServices;
