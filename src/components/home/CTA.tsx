
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, Clock, Shield, Star, Calendar, Phone } from 'lucide-react';
import QuoteButton from '../contact/QuoteButton';

const CTA = () => {
  return (
    <section className="bg-primary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white/95 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8 md:p-10 text-center">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`${i === 4 ? 'text-yellow-400' : 'text-yellow-500'} h-4 w-4 ${i < 4 ? 'fill-yellow-500' : 'fill-yellow-400/50'}`} />
              ))}
              <span className="font-medium ml-1 text-sm">4.8★ Rated Service</span>
              <span className="mx-2 text-gray-300">|</span>
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1 text-primary" />
                <a href="tel:6147400275" className="text-sm hover:text-primary">(614) 740-0275</a>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Move? It Takes 2 Minutes</h2>
            
            <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>Quick booking process • Instant price estimate • No obligation</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              <Link to="/contact" className="w-full">
                <QuoteButton 
                  text="Get Free Estimate" 
                  className="w-full" 
                  size="xl"
                />
              </Link>
              <a href="#quick-estimate" className="w-full">
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
            
            {/* Enhanced trust elements */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Licensed & Insured • DOT #123456789</span>
              </div>
              
              <div className="flex items-center justify-center mt-2 text-xs px-3 py-1.5 bg-yellow-50 rounded-full border border-desertGold/20">
                <Calendar className="h-3 w-3 text-desertGold mr-1.5" />
                <span className="font-medium text-desertGold">Westerville Slots Available: Book Now!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
