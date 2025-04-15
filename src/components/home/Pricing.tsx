
import { ArrowRight, DollarSign, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Pricing = () => {
  const services = [
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

  const additionalFees = [
    { name: 'Travel Fee', description: 'For locations outside service area', price: '$50+' },
    { name: 'Heavy Item Fee', description: 'Per item (pianos, safes, etc.)', price: '$30+' },
    { name: 'Stairs Fee', description: 'Per floor (applies to buildings without elevators)', price: '$20' },
    { name: 'Last Minute Booking', description: 'For bookings with less than 48 hours notice', price: '$50' }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            We believe in clear, upfront pricing with no hidden fees.
            Below are our standard rates for common services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="bg-primary/10 p-6">
                <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-3xl font-bold">{service.price}</span>
                  <span className="text-muted-foreground">{service.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                        <DollarSign size={14} className="text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
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
        
        <div className="mt-16">
          <Accordion type="single" collapsible className="max-w-4xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">
                Long Distance Moving Pricing
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Long distance moving prices are customized based on distance, volume of items, and specific requirements.
                Please contact us for a personalized quote tailored to your long-distance move.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">
                Storage Solutions Pricing
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our storage pricing varies based on the size of unit needed and duration of storage. 
                Contact us with details about what you need to store, and we'll provide competitive pricing options.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">
                Custom Moving Packages
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We offer customized moving packages that combine multiple services at discounted rates.
                These packages can be tailored to your specific needs and budget. Contact us to discuss your requirements.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg">Ready to get started with your move? Get a free, no-obligation quote today!</p>
          <Link to="/contact">
            <Button className="cta-button">
              Get a Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
