
import { Link } from 'react-router-dom';
import { DollarSign, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface EstimateResultProps {
  estimatedCost: number;
  onRecalculate: () => void;
}

const EstimateResult = ({ estimatedCost, onRecalculate }: EstimateResultProps) => {
  const { toast } = useToast();

  const handleGetFullQuote = () => {
    toast({
      title: "Quick Estimate Complete",
      description: "For a detailed and personalized quote, please continue to our booking page.",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Your Estimated Cost</h3>
      <div className="bg-white p-4 rounded-lg border border-primary/20 mb-4">
        <div className="flex items-center justify-center">
          <DollarSign className="h-8 w-8 text-primary mr-2" />
          <span className="text-4xl font-bold">${estimatedCost}</span>
        </div>
        <p className="text-center text-muted-foreground mt-2">
          Estimated price based on selected options
        </p>
      </div>
      <div className="flex flex-col space-y-3">
        <Button 
          onClick={onRecalculate} 
          variant="outline" 
          className="border-primary/20"
        >
          Recalculate
        </Button>
        <Link to="/contact" className="w-full">
          <Button 
            onClick={handleGetFullQuote} 
            className="w-full bg-primary hover:bg-primary/90"
          >
            <CalendarCheck className="mr-2 h-4 w-4" />
            Book Now & Get Full Quote
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EstimateResult;
