
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="h-12 w-12">
        <img 
          src="/lovable-uploads/f19c55da-68b3-48d5-a1b2-9944693d66bf.png" 
          alt="Oasis Moving & Storage" 
          className="h-full w-auto"
        />
      </div>
      <div className="flex flex-col items-start">
        <div className="text-xl font-bold text-sunsetOrange mobile-text-adjust">
          Oasis Moving & Storage
        </div>
        <span className="text-xs text-muted-foreground">Trusted, Timely, Tough</span>
      </div>
    </Link>
  );
};
