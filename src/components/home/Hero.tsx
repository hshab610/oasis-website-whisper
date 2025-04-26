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
        
        {/* Cairo skyline overlay - Adjusted for better visibility */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[40vh]" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22%3E%3Cpath d=%22M0,256 L48,240 C96,224 192,192 288,192 C384,192 480,224 576,213.3 C672,203 768,149 864,128 C960,107 1056,117 1152,144 C1248,171 1344,213 1392,234.7 L1440,256 L1440,320 L1392,320 C1344,320 1248,320 1152,320 C1056,320 960,320 864,320 C768,320 672,320 576,320 C480,320 384,320 288,320 C192,320 96,320 48,320 L0,320 Z%22 fill=%22%23007791%22 fill-opacity=%220.25%22/%3E%3C/svg%3E')",
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'repeat-x',
            mixBlendMode: 'soft-light',
            transform: 'scale(1.1)',
            filter: 'contrast(1.2)'
          }}
        />
        
        {/* Additional skyline layer for depth */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[35vh]" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22%3E%3Cpath d=%22M0,224 L48,213.3 C96,203 192,181 288,181.3 C384,181 480,203 576,192 C672,181 768,139 864,128 C960,117 1056,139 1152,160 C1248,181 1344,203 1392,213.3 L1440,224 L1440,320 L1392,320 C1344,320 1248,320 1152,320 C1056,320 960,320 864,320 C768,320 672,320 576,320 C480,320 384,320 288,320 C192,320 96,320 48,320 L0,320 Z%22 fill=%22%23005571%22 fill-opacity=%220.2%22/%3E%3C/svg%3E')",
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'repeat-x',
            mixBlendMode: 'soft-light',
            transform: 'scale(1.05)',
            filter: 'contrast(1.1)'
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
