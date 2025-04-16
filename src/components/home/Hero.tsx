
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Truck, Star, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-desert-sunset min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="/public/lovable-uploads/9afd8ea4-428a-4559-922e-c48973cd49f5.png"
          alt="Background texture" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-pharaohBlue font-playfair">
              Your <span className="text-primary">Journey</span> To A New Beginning
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Professional and reliable moving services in Westerville, Ohio. Let us guide your possessions safely to their new home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium px-6 py-5 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center">
                  Request Your Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 font-medium px-6 py-5 rounded-md transition-all duration-300 text-lg">
                  Explore Services
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-3xl">
              <div className="flex items-center gap-2 bg-white/80 p-3 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Truck size={20} className="text-primary" />
                </div>
                <span className="font-medium">Local & Long Distance</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-3 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package size={20} className="text-primary" />
                </div>
                <span className="font-medium">Storage Solutions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-3 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Shield size={20} className="text-primary" />
                </div>
                <span className="font-medium">Fully Insured</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative bg-white/90 p-8 rounded-lg shadow-xl animate-fadeIn" style={{animationDelay: '0.3s'}}>
              <img 
                src="/public/lovable-uploads/295a11a3-e163-4559-922e-c48973cd49f7.png" 
                alt="Oasis Moving" 
                className="rounded-lg shadow-sm mb-4 w-full h-auto"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl border border-primary/20">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                </div>
                <p className="text-lg font-medium mt-2">500+ Satisfied Customers</p>
              </div>
            </div>
            
            <div className="hidden md:block absolute -bottom-12 -right-12 w-48 h-48 opacity-50 rounded-full animate-float">
              <img 
                src="/public/lovable-uploads/46ed7f82-e370-4a39-8fe6-1b5612146354.png" 
                alt="Decorative element" 
                className="w-full h-full object-contain opacity-40"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
