/**
 * Utility functions for calculating moving costs
 */

/**
 * Calculate the estimated moving cost based on parameters
 * 
 * @param packageType The selected service package
 * @param bedrooms Number of bedrooms
 * @param distance Moving distance in miles
 * @param additionalOptions Any additional options or features
 * @returns The estimated cost and time
 */
export const calculateMovingCost = (
  packageType: string, 
  bedrooms: number, 
  distance: number,
  additionalOptions?: {
    hasHeavyItems?: boolean;
    heavyItemsCount?: number;
    hasStairs?: boolean;
    stairsCount?: number;
    lastMinuteBooking?: boolean;
    needsAssembly?: boolean;
    assemblyItems?: number;
    needsTvMount?: boolean;
    needsJunkRemoval?: boolean;
  }
) => {
  // Log the package type and options for debugging
  console.log('Package Type:', packageType);
  console.log('Additional Options:', additionalOptions);
  
  // Default options
  const options = {
    hasHeavyItems: false,
    heavyItemsCount: 0,
    hasStairs: false,
    stairsCount: 0,
    lastMinuteBooking: false,
    needsAssembly: false,
    assemblyItems: 0,
    needsTvMount: false,
    needsJunkRemoval: false,
    ...additionalOptions
  };

  // Calculate estimated hours based on bedrooms
  const estimatedHours = Math.max(2, bedrooms * 1.5);
  
  // Add time for distance (if more than 15 miles)
  const distanceHours = Math.max(0, (distance - 15) / 30) * 0.5;
  const totalHours = Math.ceil((estimatedHours + distanceHours) * 2) / 2; // Round to nearest half hour
  
  // Calculate base cost based on package
  let baseCost = 0;
  const costBreakdown: {name: string, cost: number}[] = [];
  
  if (packageType === "all-in-one") {
    // All-in-One package: $249 flat rate + $100 per hour
    const packageFlatRate = 249;
    const hourlyRate = 100;
    
    costBreakdown.push({ name: 'All-in-One Package Base Fee', cost: packageFlatRate });
    costBreakdown.push({ name: `Hourly Rate (${totalHours} hrs @ $100/hr)`, cost: totalHours * hourlyRate });
    
    baseCost = packageFlatRate + (totalHours * hourlyRate);
    
    // All-in-One includes assembly and TV mount, so don't add these separately
    options.needsAssembly = true;
    options.needsTvMount = true;
  } else if (packageType === "local") {
    // Local Moving: $120 per hour
    const hourlyRate = 120;
    
    costBreakdown.push({ name: `Local Moving (${totalHours} hrs @ $120/hr)`, cost: totalHours * hourlyRate });
    baseCost = totalHours * hourlyRate;
  } else if (packageType === "long-distance" || packageType === "custom") {
    // Long Distance: Base rate plus distance factor
    baseCost = 500 + (distance * 5);
    costBreakdown.push({ name: 'Long Distance Base Fee', cost: 500 });
    costBreakdown.push({ name: `Distance Fee (${distance} miles @ $5/mile)`, cost: distance * 5 });
    
    // Add custom services
    if (options.needsAssembly) {
      const assemblyCost = options.assemblyItems > 5 ? 120 : 90;
      costBreakdown.push({ name: 'Furniture Assembly', cost: assemblyCost });
      baseCost += assemblyCost;
    }
    
    if (options.needsTvMount) {
      const tvMountCost = 60;
      costBreakdown.push({ name: 'TV Mounting', cost: tvMountCost });
      baseCost += tvMountCost;
    }
    
    if (options.needsJunkRemoval) {
      const junkRemovalCost = 150;
      costBreakdown.push({ name: 'Junk Removal', cost: junkRemovalCost });
      baseCost += junkRemovalCost;
    }
  }
  
  // Add bedroom factor
  const bedroomFactor = bedrooms * 50;
  costBreakdown.push({ name: `Bedroom Factor (${bedrooms} bedrooms)`, cost: bedroomFactor });
  baseCost += bedroomFactor;
  
  // Add additional fees
  if (options.hasHeavyItems) {
    const heavyItemFee = 50 * options.heavyItemsCount;
    costBreakdown.push({ name: `Heavy Item Fee (${options.heavyItemsCount} items)`, cost: heavyItemFee });
    baseCost += heavyItemFee;
  }
  
  if (options.hasStairs) {
    const stairsFee = 20 * options.stairsCount;
    costBreakdown.push({ name: `Stairs Fee (${options.stairsCount} staircases)`, cost: stairsFee });
    baseCost += stairsFee;
  }
  
  if (options.lastMinuteBooking) {
    const lastMinuteFee = 75;
    costBreakdown.push({ name: 'Last Minute Booking Fee', cost: lastMinuteFee });
    baseCost += lastMinuteFee;
  }
  
  return {
    estimatedCost: Math.round(baseCost),
    estimatedTime: totalHours,
    breakdown: costBreakdown
  };
};

/**
 * Calculate just a simple estimate for quick quotes
 */
export const calculateSimpleEstimate = (
  packageType: string, 
  bedrooms: number, 
  distance: number
) => {
  return calculateMovingCost(packageType, bedrooms, distance);
};
