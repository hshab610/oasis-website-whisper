
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export const Logo = () => {
  const isMobile = useIsMobile();
  
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'}`}>
        <img 
          src="/lovable-uploads/f19c55da-68b3-48d5-a1b2-9944693d66bf.png" 
          alt="Oasis Moving & Storage" 
          className="h-full w-auto"
        />
      </div>
      <div className="flex flex-col items-start">
        <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-sunsetOrange`}>
          Oasis Moving & Storage
        </div>
        <span className="text-xs text-muted-foreground leading-tight">Trusted, Timely, Tough</span>
      </div>
    </Link>
  );
};
