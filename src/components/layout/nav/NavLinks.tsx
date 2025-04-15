
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
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Check auth status on mount
    const checkAuth = async () => {
      try {
        setIsChecking(true);
        const { data } = await supabase.auth.getSession();
        const hasSession = !!data.session;
        setIsLoggedIn(hasSession);
        
        if (hasSession) {
          // Wait a bit to ensure the session is established
          await new Promise(resolve => setTimeout(resolve, 500));
          const role = await getUserRole();
          setIsAdmin(role === 'admin');
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkAuth();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          const hasSession = !!session;
          setIsLoggedIn(hasSession);
          
          if (hasSession) {
            // Wait a bit to ensure the session is established
            await new Promise(resolve => setTimeout(resolve, 500));
            const role = await getUserRole();
            setIsAdmin(role === 'admin');
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error in auth state change handler:", error);
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
