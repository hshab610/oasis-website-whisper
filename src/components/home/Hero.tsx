
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import HeroButtons from './hero/HeroButtons';
import HeroFeatures from './hero/HeroFeatures';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative overflow-hidden bg-desert-sunset min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nileTeal/10 to-transparent animate-float"></div>
        <div className="absolute inset-0 bg-ancient-pattern opacity-20"></div>
        
        {/* Cairo skyline overlay */}
        <div 
          className="absolute inset-0 cairo-skyline-pattern opacity-10" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1000 120%22 preserveAspectRatio=%22none%22%3E%3Cpath d=%22M0,100 L50,70 L100,90 L150,50 L200,80 L250,30 L300,70 L350,20 L400,60 L450,40 L500,80 L550,30 L600,60 L650,50 L700,90 L750,40 L800,70 L850,20 L900,60 L950,30 L1000,50 L1000,120 L0,120 Z%22 fill=%22%23007791%22 opacity=%220.15%22/%3E%3C/svg%3E')",
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Nile flowing animation */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-nileTeal/20 via-nileTeal/40 to-nileTeal/20 animate-wave opacity-30"></div>
        <div className="absolute bottom-16 left-0 right-0 h-8 bg-gradient-to-r from-nileTeal/10 via-nileTeal/30 to-nileTeal/10 animate-wave opacity-20" style={{ animationDelay: '0.5s', animationDuration: '20s' }}></div>
        <div className="absolute bottom-24 left-0 right-0 h-4 bg-gradient-to-r from-nileTeal/5 via-nileTeal/20 to-nileTeal/5 animate-wave opacity-15" style={{ animationDelay: '1s', animationDuration: '25s' }}></div>
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
      
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-24 bg-gradient-to-t from-nileTeal/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
