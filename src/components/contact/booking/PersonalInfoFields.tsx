
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoFieldsProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

const PersonalInfoFields = ({ formData, onChange, errors = {} }: PersonalInfoFieldsProps) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-3">Personal Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>Full Name *</Label>
          <Input 
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Your full name"
            className={errors.name ? "border-destructive" : ""}
            required
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>Email Address *</Label>
          <Input 
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Your email address"
            className={errors.email ? "border-destructive" : ""}
            required
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="phone" className={errors.phone ? "text-destructive" : ""}>Phone Number *</Label>
          <Input 
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            placeholder="Your phone number"
            className={errors.phone ? "border-destructive" : ""}
            required
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFields;
