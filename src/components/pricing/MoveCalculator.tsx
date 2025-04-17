
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, DollarSign, Home, Clock, Truck, Sparkles } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { services, additionalFees } from '@/data/pricing';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

const MoveCalculator = () => {
  // Basic information
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [distance, setDistance] = useState<number>(10);
  const [moveDate, setMoveDate] = useState<Date | undefined>(undefined);
  
  // Service selection
  const [selectedPackage, setSelectedPackage] = useState<string>('local');
  const [estimatedHours, setEstimatedHours] = useState<number>(3);
  
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
  
  // Calculate estimated hours based on bedrooms
  useEffect(() => {
    // Base hours calculation based on bedrooms
    let baseHours = Math.max(2, bedrooms * 1.5); // Minimum 2 hours
    
    // Add time for distance (if more than 15 miles)
    const distanceHours = Math.max(0, (distance - 15) / 30) * 0.5;
    let totalHours = baseHours + distanceHours;
    
    // Round up to nearest half hour
    totalHours = Math.ceil(totalHours * 2) / 2;
    
    setEstimatedHours(totalHours);
  }, [bedrooms, distance]);
  
  // Calculate estimated moving cost and time
  useEffect(() => {
    const costBreakdown: {name: string, cost: number}[] = [];
    let totalCost = 0;
    let totalHours = estimatedHours;
    
    // Get base pricing from services data
    const getServiceRate = (serviceName: string): number => {
      const service = services.find(s => {
        if (serviceName === 'local' && s.name === 'Local Moving') return true;
        if (serviceName === 'all-in-one' && s.name === 'All-in-One Moving Package') return true;
        if (serviceName === 'furniture' && s.name === 'Furniture Assembly') return true;
        if (serviceName === 'tv' && s.name === 'TV Mounting') return true;
        if (serviceName === 'junk' && s.name === 'Junk Removal') return true;
        return false;
      });
      
      if (!service) return 0;
      
      // Extract numeric value from price string
      const priceMatch = service.price.match(/\$(\d+)/);
      return priceMatch ? parseInt(priceMatch[1]) : 0;
    };
    
    // Calculate base service cost
    if (selectedPackage === 'all-in-one') {
      // All-in-One package: $249 flat rate + $100 per hour
      const packageFlatRate = 249;
      const hourlyRate = 100;
      
      costBreakdown.push({ name: 'All-in-One Package Base Fee', cost: packageFlatRate });
      costBreakdown.push({ name: `Hourly Rate (${totalHours} hrs @ $100/hr)`, cost: totalHours * hourlyRate });
      
      totalCost += packageFlatRate + (totalHours * hourlyRate);
      
      // Includes assembly of up to 5 items and one TV mounting
      setNeedsAssembly(true);
      setAssemblyItems(5);
      setNeedsTvMount(true);
      
    } else if (selectedPackage === 'local') {
      // Local Moving: $120 per hour
      const hourlyRate = 120;
      
      costBreakdown.push({ name: `Local Moving (${totalHours} hrs @ $120/hr)`, cost: totalHours * hourlyRate });
      totalCost += totalHours * hourlyRate;
      
    } else {
      // Individual services
      if (needsAssembly) {
        const assemblyCost = assemblyItems > 5 ? 120 : 90;
        costBreakdown.push({ name: 'Furniture Assembly', cost: assemblyCost });
        totalCost += assemblyCost;
      }
      
      if (needsTvMount) {
        const tvMountCost = 60;
        costBreakdown.push({ name: 'TV Mounting', cost: tvMountCost });
        totalCost += tvMountCost;
      }
      
      if (needsJunkRemoval) {
        const junkRemovalCost = 150;
        costBreakdown.push({ name: 'Junk Removal', cost: junkRemovalCost });
        totalCost += junkRemovalCost;
      }
    }
    
    // Add additional fees
    if (hasHeavyItems) {
      const heavyItemFee = 50 * heavyItemsCount;
      costBreakdown.push({ name: `Heavy Item Fee (${heavyItemsCount} items)`, cost: heavyItemFee });
      totalCost += heavyItemFee;
    }
    
    if (hasStairs) {
      const stairsFee = 20 * stairsCount;
      costBreakdown.push({ name: `Stairs Fee (${stairsCount} staircases)`, cost: stairsFee });
      totalCost += stairsFee;
    }
    
    if (lastMinuteBooking) {
      const lastMinuteFee = 75;
      costBreakdown.push({ name: 'Last Minute Booking Fee', cost: lastMinuteFee });
      totalCost += lastMinuteFee;
    }
    
    setEstimatedCost(totalCost);
    setEstimatedTime(totalHours);
    setBreakdown(costBreakdown);
    
  }, [selectedPackage, estimatedHours, hasHeavyItems, heavyItemsCount, hasStairs, stairsCount, 
      needsAssembly, assemblyItems, needsTvMount, needsJunkRemoval, lastMinuteBooking]);
  
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
            <div>
              <Label htmlFor="service-package" className="text-base mb-2 block">Select Service Package</Label>
              <RadioGroup
                id="service-package"
                value={selectedPackage}
                onValueChange={setSelectedPackage}
                className="grid grid-cols-1 gap-2"
              >
                <div className="flex items-start space-x-2 bg-primary/5 p-3 rounded-md">
                  <RadioGroupItem value="all-in-one" id="all-in-one" className="mt-1" />
                  <div className="grid gap-1">
                    <Label htmlFor="all-in-one" className="font-medium flex items-center">
                      All-in-One Package
                      <span className="ml-2 inline-flex items-center gap-1 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                        <Sparkles className="h-3 w-3" /> Best Value
                      </span>
                    </Label>
                    <p className="text-sm text-muted-foreground">$249 + $100/hr</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 p-3 rounded-md border border-border">
                  <RadioGroupItem value="local" id="local" className="mt-1" />
                  <div className="grid gap-1">
                    <Label htmlFor="local" className="font-medium">Local Moving</Label>
                    <p className="text-sm text-muted-foreground">$120/hr (2hr minimum)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 p-3 rounded-md border border-border">
                  <RadioGroupItem value="custom" id="custom" className="mt-1" />
                  <div className="grid gap-1">
                    <Label htmlFor="custom" className="font-medium">Custom Services</Label>
                    <p className="text-sm text-muted-foreground">Select individual services below</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="bedrooms" className="text-base mb-2 block">Number of Bedrooms</Label>
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
              <p className="text-xs text-muted-foreground mt-1">Local: 1-50 miles, Long Distance: 50+ miles</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {selectedPackage !== 'all-in-one' && (
              <div className="space-y-3">
                <Label className="text-base font-medium">Additional Services</Label>
                
                {selectedPackage === 'custom' && (
                  <>
                    <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
                      <Checkbox 
                        id="assembly" 
                        checked={needsAssembly}
                        onCheckedChange={() => setNeedsAssembly(!needsAssembly)}
                      />
                      <div className="grid gap-1">
                        <Label htmlFor="assembly" className="text-sm">Furniture Assembly</Label>
                        <p className="text-xs text-muted-foreground">$90 (up to 5) / $120 (over 5 items)</p>
                      </div>
                    </div>
                    
                    {needsAssembly && (
                      <div className="pl-7 -mt-1">
                        <Label htmlFor="assemblyCount" className="text-xs">Items to assemble:</Label>
                        <div className="flex items-center gap-2">
                          <Select
                            value={assemblyItems.toString()}
                            onValueChange={(value) => setAssemblyItems(parseInt(value))}
                          >
                            <SelectTrigger className="w-full h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'item' : 'items'}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
                      <Checkbox 
                        id="tvMount" 
                        checked={needsTvMount}
                        onCheckedChange={() => setNeedsTvMount(!needsTvMount)}
                      />
                      <div className="grid gap-1">
                        <Label htmlFor="tvMount" className="text-sm">TV Mounting</Label>
                        <p className="text-xs text-muted-foreground">$60 flat rate (customer provides mount)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
                      <Checkbox 
                        id="junkRemoval" 
                        checked={needsJunkRemoval}
                        onCheckedChange={() => setNeedsJunkRemoval(!needsJunkRemoval)}
                      />
                      <div className="grid gap-1">
                        <Label htmlFor="junkRemoval" className="text-sm">Junk Removal</Label>
                        <p className="text-xs text-muted-foreground">$150 flat rate (dumping fees may apply)</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Label className="text-base font-medium">Potential Additional Fees</Label>
              
              <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
                <Checkbox 
                  id="heavyItems" 
                  checked={hasHeavyItems}
                  onCheckedChange={() => setHasHeavyItems(!hasHeavyItems)}
                />
                <div className="grid gap-1">
                  <Label htmlFor="heavyItems" className="text-sm">Heavy Items (piano, safe, etc.)</Label>
                  <p className="text-xs text-muted-foreground">+$50 fee per item</p>
                </div>
              </div>
              
              {hasHeavyItems && (
                <div className="pl-7 -mt-1">
                  <Label htmlFor="heavyCount" className="text-xs">Number of heavy items:</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 text-xs"
                      onClick={() => setHeavyItemsCount(Math.max(1, heavyItemsCount - 1))}
                    >-</Button>
                    <span className="w-8 text-center">{heavyItemsCount}</span>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 text-xs"
                      onClick={() => setHeavyItemsCount(heavyItemsCount + 1)}
                    >+</Button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
                <Checkbox 
                  id="stairs" 
                  checked={hasStairs}
                  onCheckedChange={() => setHasStairs(!hasStairs)}
                />
                <div className="grid gap-1">
                  <Label htmlFor="stairs" className="text-sm">Stairs Involved</Label>
                  <p className="text-xs text-muted-foreground">+$20 fee per staircase</p>
                </div>
              </div>
              
              {hasStairs && (
                <div className="pl-7 -mt-1">
                  <Label htmlFor="stairsCount" className="text-xs">Number of staircases:</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 text-xs"
                      onClick={() => setStairsCount(Math.max(1, stairsCount - 1))}
                    >-</Button>
                    <span className="w-8 text-center">{stairsCount}</span>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 text-xs"
                      onClick={() => setStairsCount(stairsCount + 1)}
                    >+</Button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <div className="grid gap-1">
                  <Label htmlFor="lastMinute" className="text-sm">Last Minute Booking</Label>
                  <p className="text-xs text-muted-foreground">+$75 fee (less than 48h notice)</p>
                </div>
                <Switch
                  id="lastMinute"
                  checked={lastMinuteBooking}
                  onCheckedChange={setLastMinuteBooking}
                />
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
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
              <p className="text-sm font-medium">Cost Breakdown:</p>
              {breakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span>${item.cost.toFixed(0)}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4">
            <Button 
              onClick={handleGetQuote} 
              className="w-full bg-primary hover:bg-primary/90"
            >
              Get Detailed Quote
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This is only an estimate. For an accurate quote, please <a href="/contact" className="text-primary underline">contact us</a>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoveCalculator;
