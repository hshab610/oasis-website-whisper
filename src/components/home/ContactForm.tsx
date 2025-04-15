
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { handleFormSubmission } from '@/utils/form';
import PersonalFields from './contact/PersonalFields';
import MessageField from './contact/MessageField';
import SubmitButton from './contact/SubmitButton';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    console.log("Submitting contact form with data:", formData);
    
    const success = await handleFormSubmission(
      formData,
      setIsSubmitting,
      toast,
      async (data) => {
        console.log("Calling Supabase functions with data:", data);
        try {
          const dbResult = await supabase.from('contact_messages').insert([data]);
          console.log("Database insertion result:", dbResult);
          
          if (dbResult.error) {
            console.error("Database error:", dbResult.error);
            return { error: dbResult.error, data: null };
          }

          const emailResult = await supabase.functions.invoke('send-notification', {
            body: { 
              type: 'contact',
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
          console.error("Error in form submission process:", error);
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
        message: ''
      });
    }
  };

  return (
    <section id="contact" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground">
            Have questions about our services? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-md border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <PersonalFields 
              formData={formData}
              onChange={handleChange}
            />
            
            <MessageField
              value={formData.message}
              onChange={handleChange}
            />
            
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
