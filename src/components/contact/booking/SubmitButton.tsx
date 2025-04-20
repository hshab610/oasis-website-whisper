
import { Button } from "@/components/ui/button";
import { Loader, LockIcon } from "lucide-react";

type SubmitButtonProps = {
  isSubmitting: boolean;
};

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => (
  <div className="space-y-2">
    <Button 
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-bold shadow-lg"
    >
      {isSubmitting ? (
        <div className="flex items-center">
          <Loader className="mr-2 h-5 w-5 animate-spin" />
          Submitting Request...
        </div>
      ) : (
        <div className="flex items-center">
          Get Free Quote Now
        </div>
      )}
    </Button>
    <div className="flex justify-center items-center gap-1 text-xs text-muted-foreground">
      <LockIcon className="h-3 w-3" />
      <span>Your information is secure. We'll never share your data.</span>
    </div>
  </div>
);

export default SubmitButton;
