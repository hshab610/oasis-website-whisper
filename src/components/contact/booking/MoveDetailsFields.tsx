
import FormField from '../FormField';
import TimeSelect from '../TimeSelect';

type MoveDetailsFieldsProps = {
  formData: {
    move_date: string;
    move_time: string;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (value: string) => void;
};

const MoveDetailsFields = ({ formData, onChange, onTimeChange }: MoveDetailsFieldsProps) => (
  <div className="space-y-4">
    <FormField
      label="Move Date"
      name="move_date"
      type="date"
      value={formData.move_date}
      onChange={onChange}
      required
    />

    <TimeSelect
      value={formData.move_time}
      onValueChange={onTimeChange}
    />

    <FormField
      label="Moving Address"
      name="address"
      value={formData.address}
      onChange={onChange}
      required
      placeholder="Enter the address"
    />
  </div>
);

export default MoveDetailsFields;
