
import { DollarSign, Clock, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CostBreakdownItem {
  name: string;
  cost: number;
}

interface CostSummaryProps {
  estimatedCost: number;
  estimatedTime: number;
  breakdown: CostBreakdownItem[];
  selectedPackage: string;
  onGetQuote: () => void;
}

const CostSummary = ({ 
  estimatedCost, 
  estimatedTime, 
  breakdown,
  selectedPackage,
  onGetQuote
}: CostSummaryProps) => {
  const getIncludedServices = () => {
    const baseServices = [
      'Professional movers',
      'Loading and unloading',
      'Standard insurance'
    ];
    
    if (selectedPackage === 'all-in-one') {
      return [
        ...baseServices,
        'Furniture assembly (up to 5 items)',
        'TV mounting (1 TV)'
      ];
    } else if (selectedPackage === 'local') {
      return [
        ...baseServices,
        'Local transportation'
      ];
    } else if (selectedPackage === 'long-distance') {
      return [
        ...baseServices,
        'Long distance transportation',
        'Moving blankets and equipment'
      ];
    }
    
    return baseServices;
  };
  
  return (
    <div className="bg-primary/5 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Estimate Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <DollarSign className="h-6 w-6 text-primary mr-2" />
          <div>
            <p className="text-sm text-muted-foreground">Estimated Cost</p>
            <p className="text-2xl font-bold">${estimatedCost.toFixed(0)}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-6 w-6 text-primary mr-2" />
          <div>
            <p className="text-sm text-muted-foreground">Estimated Time</p>
            <p className="text-2xl font-bold">{estimatedTime} {estimatedTime === 1 ? 'hour' : 'hours'}</p>
          </div>
        </div>
      </div>
      
      {breakdown.length > 0 && (
        <div className="border-t border-border pt-3 space-y-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium">Cost Breakdown:</p>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Detailed breakdown of your estimated costs</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {breakdown.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.name}</span>
              <span>${item.cost.toFixed(0)}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-sm font-medium mb-2">What's Included:</p>
        <ul className="text-xs space-y-1 mb-4">
          {getIncludedServices().map((service, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-3 w-3 text-primary mr-1 mt-0.5 flex-shrink-0" />
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4">
        <Button 
          onClick={onGetQuote} 
          className="w-full bg-primary hover:bg-primary/90"
        >
          Get Detailed Quote
        </Button>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          This is only an estimate. For an accurate quote, please <a href="/contact" className="text-primary underline">contact us</a>.
        </p>
      </div>
    </div>
  );
};

export default CostSummary;
