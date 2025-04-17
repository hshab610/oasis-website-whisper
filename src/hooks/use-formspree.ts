
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleFormSubmission } from '@/utils/form';

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
      
      // First submit to Formspree for their email service
      const formspreeResponse = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!formspreeResponse.ok) {
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
      const supabaseResult = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(edgeFunctionData),
      });
      
      if (!supabaseResult.ok) {
        console.warn('Edge function notification failed, but form data was saved in Formspree');
        // We still return true since the primary submission to Formspree succeeded
      } else {
        console.log("Edge function submission successful");
      }
      
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
