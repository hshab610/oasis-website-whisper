
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import FormField from '@/components/contact/FormField';
import { handleFormSubmission } from '@/utils/form';

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
    console.log("Home contact form submitted with data:", formData);
    
    // Prevent multiple submissions
    if (isSubmitting) {
      console.log("Form is already submitting, preventing duplicate submission");
      return;
    }
    
    try {
      const success = await handleFormSubmission(
        formData,
        setIsSubmitting,
        toast,
        async (data) => {
          console.log("Submitting data to Supabase:", data);
          try {
            // First store in database
            const dbResult = await supabase.from('contact_messages').insert([data]);
            console.log("Database insert result:", dbResult);
            if (dbResult.error) {
              console.error("Database insert error:", dbResult.error);
              throw dbResult.error;
            }

            // Then send email notification
            const emailResult = await supabase.functions.invoke('send-notification', {
              body: { 
                type: 'contact',
                ...data
              }
            });
            console.log("Email notification result:", emailResult);
            
            if (emailResult.error) {
              console.error("Email notification error:", emailResult.error);
              throw emailResult.error;
            }

            return { error: null, data: dbResult.data };
          } catch (error) {
            console.error("Error in form submission:", error);
            return { error: error, data: null };
          }
        }
      );

      console.log("Form submission success:", success);

      if (success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }
    } catch (error) {
      console.error("Unexpected error in handleSubmit:", error);
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
                placeholder="Your Phone (Optional)"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={4}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
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
      </div>
    </section>
  );
};

export default ContactForm;
