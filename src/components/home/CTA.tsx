
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, Clock, Phone, Shield } from 'lucide-react';
import QuoteButton from '../contact/QuoteButton';
import CTATrustElements from '../ui/trust-elements/CTATrustElements';

const CTA = () => {
  return (
    <section className="bg-nileDeep/5 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-ancient-pattern opacity-5"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto content-card shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-desertGold to-primary"></div>
          <div className="p-8 md:p-10 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/90 px-4 py-2 rounded-lg border border-primary/10 flex items-center shadow-sm">
                <Shield className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">Licensed & Insured Moving Service</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-pharaohBlue">Ready for a Stress-Free Move?</h2>
            
            <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>Quick booking • Instant price estimate • No obligation</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              <Link to="/contact" className="w-full">
                <QuoteButton 
                  text="Get Free Estimate" 
                  className="w-full shadow-lg hover:shadow-xl transition-all" 
                  size="xl"
                />
              </Link>
              <a href="#quick-estimate" className="w-full">
                <Button 
                  variant="outline" 
                  size="xl"
                  className="w-full border-2 border-primary text-primary font-bold hover:bg-primary/10 shadow-md hover:shadow-lg transition-all"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Cost
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
            
            {/* Simplified trust elements */}
            <CTATrustElements className="mt-6" />
            
            <div className="mt-6 flex justify-center">
              <a href="tel:6147400275" className="text-foreground hover:text-primary transition-colors flex items-center">
                <Phone className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">Call for Availability: (614) 740-0275</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
