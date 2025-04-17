
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TimeSelect from '../TimeSelect';

interface MoveDetailsFieldsProps {
  formData: {
    move_date: string;
    move_time: string;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (value: string) => void;
  errors?: {
    move_date?: string;
    move_time?: string;
    address?: string;
  };
}

const MoveDetailsFields = ({ 
  formData, 
  onChange, 
  onTimeChange,
  errors = {}
}: MoveDetailsFieldsProps) => {
  // Function to get tomorrow's date in YYYY-MM-DD format as the min date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div>
      <h4 className="text-lg font-medium mb-3">Move Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="move_date" className={errors.move_date ? "text-destructive" : ""}>Move Date *</Label>
          <Input 
            id="move_date"
            name="move_date"
            type="date"
            value={formData.move_date}
            onChange={onChange}
            min={getTomorrowDate()}
            className={errors.move_date ? "border-destructive" : ""}
            required
          />
          {errors.move_date && (
            <p className="text-sm text-destructive">{errors.move_date}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label className={errors.move_time ? "text-destructive" : ""}>Preferred Time *</Label>
          <TimeSelect 
            value={formData.move_time} 
            onChange={onTimeChange}
            error={errors.move_time}
          />
          {errors.move_time && (
            <p className="text-sm text-destructive">{errors.move_time}</p>
          )}
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address" className={errors.address ? "text-destructive" : ""}>Address *</Label>
          <Input 
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Where are you moving from?"
            className={errors.address ? "border-destructive" : ""}
            required
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoveDetailsFields;
