
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Home, Box, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceDetailsFieldsProps {
  formData: {
    package_type: string;
    additional_services: string;
    notes: string;
  };
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPackageChange: (value: string) => void;
  errors?: {
    package_type?: string;
  };
}

const ServiceDetailsFields = ({ 
  formData, 
  onChange, 
  onPackageChange,
  errors = {}
}: ServiceDetailsFieldsProps) => {
  const packageOptions = [
    { id: 'local-small', label: 'Studio/1BR', icon: <Home className="h-4 w-4 mb-1" /> },
    { id: 'local-medium', label: '2-3BR', icon: <Home className="h-4 w-4 mb-1" /> },
    { id: 'local-large', label: '4+BR', icon: <Home className="h-4 w-4 mb-1" /> },
    { id: 'all-in-one', label: 'All-in-One Package', icon: <Box className="h-4 w-4 mb-1" /> },
    { id: 'long-distance', label: 'Long Distance', icon: <Truck className="h-4 w-4 mb-1" /> }
  ];

  return (
    <div>
      <h4 className="text-lg font-medium mb-3">Service Details</h4>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className={errors.package_type ? "text-destructive" : ""}>Home Size & Service Type *</Label>
          
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {packageOptions.map((option) => (
              <Button
                key={option.id}
                type="button"
                variant={formData.package_type === option.id ? "default" : "outline"}
                className={`h-auto py-3 flex flex-col items-center justify-center ${formData.package_type === option.id ? 'bg-primary text-primary-foreground' : 'border-2 hover:bg-primary/10'}`}
                onClick={() => onPackageChange(option.id)}
              >
                {option.icon}
                <span className="text-xs mt-1">{option.label}</span>
              </Button>
            ))}
          </div>
          
          {errors.package_type && (
            <p className="text-sm text-destructive">{errors.package_type}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="additional_services">Special Items or Requests (Optional)</Label>
          <Textarea
            id="additional_services"
            name="additional_services"
            value={formData.additional_services}
            onChange={onChange}
            placeholder="Ex: Piano, pool table, or need packing services"
            className="min-h-[80px] text-base"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Anything else we should know? (Optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={onChange}
            placeholder="Special instructions, access details, etc."
            className="min-h-[80px] text-base"
          />
          <p className="text-xs text-muted-foreground">You can share more details after booking.</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsFields;
