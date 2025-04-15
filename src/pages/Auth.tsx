
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthState } from '@/hooks/use-auth-state';
import AuthForm from '@/components/auth/AuthForm';
import { useEffect, useState } from 'react';
import { isUserAdmin } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { session, loading, setLoading } = useAuthState();
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Don't redirect if we're already checking admin status
    if (checkingAdmin) return;
    
    // Don't redirect on initial render if there's no session
    if (!session) return;
    
    const redirectIfAdmin = async () => {
      try {
        setCheckingAdmin(true);
        console.log("Checking if user is admin on Auth page");
        
        // Check if the URL contains a "just_logged_in" flag
        const params = new URLSearchParams(window.location.search);
        const justLoggedIn = params.get('just_logged_in');
        
        if (justLoggedIn) {
          console.log("Just logged in flag detected, not redirecting");
          // If they just logged in, don't redirect automatically
          setCheckingAdmin(false);
          return;
        }
        
        // Add a delay to ensure the session is established
        await new Promise(resolve => setTimeout(resolve, 1500));
        const isAdmin = await isUserAdmin();
        console.log("Admin check result on Auth page:", isAdmin);
        
        if (isAdmin) {
          toast({
            title: "Admin Access Granted",
            description: "Redirecting to admin dashboard"
          });
          navigate('/admin');
        } else {
          // If not admin, go to home
          navigate('/');
        }
      } catch (error) {
        console.error("Error checking admin status on Auth page:", error);
      } finally {
        setCheckingAdmin(false);
      }
    };

    redirectIfAdmin();
  }, [session, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <AuthForm loading={loading || checkingAdmin} setLoading={setLoading} />
    </div>
  );
};

export default Auth;
