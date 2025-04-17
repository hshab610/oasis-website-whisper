
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PackageSelect from '../PackageSelect';

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
  return (
    <div>
      <h4 className="text-lg font-medium mb-3">Service Details</h4>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className={errors.package_type ? "text-destructive" : ""}>Service Package *</Label>
          <PackageSelect 
            value={formData.package_type} 
            onChange={onPackageChange}
            error={errors.package_type}
          />
          {errors.package_type && (
            <p className="text-sm text-destructive">{errors.package_type}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="additional_services">Additional Services (Optional)</Label>
          <Textarea
            id="additional_services"
            name="additional_services"
            value={formData.additional_services}
            onChange={onChange}
            placeholder="Any additional services you need? (e.g., packing, storage, etc.)"
            className="min-h-[80px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes (Optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={onChange}
            placeholder="Any other details you'd like us to know?"
            className="min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsFields;
