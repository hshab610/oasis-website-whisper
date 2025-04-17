
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarCheck, DollarSign } from 'lucide-react';

const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
      <Link to="/contact" className="w-full sm:w-auto mx-auto">
        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium px-6 py-5 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center">
          <CalendarCheck className="mr-2 h-5 w-5" />
          Book Your Move
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
      <a href="#quick-estimate" className="w-full sm:w-auto mx-auto">
        <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 font-medium px-6 py-5 rounded-md transition-all duration-300 text-lg flex items-center justify-center">
          <DollarSign className="mr-2 h-5 w-5" />
          Calculate Cost
        </Button>
      </a>
    </div>
  );
};

export default HeroButtons;
