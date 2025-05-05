
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const MovingProcessPreview = () => {
  return (
    <section className="py-12 bg-primary/5 relative">
      <div className="absolute inset-0 ancient-patterns opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Simple 3-Step Moving Process</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            We've streamlined the moving process to make your relocation as stress-free as possible.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-md flex-1 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">1</div>
            <h3 className="text-xl font-semibold mb-2">Book Your Move</h3>
            <p className="text-muted-foreground">Contact us for a free quote and choose your preferred moving date.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md flex-1 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">2</div>
            <h3 className="text-xl font-semibold mb-2">We Handle Everything</h3>
            <p className="text-muted-foreground">Our professional team arrives on time and takes care of your move.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md flex-1 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">3</div>
            <h3 className="text-xl font-semibold mb-2">Relax in Your New Home</h3>
            <p className="text-muted-foreground">Enjoy your new space while we handle the heavy lifting.</p>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/about#process">
            <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10">
              Learn More About Our Process
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MovingProcessPreview;
