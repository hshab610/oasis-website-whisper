
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ServiceCard } from '@/components/pricing/ServiceCard';
import { AdditionalFees } from '@/components/pricing/AdditionalFees';
import { services } from '@/data/pricing';

const Pricing = () => {
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
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        <AdditionalFees />
        
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
