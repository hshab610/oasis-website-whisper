
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FormField from '../FormField';
import PackageSelect from '../PackageSelect';

type ServiceDetailsFieldsProps = {
  formData: {
    package_type: string;
    additional_services: string;
    notes: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPackageChange: (value: string) => void;
};

const ServiceDetailsFields = ({ formData, onChange, onPackageChange }: ServiceDetailsFieldsProps) => (
  <div className="space-y-4">
    <PackageSelect
      value={formData.package_type}
      onValueChange={onPackageChange}
    />
    
    <FormField
      label="Additional Services (Optional)"
      name="additional_services"
      value={formData.additional_services}
      onChange={onChange}
      placeholder="Any additional services needed?"
    />
    
    <div>
      <Label htmlFor="notes">Additional Notes (Optional)</Label>
      <Textarea 
        id="notes" 
        name="notes"
        value={formData.notes}
        onChange={onChange}
        placeholder="Any specific requirements or questions?" 
        rows={4} 
      />
    </div>
  </div>
);

export default ServiceDetailsFields;
