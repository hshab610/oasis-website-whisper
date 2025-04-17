
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

interface MessageFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  minLength?: number;
  maxLength?: number;
}

const MessageField = ({ 
  value, 
  onChange, 
  error, 
  minLength = 10, 
  maxLength = 1000 
}: MessageFieldProps) => {
  const [charCount, setCharCount] = useState(0);
  
  useEffect(() => {
    setCharCount(value.length);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Allow input up to max length
    if (e.target.value.length <= maxLength) {
      onChange(e);
    }
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="message" className={error ? "text-destructive" : ""}>Message *</Label>
        <span className={`text-xs ${charCount < minLength ? 'text-destructive' : 'text-muted-foreground'}`}>
          {charCount}/{maxLength} characters {charCount < minLength ? `(minimum ${minLength})` : ''}
        </span>
      </div>
      
      <Textarea
        id="message"
        name="message"
        value={value}
        onChange={handleChange}
        placeholder="How can we help you?"
        className={`min-h-[120px] ${error ? "border-destructive" : ""}`}
        required
      />
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default MessageField;
