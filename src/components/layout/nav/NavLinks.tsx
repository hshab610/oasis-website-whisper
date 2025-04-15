
import { Link } from 'react-router-dom';

interface NavLinksProps {
  mobile?: boolean;
  closeMenu?: () => void;
}

export const NavLinks = ({ mobile = false, closeMenu }: NavLinksProps) => {
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
