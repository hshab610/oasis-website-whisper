
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, Truck, Phone } from 'lucide-react';
import QuoteButton from '@/components/contact/QuoteButton';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroButtons = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex flex-col sm:flex-row gap-4 pt-4 mx-auto ${isMobile ? 'w-full' : 'max-w-lg'}`}>
      <Link to="/contact" className="w-full">
        <QuoteButton 
          text="Book Your Move"
          icon={false}
          className="w-full px-5 py-4 text-base sm:text-lg h-auto min-h-[52px] group relative"
          size="xl"
        >
          <span className="relative z-10 flex items-center justify-center">
            <Truck className="mr-2 h-5 w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            Book Your Move
            <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </span>
        </QuoteButton>
      </Link>
      <div className="flex gap-2 w-full">
        <a href="#quick-estimate" className="flex-1">
          <Button 
            variant="outline" 
            size="xl" 
            className="w-full border-2 border-primary bg-white/80 text-primary hover:bg-primary/10 font-bold px-4 py-4 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-base flex items-center justify-center h-auto min-h-[52px] hover-lift"
          >
            <Calculator className="mr-2 h-5 w-5 flex-shrink-0" />
            Calculate
          </Button>
        </a>
        <a href="tel:6147400275" className="flex-1">
          <Button 
            variant="outline" 
            size="xl" 
            className="w-full border-2 border-primary bg-white/80 text-primary hover:bg-primary/10 font-bold px-4 py-4 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-base flex items-center justify-center h-auto min-h-[52px] hover-lift"
          >
            <Phone className="mr-2 h-5 w-5 flex-shrink-0" />
            Call Us
          </Button>
        </a>
      </div>
    </div>
  );
};

export default HeroButtons;
