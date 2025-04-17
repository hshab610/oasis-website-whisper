
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './nav/Logo';
import { NavLinks } from './nav/NavLinks';
import { MobileMenu } from './nav/MobileMenu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-desertSand/95 sticky top-0 z-50 shadow-sm safe-area-padding">
      <div className="container mx-auto px-3 py-2">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex justify-between items-center w-full">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLinks />
              <div className="flex items-center space-x-2">
                <a href="tel:+16147400275" aria-label="Call us at 614-740-0275">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-foreground">
                    <Phone size={16} />
                    <span>614-740-0275</span>
                  </Button>
                </a>
                <Link to="/contact">
                  <Button className="bg-sunsetOrange hover:bg-sunsetOrange/90 text-white">Get a Quote</Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-foreground hover:text-primary focus:outline-none p-2"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;

