
import { UseToastReturn } from "@/components/ui/use-toast";

export const handleFormSubmission = async (
  formData: any,
  setIsSubmitting: (value: boolean) => void,
  toast: UseToastReturn["toast"],
  supabaseSubmit: (data: any) => Promise<{ error: any }>
) => {
  setIsSubmitting(true);

  try {
    const { error } = await supabaseSubmit(formData);

    if (error) throw error;

    toast({
      title: "Booking request submitted!",
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
