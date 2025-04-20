
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

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
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const validatePhone = (phone: string) => {
    const re = /^[\d\+\-\(\) ]{10,15}$/;
    return re.test(phone.replace(/\s/g, ''));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setValidEmail(validateEmail(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format phone number as (xxx) xxx-xxxx while typing
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
      }
    }
    
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: value,
      },
    };

    onChange(newEvent);
    setValidPhone(validatePhone(value));
  };

  return (
    <div>
      <h4 className="text-lg font-medium mb-3">Your Contact Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>Full Name *</Label>
          <Input 
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter your full name"
            className={`text-base h-12 ${errors.name ? "border-destructive" : ""}`}
            required
            autoFocus
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>Email Address *</Label>
          <div className="relative">
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="Your email address"
              className={`text-base h-12 ${errors.email ? "border-destructive" : ""} ${validEmail && formData.email ? "pr-10 border-green-500" : ""}`}
              required
            />
            {validEmail && formData.email && (
              <CheckCircle className="absolute right-3 top-3.5 h-5 w-5 text-green-500" />
            )}
          </div>
          {errors.email ? (
            <p className="text-sm text-destructive">{errors.email}</p>
          ) : (
            validEmail && formData.email ? (
              <p className="text-sm text-green-500">Valid email format</p>
            ) : null
          )}
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="phone" className={errors.phone ? "text-destructive" : ""}>Phone Number *</Label>
          <div className="relative">
            <Input 
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="(XXX) XXX-XXXX"
              className={`text-base h-12 ${errors.phone ? "border-destructive" : ""} ${validPhone && formData.phone ? "pr-10 border-green-500" : ""}`}
              required
            />
            {validPhone && formData.phone && (
              <CheckCircle className="absolute right-3 top-3.5 h-5 w-5 text-green-500" />
            )}
          </div>
          {errors.phone ? (
            <p className="text-sm text-destructive">{errors.phone}</p>
          ) : (
            <p className="text-xs text-muted-foreground">Used only for move coordination, never for marketing</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFields;
