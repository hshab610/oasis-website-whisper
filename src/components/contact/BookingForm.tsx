
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import FormField from './FormField';
import TimeSelect from './TimeSelect';
import PackageSelect from './PackageSelect';
import { handleFormSubmission } from '@/utils/form';

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
    console.log("Form submitted with data:", formData);
    
    const success = await handleFormSubmission(
      formData,
      setIsSubmitting,
      toast,
      async (data) => {
        return await supabase.from('bookings').insert([data]);
      }
    );

    if (success) {
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

          <TimeSelect
            value={formData.move_time}
            onValueChange={(value) => handleSelectChange('move_time', value)}
          />

          <FormField
            label="Moving Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter the address"
          />

          <PackageSelect
            value={formData.package_type}
            onValueChange={(value) => handleSelectChange('package_type', value)}
          />
          
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

export default BookingForm;
