
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator } from 'lucide-react';
import QuoteButton from '../contact/QuoteButton';

const CTA = () => {
  return (
    <section className="bg-primary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Move? It Takes 2 Minutes</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Quick booking process • Instant price estimate • No obligation
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link to="/contact">
                <QuoteButton 
                  text="Book Your Move" 
                  className="w-full" 
                  size="xl"
                />
              </Link>
              <a href="#quick-estimate">
                <Button 
                  variant="outline" 
                  size="xl"
                  className="w-full border-2 border-primary text-primary font-bold hover:bg-primary/10"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Cost
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
