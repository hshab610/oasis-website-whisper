
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function useFormspree(formId: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitToFormspree = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting form data:", data);
      
      // Enhanced validation
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Form data is empty');
      }

      if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
        throw new Error('Please enter a valid email address');
      }

      if (!data.name || data.name.trim().length < 2) {
        throw new Error('Please enter your name (at least 2 characters)');
      }
      
      if (data.message && data.message.trim().length < 10) {
        throw new Error('Please provide a more detailed message (at least 10 characters)');
      }
      
      // Form type detection
      const formType = data.move_date ? 'booking' : 'contact';
      
      // Prepare data with form type indicator
      const submissionData = {
        ...data,
        type: formType,
        submission_time: new Date().toISOString()
      };
      
      // Track submission methods
      let formspreeSuccess = false;
      let edgeFunctionSuccess = false;
      
      // First attempt Formspree submission (backup service)
      try {
        console.log("Submitting to Formspree...");
        const formspreeResponse = await fetch(`https://formspree.io/f/${formId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });
        
        if (formspreeResponse.ok) {
          console.log("Formspree submission successful");
          formspreeSuccess = true;
        } else {
          const formspreeError = await formspreeResponse.json();
          console.warn('Formspree submission failed:', formspreeError);
        }
      } catch (formspreeErr) {
        console.warn('Error during Formspree submission:', formspreeErr);
        // Continue with edge function even if Formspree fails
      }
      
      // Then attempt edge function submission for email delivery
      console.log("Submitting to edge function:", submissionData);
      const { data: result, error } = await supabase.functions.invoke('send-notification', {
        body: submissionData,
      });
      
      if (error) {
        console.warn('Edge function notification failed:', error);
        
        // If Formspree succeeded but edge function failed
        if (formspreeSuccess) {
          toast({
            title: "Form submitted",
            description: "Your submission was received, but there was a minor issue with email notifications. We'll still get your request.",
          });
          return true;
        }
        
        // If both failed
        throw new Error('Failed to submit form. Please try again later.');
      }
      
      edgeFunctionSuccess = true;
      console.log("Edge function submission successful", result);
      
      // Success toast
      toast({
        title: formType === 'contact' ? "Message sent successfully!" : "Booking request sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show error toast
      toast({
        title: "Error submitting form",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitToFormspree, isSubmitting };
}
