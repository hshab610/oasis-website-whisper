
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
    <div 
      className={`
        ${mobile 
          ? 'flex flex-col space-y-3 w-full' 
          : 'hidden md:flex md:space-x-4 lg:space-x-5'
        }
      `}
    >
      {links.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className={`
            font-medium text-sm lg:text-base text-foreground hover:text-sunsetOrange transition-colors duration-300 
            ${mobile ? 'py-2.5 border-b border-primary/10' : 'relative group py-2'}
          `}
          onClick={handleClick}
        >
          {link.name}
          {!mobile && (
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunsetOrange transition-all duration-300 group-hover:w-full"></span>
          )}
        </Link>
      ))}
    </div>
  );
};
