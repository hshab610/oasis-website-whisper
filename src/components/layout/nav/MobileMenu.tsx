
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { NavLinks } from './NavLinks';

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
        <Button className="cta-button w-full">Get a Quote</Button>
        <Button variant="outline" size="sm" className="flex items-center justify-center gap-2">
          <Phone size={16} />
          <span>614-740-0275</span>
        </Button>
      </div>
    </div>
  );
};
