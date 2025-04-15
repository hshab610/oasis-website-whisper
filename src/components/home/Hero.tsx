
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Truck, Star } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero-pattern relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your <span className="text-primary">Smooth Move</span> Starts Here
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Professional and reliable moving services in Westerville, Ohio. We take care of every detail so you can focus on your new beginnings.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact">
                <Button className="cta-button">
                  Quote My Move!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="bg-white/80">
                Explore Services
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Truck size={20} className="text-primary" />
                </div>
                <span className="font-medium">Local & Long Distance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package size={20} className="text-primary" />
                </div>
                <span className="font-medium">Storage Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Star size={20} className="text-primary" />
                </div>
                <span className="font-medium">5-Star Service</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative bg-white p-8 rounded-lg shadow-lg arch-top animate-fadeIn" style={{animationDelay: '0.3s'}}>
              <img 
                src="https://images.unsplash.com/photo-1600518464441-9306b00c4746?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Oasis Moving" 
                className="rounded-lg shadow-sm mb-4"
              />
              
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-md border border-border">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500 h-4 w-4 fill-yellow-500" />
                  <Star className="text-yellow-500 h-4 w-4 fill-yellow-500" />
                  <Star className="text-yellow-500 h-4 w-4 fill-yellow-500" />
                  <Star className="text-yellow-500 h-4 w-4 fill-yellow-500" />
                  <Star className="text-yellow-500 h-4 w-4 fill-yellow-500" />
                </div>
                <p className="text-sm font-medium mt-1">500+ Satisfied Customers</p>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 pattern-divider h-32 w-32 opacity-50 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
