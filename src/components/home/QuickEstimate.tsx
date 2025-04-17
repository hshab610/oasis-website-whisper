
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  ArrowRight, 
  Clock
} from 'lucide-react';
import EstimatorForm from './estimator/EstimatorForm';
import EstimateResult from './estimator/EstimateResult';
import { calculateSimpleEstimate } from '@/utils/costCalculator';

const QuickEstimate = () => {
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [distance, setDistance] = useState<number>(10);
  const [packageType, setPackageType] = useState<string>("local");
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [calculationDone, setCalculationDone] = useState<boolean>(false);
  const [calculationProgress, setCalculationProgress] = useState<number>(0);

  const calculateEstimate = () => {
    // Reset progress
    setCalculationProgress(0);
    setCalculationDone(false);
    
    // Simulate calculation progress
    const progressInterval = setInterval(() => {
      setCalculationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
    
    // Calculate estimated cost
    setTimeout(() => {
      const result = calculateSimpleEstimate(packageType, bedrooms, distance);
      setEstimatedCost(result.estimatedCost);
      setCalculationDone(true);
      clearInterval(progressInterval);
      setCalculationProgress(100);
    }, 1000);
  };

  return (
    <section id="quick-estimate" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Moving Estimate</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Get a quick estimate of your moving costs in just a few seconds.
            For a detailed quote, complete our booking form.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <div className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-primary" />
                <CardTitle>Moving Cost Calculator</CardTitle>
              </div>
              <CardDescription>
                Select your options below to get an instant estimate
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  {!calculationDone ? (
                    <>
                      <EstimatorForm 
                        packageType={packageType}
                        bedrooms={bedrooms}
                        distance={distance}
                        onPackageChange={setPackageType}
                        onBedroomsChange={setBedrooms}
                        onDistanceChange={setDistance}
                        onCalculate={calculateEstimate}
                        isCalculating={calculationProgress > 0 && !calculationDone}
                        calculationProgress={calculationProgress}
                      />
                      
                      {calculationProgress > 0 && !calculationDone && (
                        <div className="space-y-2 mt-4">
                          <Progress value={calculationProgress} className="h-2" />
                          <p className="text-sm text-center text-muted-foreground">
                            Calculating estimate...
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <EstimateResult 
                      estimatedCost={estimatedCost}
                      onRecalculate={() => setCalculationDone(false)}
                    />
                  )}
                </div>
                
                <div className="bg-muted p-6 rounded-lg">
                  {!calculationDone ? (
                    <>
                      <h3 className="text-lg font-medium mb-4">Why Use Our Calculator?</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="bg-primary/20 p-1 rounded-full flex items-center justify-center mt-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </span>
                          <span>Get an instant cost estimate</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-primary/20 p-1 rounded-full flex items-center justify-center mt-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </span>
                          <span>Compare different service packages</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-primary/20 p-1 rounded-full flex items-center justify-center mt-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </span>
                          <span>Plan your budget effectively</span>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">This is just an estimate</h4>
                          <p className="text-sm text-muted-foreground">
                            For a detailed quote with additional services and specific requirements, 
                            please use our booking form.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-primary/10 p-4 rounded-md">
                        <h4 className="font-medium mb-2">What's included:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Professional movers</li>
                          <li>• Basic transportation</li>
                          <li>• Standard insurance</li>
                          <li>• Loading and unloading</li>
                        </ul>
                      </div>
                      
                      <div className="bg-primary/10 p-4 rounded-md">
                        <h4 className="font-medium mb-2">What's not included:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Packing materials</li>
                          <li>• Furniture assembly/disassembly</li>
                          <li>• Special item handling</li>
                          <li>• Storage fees</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-primary/5 border-t border-primary/10">
              <div className="w-full text-center">
                <Link to="/contact" className="inline-flex items-center text-primary font-medium hover:underline">
                  Need a detailed quote? Fill out our full booking form
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickEstimate;
