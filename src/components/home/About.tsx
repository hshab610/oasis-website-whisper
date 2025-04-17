
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
    <section className="py-16 md:py-20 bg-accent" id="about-section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Oasis Moving & Storage</h2>
            <div className="w-24 h-1 bg-primary mb-5"></div>
            
            <p className="text-lg text-muted-foreground mb-4">
              At Oasis Moving & Storage, we understand that moving can be stressful. That's why we're dedicated to providing exceptional service that makes your relocation experience as smooth and hassle-free as possible.
            </p>
            
            <p className="text-lg text-muted-foreground mb-5">
              Our team consists of trained professionals who treat your belongings with the utmost care and respect. We take pride in our attention to detail and commitment to customer satisfaction.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
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

