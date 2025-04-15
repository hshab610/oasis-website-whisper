
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Stress-Free Move?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Let us handle the heavy lifting while you focus on your new beginnings.
            Contact us today to schedule your move or get a free quote.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-md font-medium w-full sm:w-auto">
                Quote My Move!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <a href="tel:+16147400275" aria-label="Call us at 614-740-0275">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium w-full sm:w-auto">
                <Phone className="mr-2 h-5 w-5" />
                Call 614-740-0275
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white/10"></div>
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-white/5"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-white/5"></div>
      </div>
    </section>
  );
};

export default CTA;
