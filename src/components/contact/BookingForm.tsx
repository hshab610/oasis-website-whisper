
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';

const BookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    move_date: '',
    move_time: '',
    address: '',
    package_type: '',
    additional_services: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Booking request submitted!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        move_date: '',
        move_time: '',
        address: '',
        package_type: '',
        additional_services: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error submitting form",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-border">
      <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
            />
            
            <FormField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Your Phone"
            />
          </div>

          <FormField
            label="Move Date"
            name="move_date"
            type="date"
            value={formData.move_date}
            onChange={handleChange}
            required
          />

          <div>
            <Label htmlFor="move_time">Preferred Time</Label>
            <Select 
              name="move_time" 
              value={formData.move_time} 
              onValueChange={(value) => handleSelectChange('move_time', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Time Slots</SelectLabel>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                  <SelectItem value="evening">Evening (4PM - 7PM)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <FormField
            label="Moving Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter the address"
          />

          <div>
            <Label htmlFor="package_type">Service Package</Label>
            <Select 
              name="package_type" 
              value={formData.package_type} 
              onValueChange={(value) => handleSelectChange('package_type', value)}
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
          
          <FormField
            label="Additional Services (Optional)"
            name="additional_services"
            value={formData.additional_services}
            onChange={handleChange}
            placeholder="Any additional services needed?"
          />
          
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea 
              id="notes" 
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any specific requirements or questions?" 
              rows={4} 
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>Sending...</span>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

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

export default BookingForm;
