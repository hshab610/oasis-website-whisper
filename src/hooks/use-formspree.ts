
import { useState } from 'react';

export function useFormspree(formId: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitToFormspree = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitToFormspree, isSubmitting };
}
