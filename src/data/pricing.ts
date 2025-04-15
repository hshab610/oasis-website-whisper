interface Fee {
  name: string;
  description: string;
  price: string;
}

interface Service {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export const additionalFees: Fee[] = [
  { name: 'Travel Fee', description: 'For locations outside service area', price: '$75+' },
  { name: 'Heavy Item Fee', description: 'Per item (pianos, safes, etc.)', price: '$50+' },
  { name: 'Stairs Fee', description: 'Per staircase during move', price: '$20' },
  { name: 'Last Minute Booking', description: 'For bookings with less than 48 hours notice', price: '$75' }
];

export const services: Service[] = [
  {
    name: 'All-in-One Moving Package',
    price: '$249 + $100',
    unit: 'flat rate + per hour',
    description: 'Best value! Complete moving solution with optional add-ons',
    features: [
      'Professional local moving service',
      'Assembly of up to 5 furniture items',
      'One TV mounting installation',
      'Add stairs service for $20 per staircase',
      'Add donation service for $100',
      'Add junk removal for $100',
      'Save over $120 on combined services'
    ],
    featured: true
  },
  {
    name: 'Local Moving',
    price: '$120',
    unit: 'per hour',
    description: 'Includes mileage and travel time within Ohio',
    features: [
      '2-hour minimum',
      'Fully equipped moving truck',
      'Professional movers',
      'Basic furniture protection'
    ]
  },
  {
    name: 'Furniture Assembly',
    price: '$90 / $120',
    unit: 'flat rate',
    description: 'Assembly or disassembly services',
    features: [
      '$90 for up to 5 items',
      '$120 for over 5 items',
      'Professional tools and equipment',
      'Expert assembly technicians'
    ]
  },
  {
    name: 'TV Mounting',
    price: '$60',
    unit: 'flat rate',
    description: 'Professional TV installation',
    features: [
      'Customer provides wall mount',
      'Cable management',
      'Professional installation',
      'Mounting on various wall types'
    ]
  },
  {
    name: 'Junk Removal',
    price: '$150',
    unit: 'flat rate',
    description: 'Hauling services for unwanted items',
    features: [
      'Potential dumping fees may apply',
      'Eco-friendly disposal when possible',
      'Removal of furniture and appliances',
      'Quick and efficient service'
    ]
  }
];
