
import { toast as toastType } from "@/hooks/use-toast";

export const handleFormSubmission = async (
  formData: any,
  setIsSubmitting: (value: boolean) => void,
  toast: typeof toastType,
  supabaseSubmit: (data: any) => Promise<{ error: any, data: any }>
) => {
  setIsSubmitting(true);
  console.log("handleFormSubmission started with data:", formData);

  try {
    console.log("Calling supabaseSubmit function");
    const result = await supabaseSubmit(formData);
    console.log("supabaseSubmit result:", result);
    
    if (result.error) {
      console.error("Error from supabaseSubmit:", result.error);
      throw result.error;
    }

    // Successfully submitted
    console.log("Form submitted successfully");
    toast({
      title: "Message submitted successfully!",
      description: "We'll get back to you as soon as possible.",
    });

    return true;
  } catch (error) {
    console.error('Error submitting form:', error);
    toast({
      title: "Error submitting form",
      description: "Please try again later.",
      variant: "destructive",
    });
    return false;
  } finally {
    console.log("Setting isSubmitting to false");
    setIsSubmitting(false);
  }
};
