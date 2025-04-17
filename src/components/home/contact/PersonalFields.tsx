
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalFieldsProps {
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

const PersonalFields = ({ formData, onChange, errors = {} }: PersonalFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>Name *</Label>
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
        <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>Email *</Label>
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
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input 
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          placeholder="Your phone number"
        />
      </div>
    </div>
  );
};

export default PersonalFields;
