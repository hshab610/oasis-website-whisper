
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { handleFormSubmission } from '@/utils/form';
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
    
    if (isSubmitting) return;
    
    console.log("Submitting booking form with data:", formData);
    
    const success = await handleFormSubmission(
      formData,
      setIsSubmitting,
      toast,
      async (data) => {
        console.log("Calling Supabase functions with data:", data);
        try {
          // First store in database
          const dbResult = await supabase.from('bookings').insert([{
            ...data,
            move_date: data.move_date ? new Date(data.move_date).toISOString() : null
          }]);
          
          console.log("Database insertion result:", dbResult);
          
          if (dbResult.error) {
            console.error("Database error:", dbResult.error);
            return { error: dbResult.error, data: null };
          }

          // Then send email notification
          const emailResult = await supabase.functions.invoke('send-notification', {
            body: { 
              type: 'booking',
              ...data
            }
          });
          console.log("Email notification result:", emailResult);
          
          if (emailResult.error) {
            console.error("Email notification error:", emailResult.error);
            return { error: emailResult.error, data: null };
          }

          return { error: null, data: dbResult.data };
        } catch (error) {
          console.error("Error in booking submission process:", error);
          return { error, data: null };
        }
      }
    );

    console.log("Form submission completed with success:", success);
    
    if (success) {
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
