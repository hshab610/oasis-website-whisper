import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';

const StaffTrainingHelp = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const refreshHelpSection = async () => {
    setLoading(true);
    // Simulate a long-running task
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);

    // Update the toast call to use a valid variant
    toast({
      title: "Help Section Updated",
      description: "Staff training materials have been refreshed.",
      variant: "default" // Changed from "warning" to "default"
    });
  };

  return (
    <div>
      <Button onClick={refreshHelpSection} disabled={loading}>
        {loading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Help Section
          </>
        )}
      </Button>
    </div>
  );
};

export default StaffTrainingHelp;
