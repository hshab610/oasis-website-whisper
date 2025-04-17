
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface MessageFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const MessageField = ({ value, onChange, error }: MessageFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="message" className={error ? "text-destructive" : ""}>Message *</Label>
      <Textarea
        id="message"
        name="message"
        value={value}
        onChange={onChange}
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
