
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { CircleCheck, MessageSquare } from 'lucide-react';

interface MessageFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  minLength?: number;
  maxLength?: number;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

const MessageField = ({ 
  value, 
  onChange, 
  error, 
  minLength = 10, 
  maxLength = 1000,
  label = "Message",
  required = true,
  placeholder = "How can we help you with your move? Please provide details about your needs."
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

  const getInputClass = () => {
    if (error) return "border-destructive";
    if (charCount >= minLength) return "border-green-500";
    return "";
  };

  const getValidStatus = () => {
    if (charCount === 0) return null;
    if (charCount < minLength) {
      return <p className="text-xs text-amber-500">Please add at least {minLength - charCount} more characters</p>;
    }
    return <div className="flex items-center text-xs text-green-600"><CircleCheck className="mr-1 h-3 w-3" /> Good description</div>;
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="message" className={`flex items-center ${error ? "text-destructive" : ""}`}>
          <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <span className={`text-xs ${getCounterClass()}`}>
          {charCount}/{maxLength}
        </span>
      </div>
      
      <Textarea
        id="message"
        name="message"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`min-h-[120px] resize-y text-base ${getInputClass()}`}
        required
      />
      
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        getValidStatus()
      )}
    </div>
  );
};

export default MessageField;
