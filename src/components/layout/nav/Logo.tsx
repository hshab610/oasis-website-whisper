
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-4">
      <img 
        src="/lovable-uploads/f19c55da-68b3-48d5-a1b2-9944693d66bf.png" 
        alt="Oasis Moving & Storage" 
        className="h-16 w-auto"
      />
      <div className="flex flex-col">
        <div className="text-2xl font-bold text-primary">
          Oasis Moving & Storage
        </div>
        <span className="text-sm text-muted-foreground">Trusted, Timely, Tough</span>
      </div>
    </Link>
  );
};
