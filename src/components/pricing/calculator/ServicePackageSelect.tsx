
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';

interface ServicePackageSelectProps {
  selectedPackage: string;
  onPackageChange: (value: string) => void;
}

const ServicePackageSelect = ({ selectedPackage, onPackageChange }: ServicePackageSelectProps) => {
  return (
    <div>
      <Label htmlFor="service-package" className="text-base mb-2 block">Select Service Package</Label>
      <RadioGroup
        id="service-package"
        value={selectedPackage}
        onValueChange={onPackageChange}
        className="grid grid-cols-1 gap-2"
      >
        <div className="flex items-start space-x-2 bg-primary/5 p-3 rounded-md">
          <RadioGroupItem value="all-in-one" id="all-in-one" className="mt-1" />
          <div className="grid gap-1">
            <Label htmlFor="all-in-one" className="font-medium flex items-center">
              All-in-One Package
              <span className="ml-2 inline-flex items-center gap-1 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                <Sparkles className="h-3 w-3" /> Best Value
              </span>
            </Label>
            <p className="text-sm text-muted-foreground">$249 + $100/hr</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 p-3 rounded-md border border-border">
          <RadioGroupItem value="local" id="local" className="mt-1" />
          <div className="grid gap-1">
            <Label htmlFor="local" className="font-medium">Local Moving</Label>
            <p className="text-sm text-muted-foreground">$120/hr (2hr minimum)</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 p-3 rounded-md border border-border">
          <RadioGroupItem value="custom" id="custom" className="mt-1" />
          <div className="grid gap-1">
            <Label htmlFor="custom" className="font-medium">Custom Services</Label>
            <p className="text-sm text-muted-foreground">Select individual services below</p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ServicePackageSelect;
