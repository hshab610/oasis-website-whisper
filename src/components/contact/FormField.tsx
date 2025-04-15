
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

const FormField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  type = "text" 
}: FormFieldProps) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Input 
      id={name} 
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default FormField;
