
import { toast as toastType } from "@/hooks/use-toast";

export const handleFormSubmission = async (
  formData: any,
  setIsSubmitting: (value: boolean) => void,
  toast: typeof toastType,
  supabaseSubmit: (data: any) => Promise<{ error: any, data: any }>
) => {
  setIsSubmitting(true);

  try {
    const result = await supabaseSubmit(formData);
    
    if (result.error) throw result.error;

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
    setIsSubmitting(false);
  }
};
