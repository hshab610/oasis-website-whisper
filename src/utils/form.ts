
import { toast as toastType } from "@/hooks/use-toast";

export const handleFormSubmission = async (
  formData: any,
  setIsSubmitting: (value: boolean) => void,
  toast: typeof toastType,
  supabaseSubmit: (data: any) => Promise<{ error: any, data: any }>
) => {
  try {
    // Set submission state to prevent multiple clicks
    setIsSubmitting(true);
    console.log("Form submission started with data:", formData);

    // Call the provided supabase submission function
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
      
      toast({
        title: "Error submitting form",
        description: result.error.message || "Please try again later.",
        variant: "destructive",
      });
      return false;
    }

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
