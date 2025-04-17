
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

interface MessageFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  minLength?: number;
  maxLength?: number;
  label?: string;
  required?: boolean;
}

const MessageField = ({ 
  value, 
  onChange, 
  error, 
  minLength = 10, 
  maxLength = 1000,
  label = "Message",
  required = true
}: MessageFieldProps) => {
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
    setCharCount(value.length);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Allow input up to max length
    if (e.target.value.length <= maxLength) {
      onChange(e);
    }
  };

  const getCounterClass = () => {
    if (charCount === 0) return "text-muted-foreground";
    if (charCount < minLength) return "text-amber-500";
    if (charCount > maxLength * 0.9) return "text-orange-500";
    return "text-green-600";
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="message" className={error ? "text-destructive" : ""}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <span className={`text-xs ${getCounterClass()}`}>
          {charCount}/{maxLength} characters {charCount < minLength && !isFocused ? `(minimum ${minLength})` : ''}
        </span>
      </div>
      
      <Textarea
        id="message"
        name="message"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="How can we help you with your move? Please provide details about your needs."
        className={`min-h-[120px] resize-y ${error ? "border-destructive" : ""}`}
        required
      />
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default MessageField;
