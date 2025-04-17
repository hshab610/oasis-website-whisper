
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, DollarSign, Home, ArrowRight, Clock, Truck } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const MoveCalculator = () => {
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [distance, setDistance] = useState<number>(10);
  const [hasHeavyItems, setHasHeavyItems] = useState<boolean>(false);
  const [hasStairs, setHasStairs] = useState<boolean>(false);
  const [needsAssembly, setNeedsAssembly] = useState<boolean>(false);
  
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  
  // Calculate estimated moving cost and time
  useEffect(() => {
    // Base cost calculation
    const hourlyRate = 120; // $120 per hour
    let baseHours = 2; // Minimum 2 hours
    
    // Add time based on bedrooms
    baseHours += bedrooms * 0.75;
    
    // Add time for distance
    const distanceHours = Math.max(0, (distance - 15) / 30) * 0.5;
    let totalHours = baseHours + distanceHours;
    
    // Add time for heavy items
    if (hasHeavyItems) totalHours += 1;
    
    // Add time for stairs
    if (hasStairs) totalHours += 0.5;
    
    // Add time for assembly
    if (needsAssembly) totalHours += 1;
    
    // Round up to nearest half hour
    totalHours = Math.ceil(totalHours * 2) / 2;
    
    // Calculate cost
    let totalCost = totalHours * hourlyRate;
    
    // Add flat fees
    if (hasHeavyItems) totalCost += 50; // Heavy item fee
    if (hasStairs) totalCost += 20; // Stairs fee
    if (needsAssembly) totalCost += 90; // Basic assembly fee
    
    setEstimatedTime(totalHours);
    setEstimatedCost(totalCost);
  }, [bedrooms, distance, hasHeavyItems, hasStairs, needsAssembly]);
  
  return (
    <Card className="shadow-lg border-primary/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 bg-primary/10 rounded-bl-lg">
        <Calculator className="h-5 w-5 text-primary" />
      </div>
      
      <CardHeader>
        <CardTitle className="text-2xl">Moving Cost Calculator</CardTitle>
        <CardDescription>Estimate the cost of your upcoming move</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <Label htmlFor="bedrooms" className="text-base">Number of Bedrooms</Label>
              <div className="flex items-center">
                <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  max="10"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Math.max(0, parseInt(e.target.value) || 0))}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="distance" className="text-base">Moving Distance (miles)</Label>
              <div className="flex items-center">
                <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="distance"
                  type="number"
                  min="0"
                  max="100"
                  value={distance}
                  onChange={(e) => setDistance(Math.max(0, parseInt(e.target.value) || 0))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-2 pt-1">
              <Checkbox 
                id="heavyItems" 
                checked={hasHeavyItems}
                onCheckedChange={() => setHasHeavyItems(!hasHeavyItems)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="heavyItems" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Heavy Items (piano, safe, etc.)
                </Label>
                <p className="text-xs text-muted-foreground">+$50 fee applies</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="stairs" 
                checked={hasStairs}
                onCheckedChange={() => setHasStairs(!hasStairs)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="stairs" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Stairs Involved
                </Label>
                <p className="text-xs text-muted-foreground">+$20 fee per staircase</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="assembly" 
                checked={needsAssembly}
                onCheckedChange={() => setNeedsAssembly(!needsAssembly)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="assembly" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Furniture Assembly
                </Label>
                <p className="text-xs text-muted-foreground">+$90 for up to 5 items</p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          
          <p className="text-xs text-muted-foreground mt-4">
            This is only an estimate. For an accurate quote, please <a href="/contact" className="text-primary underline">contact us</a>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoveCalculator;
