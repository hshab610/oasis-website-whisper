
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { additionalFees } from '@/data/pricing';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const PriceList = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-muted rounded-lg overflow-hidden max-w-4xl mx-auto">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-6 text-left hover:bg-muted/80 border-b border-border">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Additional Fees</h3>
            <p className="text-muted-foreground">
              The following fees may apply depending on your specific moving requirements
            </p>
          </div>
          <div className="flex items-center justify-center bg-primary/10 rounded-full p-1.5 ml-4">
            {isOpen ? (
              <ChevronUp className="text-primary h-5 w-5" />
            ) : (
              <ChevronDown className="text-primary h-5 w-5" />
            )}
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-6 space-y-4">
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
              <div>
                <p className="font-medium">Deposit Required</p>
                <p className="text-sm text-muted-foreground">$100 to confirm booking. This amount will be applied toward your final bill.</p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
