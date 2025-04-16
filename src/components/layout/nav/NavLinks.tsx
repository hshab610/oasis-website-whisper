
import { Link } from 'react-router-dom';

interface NavLinksProps {
  mobile?: boolean;
  closeMenu?: () => void;
}

export const NavLinks = ({ mobile = false, closeMenu }: NavLinksProps) => {
  const handleClick = () => {
    if (mobile && closeMenu) {
      closeMenu();
    }
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className={`${mobile ? 'flex flex-col space-y-6' : 'flex space-x-10'}`}>
      {links.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className="font-medium text-lg text-foreground hover:text-primary transition-colors duration-300 relative group"
          onClick={handleClick}
        >
          {link.name}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </div>
  );
};
