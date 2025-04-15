
import { AlertCircle } from 'lucide-react';
import { additionalFees } from '@/data/pricing';

export const AdditionalFees = () => {
  return (
    <div className="bg-muted rounded-lg p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-start gap-4 mb-6">
        <AlertCircle className="text-primary mt-1 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold mb-2">Additional Fees</h3>
          <p className="text-muted-foreground">
            The following fees may apply depending on your specific moving requirements:
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {additionalFees.map((fee, index) => (
          <div key={index} className="flex justify-between p-3 bg-accent rounded-md">
            <div>
              <p className="font-medium">{fee.name}</p>
              <p className="text-sm text-muted-foreground">{fee.description}</p>
            </div>
            <div className="text-primary font-semibold">{fee.price}</div>
          </div>
        ))}
      </div>
      
      <div className="bg-primary/10 p-4 rounded-md flex items-start gap-3">
        <AlertCircle className="text-primary mt-1 flex-shrink-0" />
        <div>
          <p className="font-medium">Deposit Required</p>
          <p className="text-sm text-muted-foreground">$100 to confirm booking. This amount will be applied toward your final bill.</p>
        </div>
      </div>
    </div>
  );
};
