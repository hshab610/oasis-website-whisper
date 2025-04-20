
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  icon?: React.ReactNode;
  validation?: (value: string) => boolean;
  errorMessage?: string;
  helpText?: string;
};

const FormField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  type = "text",
  icon,
  validation,
  errorMessage,
  helpText
}: FormFieldProps) => {
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (validation) {
      setIsValid(validation(e.target.value));
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Input 
          id={name} 
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          placeholder={placeholder}
          className={`h-12 text-base ${validation && isValid && value ? "pr-10 border-green-500" : ""}`}
        />
        {validation && isValid && value && (
          <CheckCircle className="absolute right-3 top-3.5 h-5 w-5 text-green-500" />
        )}
      </div>
      {validation && isTouched && value && !isValid && errorMessage ? (
        <p className="text-sm text-destructive">{errorMessage}</p>
      ) : helpText ? (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      ) : null}
    </div>
  );
};

export default FormField;
