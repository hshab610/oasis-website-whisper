
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
    <div className="md:hidden mt-4 pb-4 animate-fadeIn">
      <div className="flex flex-col space-y-4">
        <NavLinks mobile={true} closeMenu={onClose} />
        <Link to="/contact" onClick={onClose}>
          <Button className="cta-button w-full">Get a Quote</Button>
        </Link>
        <a href="tel:+16147400275">
          <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 w-full">
            <Phone size={16} />
            <span>614-740-0275</span>
          </Button>
        </a>
      </div>
    </div>
  );
};
