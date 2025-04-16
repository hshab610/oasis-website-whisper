
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFormspree } from '@/hooks/use-formspree';
import PersonalInfoFields from './booking/PersonalInfoFields';
import MoveDetailsFields from './booking/MoveDetailsFields';
import ServiceDetailsFields from './booking/ServiceDetailsFields';
import SubmitButton from './booking/SubmitButton';

const BookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    move_date: '',
    move_time: '',
    address: '',
    package_type: '',
    additional_services: '',
    notes: ''
  });
  
  // Using the same form ID as in ContactForm since it's working
  const { submitToFormspree, isSubmitting } = useFormspree('mnnpyppa');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    console.log("Submitting booking form with data:", formData);
    
    const success = await submitToFormspree(formData);
    
    if (success) {
      toast({
        title: "Booking request sent successfully!",
        description: "We'll get back to you as soon as possible to confirm your booking.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        move_date: '',
        move_time: '',
        address: '',
        package_type: '',
        additional_services: '',
        notes: ''
      });
    } else {
      toast({
        title: "Error submitting booking",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-border">
      <h3 className="text-2xl font-semibold mb-6">Request a Quote</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoFields 
          formData={formData} 
          onChange={handleChange} 
        />
        
        <MoveDetailsFields 
          formData={formData} 
          onChange={handleChange}
          onTimeChange={(value) => handleSelectChange('move_time', value)}
        />
        
        <ServiceDetailsFields 
          formData={formData} 
          onChange={handleChange}
          onPackageChange={(value) => handleSelectChange('package_type', value)}
        />
        
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default BookingForm;
