
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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"100\" height=\"20\" viewBox=\"0 0 100 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M21.184 20c.357-.13.72-.264.888-.14 1.652-1.1 2.782-2.752 3.112-4.83.33-2.077-.014-4.335-.902-6.164C23.507 7.327 22.602 6 21.5 6a2.5 2.5 0 0 0-2.5 2.5c0 1.276.958 2.33 2.197 2.487-.43.13-.888.264-1.378.14-1.65-1.1-2.782-2.752-3.112-4.83-.33-2.077.014-4.335.902-6.164C18.493.673 19.398 0 20.5 0c1.923 0 3.33 2.234 3.43 5m1.5 0c.357-.13.72-.264.888-.14 1.652-1.1 2.782-2.752 3.112-4.83.33-2.077-.014-4.335-.902-6.164C28.323 7.327 27.402 6 26.3 6c-1.923 0-3.33 2.234-3.43 5m12.523 0c.6.113.92.275 1.015.49.028-.036.057-.073.087-.11.276-.322.47-.705.477-1.14.01-.438-.155-.856-.44-1.163-.57-.607-1.398-.868-2.16-.936-.762-.07-1.523.17-2.115.56.168-.17.32-.36.455-.56a2.83 2.83 0 0 0 .43-1.282c.02-.47-.07-.92-.29-1.33.466.19.977.207 1.455.095.477-.114.87-.38 1.14-.703a1.982 1.982 0 0 0 .236-.376 3.456 3.456 0 0 0 .515-1.86c0-1.077-.493-2.052-1.284-2.7-.786-.644-1.86-1-3.028-1H32.4c.712 0 1.208.45 1.208 1s-.496 1-1.208 1H30.64c-.598 0-1.068.435-1.068.998 0 .562.47.998 1.07.998h1.408c.712 0 1.208.45 1.208 1s-.496 1-1.208 1H28.64c-.598 0-1.068.435-1.068.998 0 .562.47.998 1.07.998h1.408c.712 0 1.208.45 1.208 1s-.496 1-1.208 1H27.44c-.598 0-1.068.435-1.068.998 0 .562.47.998 1.07.998h1.208c.712 0 1.208.45 1.208 1s-.496 1-1.208 1H25.15c2.058 0 3.618 1.995 3.645 4.5.13.104.17.208.22.312 0-.038.01-.074.01-.11\" fill=\"%2373A6AD\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')] opacity-20"></div>
        
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
