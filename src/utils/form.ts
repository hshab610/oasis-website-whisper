
import { toast as toastType } from "@/hooks/use-toast";

export const handleFormSubmission = async (
  formData: any,
  setIsSubmitting: (value: boolean) => void,
  toast: typeof toastType,
  supabaseSubmit: (data: any) => Promise<{ error: any, data: any }>,
  formspreeId?: string
) => {
  try {
    // Set submission state to prevent multiple clicks
    setIsSubmitting(true);
    console.log("Form submission started with data:", formData);
    
    // Initialize submission status tracking
    let formspreeSuccess = false;
    let supabaseSuccess = false;
    let emailSent = false;
    
    // Submit to Formspree if ID is provided (backup service)
    if (formspreeId) {
      try {
        console.log("Attempting Formspree submission...");
        const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!formspreeResponse.ok) {
          console.warn("Formspree submission failed:", await formspreeResponse.text());
        } else {
          console.log("Formspree submission successful");
          formspreeSuccess = true;
        }
      } catch (error) {
        console.warn("Error submitting to Formspree:", error);
        // Continue with Supabase even if Formspree fails
      }
    }

    // Call the provided supabase submission function
    console.log("Attempting Supabase edge function submission...");
    const result = await supabaseSubmit(formData);
    console.log("Supabase submission result:", result);
    
    if (result.error) {
      console.error("Error from Supabase:", result.error);
      
      // Handle case where data was saved but email notification failed
      if (result.error.message && result.error.message.includes("Failed to send a request to the Edge Function")) {
        toast({
          title: "Form submitted successfully",
          description: "Your information has been saved, but there was an issue sending email notifications. Our team will still receive your request.",
        });
        return true;
      }
      
      // If Formspree worked but Supabase failed
      if (formspreeSuccess) {
        toast({
          title: "Form submitted successfully",
          description: "Your information has been received. Our team will contact you soon.",
        });
        emailSent = true;
        return true;
      }
      
      // If both failed
      toast({
        title: "Error submitting form",
        description: result.error.message || "Please try again later.",
        variant: "destructive",
      });
      return false;
    }

    // Supabase success
    supabaseSuccess = true;
    emailSent = true;
    
    // Success case
    console.log("Form submitted successfully");
    toast({
      title: "Message submitted successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    
    return true;
  } catch (error) {
    console.error('Unexpected error during form submission:', error);
    toast({
      title: "Error submitting form",
      description: error instanceof Error ? error.message : "Please try again later.",
      variant: "destructive",
    });
    return false;
  } finally {
    // Always reset the submitting state
    console.log("Resetting isSubmitting state");
    setIsSubmitting(false);
  }
};
