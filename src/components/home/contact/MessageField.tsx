
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type MessageFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const MessageField = ({ value, onChange }: MessageFieldProps) => (
  <div>
    <Label htmlFor="message" className="block text-sm font-medium mb-2">
      Message
    </Label>
    <Textarea
      id="message"
      name="message"
      value={value}
      onChange={onChange}
      placeholder="How can we help you?"
      rows={4}
      required
    />
  </div>
);

export default MessageField;
