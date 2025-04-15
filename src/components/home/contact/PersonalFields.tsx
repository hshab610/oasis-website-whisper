
import FormField from '@/components/contact/FormField';

type PersonalFieldsProps = {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const PersonalFields = ({ formData, onChange }: PersonalFieldsProps) => (
  <div className="space-y-6">
    <FormField
      label="Full Name"
      name="name"
      value={formData.name}
      onChange={onChange}
      required
      placeholder="Your Name"
    />
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        required
        placeholder="Your Email"
      />
      
      <FormField
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        placeholder="Your Phone (Optional)"
      />
    </div>
  </div>
);

export default PersonalFields;
