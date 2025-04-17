
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarCheck, DollarSign, ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="bg-primary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for a Stress-Free Move?</h2>
              <p className="text-muted-foreground mb-6">
                Get your personalized quote today and experience the Oasis difference.
                Our professional team is ready to make your move smooth and easy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to="/contact">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Book Your Move
                  </Button>
                </Link>
                <a href="#quick-estimate">
                  <Button variant="outline" className="w-full border-primary text-primary">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Calculate Cost
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="bg-primary/20 p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-4">Why Choose Oasis Moving?</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 p-1 rounded-full flex items-center justify-center mt-1">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Transparent, upfront pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 p-1 rounded-full flex items-center justify-center mt-1">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Professional, experienced movers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 p-1 rounded-full flex items-center justify-center mt-1">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Fully insured and licensed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 p-1 rounded-full flex items-center justify-center mt-1">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>500+ satisfied customers</span>
                </li>
              </ul>
              <Link to="/testimonials" className="text-primary inline-flex items-center hover:underline">
                Read our customer reviews
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
