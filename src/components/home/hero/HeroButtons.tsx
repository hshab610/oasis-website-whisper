
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, Truck, BadgePercent } from 'lucide-react';
import QuoteButton from '@/components/contact/QuoteButton';
import { usePromotion } from '@/contexts/PromotionContext';

const HeroButtons = () => {
  const { isPromotionActive, discountPercentage } = usePromotion();
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6 mx-auto">
      <Link to="/contact" className="w-full sm:w-auto">
        <QuoteButton 
          text="Book Your Move"
          icon={false}
          className="w-full sm:w-auto px-8 py-6 text-lg h-auto group relative"
          size="xl"
        >
          <Truck className="mr-2 h-6 w-6" />
          {isPromotionActive ? (
            <span className="flex items-center">
              Book Now 
              <span className="bg-white/20 text-white rounded-full px-2 py-0.5 ml-2 font-bold text-sm flex items-center">
                <BadgePercent className="h-4 w-4 mr-1" />
                {discountPercentage}% OFF
              </span>
            </span>
          ) : (
            "Book Your Move"
          )}
          <ArrowRight className="ml-2 h-6 w-6" />
        </QuoteButton>
      </Link>
      <a href="#quick-estimate" className="w-full sm:w-auto">
        <Button 
          variant="outline" 
          size="xl" 
          className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/10 font-bold px-8 py-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center h-auto"
        >
          <Calculator className="mr-2 h-6 w-6" />
          Calculate Cost
        </Button>
      </a>
    </div>
  );
};

export default HeroButtons;
