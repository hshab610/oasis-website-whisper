
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  DollarSign, 
  ArrowRight, 
  Home, 
  Truck, 
  Clock, 
  CalendarCheck
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const QuickEstimate = () => {
  const { toast } = useToast();
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
      let baseCost = 0;
      
      if (packageType === "all-in-one") {
        // All-in-One package: $249 flat rate + $100 per hour
        const estimatedHours = Math.max(2, bedrooms * 1.5);
        baseCost = 249 + (estimatedHours * 100);
      } else if (packageType === "local") {
        // Local Moving: $120 per hour
        const estimatedHours = Math.max(2, bedrooms * 1.5);
        baseCost = estimatedHours * 120;
      } else if (packageType === "long-distance") {
        // Long Distance: Base rate plus distance factor
        baseCost = 500 + (distance * 5);
      }
      
      // Add bedroom factor
      const bedroomFactor = bedrooms * 50;
      
      // Calculate final cost
      const finalCost = baseCost + bedroomFactor;
      
      setEstimatedCost(Math.round(finalCost));
      setCalculationDone(true);
      clearInterval(progressInterval);
      setCalculationProgress(100);
    }, 1000);
  };

  const handleGetFullQuote = () => {
    toast({
      title: "Quick Estimate Complete",
      description: "For a detailed and personalized quote, please continue to our booking page.",
    });
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
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="service-package" className="text-base mb-2 block">
                      Select Service Package
                    </Label>
                    <Select
                      value={packageType}
                      onValueChange={setPackageType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-in-one">
                          All-in-One Package ($249 + $100/hr)
                        </SelectItem>
                        <SelectItem value="local">
                          Local Moving ($120/hr)
                        </SelectItem>
                        <SelectItem value="long-distance">
                          Long Distance Moving (Custom)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="bedrooms" className="text-base mb-2 block">
                      Number of Bedrooms
                    </Label>
                    <div className="flex items-center">
                      <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Select
                        value={bedrooms.toString()}
                        onValueChange={(value) => setBedrooms(parseInt(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Studio</SelectItem>
                          <SelectItem value="1">1 Bedroom</SelectItem>
                          <SelectItem value="2">2 Bedrooms</SelectItem>
                          <SelectItem value="3">3 Bedrooms</SelectItem>
                          <SelectItem value="4">4 Bedrooms</SelectItem>
                          <SelectItem value="5">5+ Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="distance" className="text-base mb-2 block">
                      Moving Distance: {distance} miles
                    </Label>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <Slider
                        id="distance"
                        min={1}
                        max={100}
                        step={1}
                        value={[distance]}
                        onValueChange={([value]) => setDistance(value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Local: 1-50 miles, Long Distance: 50+ miles
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-muted p-6 rounded-lg">
                    {!calculationDone ? (
                      <>
                        <h3 className="text-lg font-medium mb-4">Calculate Your Estimate</h3>
                        <p className="text-muted-foreground mb-6">
                          Fill out the options on the left and click calculate to get your estimate.
                        </p>
                        {calculationProgress > 0 && (
                          <div className="space-y-2 mb-4">
                            <Progress value={calculationProgress} className="h-2" />
                            <p className="text-sm text-center text-muted-foreground">
                              Calculating estimate...
                            </p>
                          </div>
                        )}
                        <Button 
                          onClick={calculateEstimate} 
                          className="w-full bg-primary hover:bg-primary/90"
                        >
                          Calculate Estimate
                        </Button>
                      </>
                    ) : (
                      <>
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
                            onClick={() => setCalculationDone(false)} 
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
                      </>
                    )}
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
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
                  </div>
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
