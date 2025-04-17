
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
      
      // Basic validation
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Form data is empty');
      }

      if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
        throw new Error('Please enter a valid email address');
      }

      if (!data.name || data.name.trim().length < 2) {
        throw new Error('Please enter your name (at least 2 characters)');
      }
      
      // First submit to Formspree for their email service
      const formspreeResponse = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!formspreeResponse.ok) {
        const error = await formspreeResponse.json();
        console.error('Formspree error:', error);
        throw new Error('Failed to submit form to Formspree');
      }
      
      // Then submit to our edge function to send emails to additional recipients
      const formType = data.move_date ? 'booking' : 'contact';
      
      // Prepare data for edge function with form type indicator
      const edgeFunctionData = {
        ...data,
        type: formType
      };
      
      // Call the edge function to send notification emails
      console.log("Sending to edge function:", edgeFunctionData);
      const { data: result, error } = await supabase.functions.invoke('send-notification', {
        body: edgeFunctionData,
      });
      
      if (error) {
        console.warn('Edge function notification failed:', error);
        // We still return true since the primary submission to Formspree succeeded
        toast({
          title: "Form submitted",
          description: "Your submission was received, but there was a minor issue with email notifications. We'll still get your request.",
        });
        return true;
      }
      
      console.log("Edge function submission successful", result);
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
