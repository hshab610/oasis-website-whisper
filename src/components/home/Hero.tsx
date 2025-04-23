
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import HeroButtons from './hero/HeroButtons';
import HeroFeatures from './hero/HeroFeatures';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative overflow-hidden bg-desert-sunset min-h-[90vh] flex items-center">
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
      
      <div className="container mx-auto px-4 relative z-10 w-[90%] sm:w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl mb-6 inline-block w-full">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-500 h-4 w-4 fill-yellow-500" />
              ))}
              <span className="font-medium ml-1 text-sm md:text-base">500+ Satisfied Customers</span>
            </div>
            
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold leading-tight text-pharaohBlue font-playfair mb-4 tracking-tight`}>
              Professional <span className="text-primary">Moving</span> Made Simple
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
              Get an instant quote or book your move in minutes
            </p>
            
            <HeroButtons />
          </div>
          
          <HeroFeatures />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
