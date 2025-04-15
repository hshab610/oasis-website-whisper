
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PackageSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const PackageSelect = ({ value, onValueChange }: PackageSelectProps) => (
  <div>
    <Label htmlFor="package_type">Service Package</Label>
    <Select 
      name="package_type" 
      value={value} 
      onValueChange={onValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a service package" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Moving Services</SelectLabel>
          <SelectItem value="all-in-one">All-in-One Moving Package</SelectItem>
          <SelectItem value="local">Local Moving</SelectItem>
          <SelectItem value="long-distance">Long Distance Moving</SelectItem>
          <SelectItem value="furniture">Furniture Assembly</SelectItem>
          <SelectItem value="tv">TV Mounting</SelectItem>
          <SelectItem value="junk">Hauling & Junk Removal</SelectItem>
          <SelectItem value="donation">Donation Pickup & Dropoff</SelectItem>
          <SelectItem value="storage">Storage Solutions</SelectItem>
          <SelectItem value="other">Other Services</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default PackageSelect;
