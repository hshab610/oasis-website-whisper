
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Truck, Star, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-desert-sunset pt-12 pb-20">
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="/public/lovable-uploads/9afd8ea4-428a-4559-922e-c48973cd49f5.png"
          alt="Background texture" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-pharaohBlue">
              Your <span className="text-primary">Journey</span> To A New Beginning
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Professional and reliable moving services in Westerville, Ohio. Let us guide your possessions safely to their new home.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center">
                  Request Your Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-medium px-6 py-3 rounded-md transition-all duration-300">
                  Explore Services
                </Button>
              </Link>
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
                  <Shield size={20} className="text-primary" />
                </div>
                <span className="font-medium">Fully Insured</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative bg-white/80 p-8 rounded-lg shadow-lg animate-fadeIn" style={{animationDelay: '0.3s'}}>
              <img 
                src="/public/lovable-uploads/295a11a3-e163-4559-937e-8539bb5f49f7.png" 
                alt="Oasis Moving" 
                className="rounded-lg shadow-sm mb-4 w-full h-auto"
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
            
            <div className="hidden md:block absolute -bottom-10 -right-10 w-40 h-40 opacity-50 rounded-full animate-float">
              <img 
                src="/public/lovable-uploads/46ed7f82-e370-4a39-8fe6-1b5612146354.png" 
                alt="Decorative element" 
                className="w-full h-full object-contain opacity-40"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
