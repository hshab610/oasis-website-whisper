
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getUserRole } from '@/utils/auth';

interface NavLinksProps {
  mobile?: boolean;
  closeMenu?: () => void;
}

export const NavLinks = ({ mobile = false, closeMenu }: NavLinksProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check auth status on mount
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
      
      if (data.session) {
        const role = await getUserRole();
        setIsAdmin(role === 'admin');
      }
    };
    
    checkAuth();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoggedIn(!!session);
        
        if (session) {
          const role = await getUserRole();
          setIsAdmin(role === 'admin');
        } else {
          setIsAdmin(false);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];
  
  // Only show admin link if user is logged in and has admin role
  const adminLinks = isAdmin ? [{ name: 'Admin', path: '/admin' }] : [];
  
  // Add auth link if not logged in
  const authLinks = !isLoggedIn ? [{ name: 'Login', path: '/auth' }] : [];
  
  // Combine all links
  const allLinks = [...links, ...adminLinks, ...authLinks];

  return (
    <>
      {allLinks.map((link) => (
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
