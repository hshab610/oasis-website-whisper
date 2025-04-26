
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, Truck, BadgePercent } from 'lucide-react';
import QuoteButton from '@/components/contact/QuoteButton';
import { usePromotion } from '@/contexts/PromotionContext';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroButtons = () => {
  const { isPromotionActive, discountPercentage } = usePromotion();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4 mx-auto">
      <Link to="/contact" className="w-full sm:w-auto">
        <QuoteButton 
          text="Book Your Move"
          icon={false}
          className="w-full sm:w-auto px-5 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto min-h-[48px] group relative"
          size="xl"
        >
          <span className="relative z-10 flex items-center">
            <Truck className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            {isPromotionActive ? (
              <span className="flex items-center">
                Book Now 
                <span className="bg-white/20 text-white rounded-md px-2 py-0.5 ml-2 font-bold text-xs sm:text-sm flex items-center">
                  <BadgePercent className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  {discountPercentage}% OFF
                </span>
              </span>
            ) : (
              "Book Your Move"
            )}
            <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
          </span>
        </QuoteButton>
      </Link>
      <a href="#quick-estimate" className="w-full sm:w-auto">
        <Button 
          variant="outline" 
          size="xl" 
          className="w-full sm:w-auto border-2 border-primary bg-white/80 text-primary hover:bg-primary/10 font-bold px-5 sm:px-8 py-4 sm:py-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center h-auto min-h-[48px] hover-lift"
        >
          <Calculator className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
          Calculate Cost
        </Button>
      </a>
    </div>
  );
};

export default HeroButtons;
