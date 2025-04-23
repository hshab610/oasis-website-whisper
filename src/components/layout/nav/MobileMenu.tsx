
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { NavLinks } from './NavLinks';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-3 pb-3 animate-fadeIn w-[90%] mx-auto">
      <div className="flex flex-col space-y-5">
        <NavLinks mobile={true} closeMenu={onClose} />
        <div className="space-y-3 pt-2">
          <Link to="/contact" onClick={onClose} className="block w-full">
            <Button className="cta-button w-full min-h-[48px] py-3 transform active:scale-[0.98] transition-transform">
              Get a Quote
            </Button>
          </Link>
          <a href="tel:+16147400275" className="block w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center justify-center gap-2 w-full min-h-[48px] py-3 transform active:scale-[0.98] transition-transform"
            >
              <Phone size={16} />
              <span className="text-base">614-740-0275</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
