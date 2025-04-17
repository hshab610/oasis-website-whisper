
import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { calculateMovingCost } from '@/utils/costCalculator';

// Component imports
import ServicePackageSelect from './calculator/ServicePackageSelect';
import MoveBasicInfo from './calculator/MoveBasicInfo';
import AdditionalServices from './calculator/AdditionalServices';
import AdditionalFees from './calculator/AdditionalFees';
import CostSummary from './calculator/CostSummary';

const MoveCalculator = () => {
  // Basic information
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [distance, setDistance] = useState<number>(10);
  
  // Service selection
  const [selectedPackage, setSelectedPackage] = useState<string>('local');
  
  // Additional services
  const [hasHeavyItems, setHasHeavyItems] = useState<boolean>(false);
  const [heavyItemsCount, setHeavyItemsCount] = useState<number>(1);
  const [hasStairs, setHasStairs] = useState<boolean>(false);
  const [stairsCount, setStairsCount] = useState<number>(1);
  const [needsAssembly, setNeedsAssembly] = useState<boolean>(false);
  const [assemblyItems, setAssemblyItems] = useState<number>(3);
  const [needsTvMount, setNeedsTvMount] = useState<boolean>(false);
  const [needsJunkRemoval, setNeedsJunkRemoval] = useState<boolean>(false);
  const [lastMinuteBooking, setLastMinuteBooking] = useState<boolean>(false);
  
  // Results
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<{name: string, cost: number}[]>([]);
  
  const { toast } = useToast();
  
  // Handle package selection changes
  useEffect(() => {
    // Auto-update service selections for All-in-One package
    if (selectedPackage === 'all-in-one') {
      setNeedsAssembly(true);
      setAssemblyItems(5);
      setNeedsTvMount(true);
    }
  }, [selectedPackage]);
  
  // Use useMemo to reduce unnecessary recalculations
  const calculationParams = useMemo(() => ({
    selectedPackage,
    bedrooms,
    distance,
    hasHeavyItems,
    heavyItemsCount,
    hasStairs,
    stairsCount,
    lastMinuteBooking,
    needsAssembly,
    assemblyItems,
    needsTvMount,
    needsJunkRemoval
  }), [
    selectedPackage, bedrooms, distance, hasHeavyItems, heavyItemsCount, 
    hasStairs, stairsCount, needsAssembly, assemblyItems, needsTvMount, 
    needsJunkRemoval, lastMinuteBooking
  ]);
  
  // Calculate estimated move cost using our utility
  useEffect(() => {
    const result = calculateMovingCost(
      selectedPackage, 
      bedrooms, 
      distance,
      {
        hasHeavyItems,
        heavyItemsCount,
        hasStairs,
        stairsCount,
        lastMinuteBooking,
        needsAssembly,
        assemblyItems,
        needsTvMount,
        needsJunkRemoval
      }
    );
    
    setEstimatedCost(result.estimatedCost);
    setEstimatedTime(result.estimatedTime);
    setBreakdown(result.breakdown);
  }, [calculationParams]);
  
  const handleGetQuote = () => {
    toast({
      title: "Estimate Generated",
      description: `Your estimated moving cost is $${estimatedCost.toFixed(0)}. Contact us for a personalized quote!`,
      duration: 5000,
    });
  };
  
  return (
    <Card className="shadow-lg border-primary/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 bg-primary/10 rounded-bl-lg">
        <Calculator className="h-5 w-5 text-primary" />
      </div>
      
      <CardHeader>
        <CardTitle className="text-2xl">Moving Cost Calculator</CardTitle>
        <CardDescription>Estimate the cost of your upcoming move based on our service rates</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ServicePackageSelect 
              selectedPackage={selectedPackage}
              onPackageChange={setSelectedPackage}
            />
            
            <MoveBasicInfo 
              bedrooms={bedrooms}
              distance={distance}
              onBedroomsChange={setBedrooms}
              onDistanceChange={setDistance}
            />
          </div>
          
          <div className="space-y-4">
            {selectedPackage !== 'all-in-one' && (
              <div className="space-y-3">
                {selectedPackage === 'custom' && (
                  <AdditionalServices 
                    needsAssembly={needsAssembly}
                    assemblyItems={assemblyItems}
                    needsTvMount={needsTvMount}
                    needsJunkRemoval={needsJunkRemoval}
                    onAssemblyChange={setNeedsAssembly}
                    onAssemblyItemsChange={setAssemblyItems}
                    onTvMountChange={setNeedsTvMount}
                    onJunkRemovalChange={setNeedsJunkRemoval}
                  />
                )}
              </div>
            )}

            <AdditionalFees 
              hasHeavyItems={hasHeavyItems}
              heavyItemsCount={heavyItemsCount}
              hasStairs={hasStairs}
              stairsCount={stairsCount}
              lastMinuteBooking={lastMinuteBooking}
              onHeavyItemsChange={setHasHeavyItems}
              onHeavyItemsCountChange={setHeavyItemsCount}
              onStairsChange={setHasStairs}
              onStairsCountChange={setStairsCount}
              onLastMinuteBookingChange={setLastMinuteBooking}
            />
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <CostSummary 
          estimatedCost={estimatedCost}
          estimatedTime={estimatedTime}
          breakdown={breakdown}
          selectedPackage={selectedPackage}
          onGetQuote={handleGetQuote}
        />
      </CardContent>
    </Card>
  );
};

export default MoveCalculator;
