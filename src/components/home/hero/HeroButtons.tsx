
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, Truck } from 'lucide-react';

const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6 mx-auto">
      <Link to="/contact" className="w-full sm:w-auto">
        <Button size="xl" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 rounded-md shadow-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center">
          <Truck className="mr-2 h-6 w-6" />
          Book Your Move
          <ArrowRight className="ml-2 h-6 w-6 animate-pulse" />
        </Button>
      </Link>
      <a href="#quick-estimate" className="w-full sm:w-auto">
        <Button variant="outline" size="xl" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/10 font-bold px-8 py-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center">
          <Calculator className="mr-2 h-6 w-6" />
          Calculate Cost
        </Button>
      </a>
    </div>
  );
};

export default HeroButtons;
