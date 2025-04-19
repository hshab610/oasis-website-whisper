
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Truck, Star, Shield, DollarSign, CalendarCheck } from 'lucide-react';
import HeroButtons from './hero/HeroButtons';
import HeroFeatures from './hero/HeroFeatures';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-desert-sunset min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="/lovable-uploads/9afd8ea4-428a-4559-922e-c48973cd49f5.png"
          alt="" 
          aria-hidden="true"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='200' fill='%23EDE6D6' fill-opacity='0.3'/%3E%3Cg fill='%23C2AF83' fill-opacity='0.2'%3E%3Cpath d='M20 20h10v10H20z'/%3E%3Cpath d='M50 20h10v10H50z'/%3E%3Cpath d='M80 20h10v10H80'/%3E%3Cpath d='M110 20h10v10H110z'/%3E%3Cpath d='M140 20h10v10H140z'/%3E%3Cpath d='M35 40h10v10H35z'/%3E%3Cpath d='M65 40h10v10H65z'/%3E%3Cpath d='M95 40h10v10H95z'/%3E%3Cpath d='M125 40h10v10H125z'/%3E%3C/g%3E%3C/svg%3E";
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fadeIn bg-overlay-fix text-center lg:text-left mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-pharaohBlue font-playfair hero-heading text-center">
              Your <span className="text-primary">Journey</span> To A New Beginning
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed hero-description text-center mx-auto">
              Professional and reliable moving services in Westerville, Ohio. Let us guide your possessions safely to their new home.
            </p>
            
            <HeroButtons />
            
            <HeroFeatures />
          </div>
          
          <div className="relative hidden lg:block mx-auto text-center">
            <div className="relative bg-white/90 p-8 rounded-lg shadow-xl animate-fadeIn mx-auto" style={{animationDelay: '0.3s'}}>
              <img 
                src="/lovable-uploads/295a11a3-e163-4559-922e-c48973cd49f7.png" 
                alt="Professional movers carefully handling furniture" 
                className="rounded-lg shadow-sm mb-4 w-full h-auto mx-auto"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg width='600' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='600' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%239ca3af'%3EMoving Professionals%3C/text%3E%3C/svg%3E";
                }}
              />
              
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl border border-primary/20">
                <div className="flex items-center justify-center gap-2">
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                  <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                </div>
                <p className="text-lg font-medium mt-2 text-center">500+ Satisfied Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
