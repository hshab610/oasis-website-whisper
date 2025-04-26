
import { Link } from 'react-router-dom';
import { Star, CheckCircle, Shield, Clock, Phone } from 'lucide-react';
import HeroButtons from './hero/HeroButtons';
import HeroFeatures from './hero/HeroFeatures';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative overflow-hidden min-h-[92vh] flex items-center">
      <div className="absolute inset-0 z-0">
        {/* Background gradient overlay to improve image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-pharaohBlue/10 via-transparent to-nileTeal/10"></div>
        <div className="absolute inset-0 bg-ancient-pattern opacity-5"></div>
        
        {/* Cairo skyline overlay with enhanced visibility */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[30vh]" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1000 120%22 preserveAspectRatio=%22none%22%3E%3Cpath d=%22M0,100 L50,70 L100,90 L150,50 L200,80 L250,30 L300,70 L350,20 L400,60 L450,40 L500,80 L550,30 L600,60 L650,50 L700,90 L750,40 L800,70 L850,20 L900,60 L950,30 L1000,50 L1000,120 L0,120 Z%22 fill=%22%23007791%22 opacity=%220.75%22/%3E%3C/svg%3E')",
            backgroundPosition: "bottom center",
            backgroundRepeat: "repeat-x",
            backgroundSize: "100% 100%",
            opacity: 0.25,
          }}
        />
        
        {/* Nile flowing animation with subtle animation */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-nileTeal/15 via-nileTeal/25 to-nileTeal/15 animate-wave opacity-25"></div>
        <div className="absolute bottom-16 left-0 right-0 h-8 bg-gradient-to-r from-nileTeal/5 via-nileTeal/15 to-nileTeal/5 animate-wave opacity-20" style={{ animationDelay: '0.5s', animationDuration: '20s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 w-[90%] sm:w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced trust badges */}
          <div className="mb-6 flex flex-col items-center">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full mb-3 shadow-sm inline-flex items-center border border-desertGold/10">
              <Shield className="text-primary h-4 w-4 mr-1.5" />
              <span className="text-xs font-medium">Oasis Moving LLC</span>
              <span className="mx-2 text-gray-300">|</span>
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1 text-primary" />
                <a href="tel:6147400275" className="font-semibold text-xs hover:text-primary transition-colors">(614) 740-0275</a>
              </div>
            </div>
          </div>
          
          <div className="content-card p-6 md:p-8 mb-6 inline-block w-full shadow-xl hover:shadow-2xl transition-all duration-500 animate-fadeIn">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`${i === 4 ? 'text-yellow-400' : 'text-yellow-500'} h-5 w-5 ${i < 4 ? 'fill-yellow-500' : 'fill-yellow-400/50'}`} />
              ))}
              <span className="font-medium ml-1.5 text-base md:text-lg">4.8★ Rated in Westerville</span>
            </div>
            
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold leading-tight text-pharaohBlue font-playfair mb-5 tracking-tight`}>
              Professional <span className="text-primary">Moving</span> Made Simple
            </h1>
            
            <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
              Get an instant quote or book your move in minutes
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-5">
              <div className="flex items-center text-sm text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span>Owner-Supervised</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span>Same-Day Quotes</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
                <Clock className="h-4 w-4 text-primary mr-2" />
                <span>On-Time Service</span>
              </div>
            </div>
            
            <HeroButtons />

            {/* Add urgency trigger */}
            <div className="mt-4 text-sm text-white font-medium bg-pharaohBlue/90 py-2 px-4 rounded-full inline-block shadow-md">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
              Only 2 trucks available for Westerville next week
            </div>
          </div>
          
          <HeroFeatures />
        </div>
      </div>
      
      <div className="nile-wave"></div>
    </div>
  );
};

export default Hero;
