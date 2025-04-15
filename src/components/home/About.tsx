
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const About = () => {
  const features = [
    'Professional & experienced movers',
    'Transparent pricing, no hidden fees',
    'Careful handling of your belongings',
    'Fully insured and licensed',
    'Flexible scheduling options',
    'Free, no-obligation quotes'
  ];

  return (
    <section className="py-16 md:py-24 bg-accent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="pattern-divider absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 opacity-50 z-0"></div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1600518464441-9306b00c4746?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Our Team" 
                className="rounded-lg w-full h-auto"
              />
            </div>
            
            <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow-lg absolute -bottom-8 -right-8 max-w-xs">
              <p className="text-lg font-medium mb-2">Serving Westerville & surrounding areas</p>
              <p className="opacity-90">With years of experience, we've helped hundreds of families and businesses relocate smoothly.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Oasis Moving & Storage</h2>
            <div className="w-24 h-1 bg-primary mb-6"></div>
            
            <p className="text-lg text-muted-foreground mb-6">
              At Oasis Moving & Storage, we understand that moving can be stressful. That's why we're dedicated to providing exceptional service that makes your relocation experience as smooth and hassle-free as possible.
            </p>
            
            <p className="text-lg text-muted-foreground mb-6">
              Our team consists of trained professionals who treat your belongings with the utmost care and respect. We take pride in our attention to detail and commitment to customer satisfaction.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="text-primary mt-1 flex-shrink-0" size={18} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <Link to="/about">
              <Button className="cta-button">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
