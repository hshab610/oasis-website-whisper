
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              <span className="text-foreground">Oasis</span> Moving & Storage
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Phone size={16} />
                <span>614-740-0275</span>
              </Button>
              <Button className="cta-button">Get a Quote</Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <NavLinks mobile={true} closeMenu={() => setIsMenuOpen(false)} />
              <Button className="cta-button w-full">Get a Quote</Button>
              <Button variant="outline" size="sm" className="flex items-center justify-center gap-2">
                <Phone size={16} />
                <span>614-740-0275</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  closeMenu?: () => void;
}

const NavLinks = ({ mobile = false, closeMenu }: NavLinksProps) => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`${
            mobile ? 'block py-2 text-foreground hover:text-primary' : 'text-foreground hover:text-primary'
          } transition-colors duration-200`}
          onClick={closeMenu}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
