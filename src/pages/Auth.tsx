
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@/hooks/use-auth-state';
import AuthForm from '@/components/auth/AuthForm';
import { useEffect } from 'react';
import { isUserAdmin } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { session, loading, setLoading } = useAuthState();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Only check for admin and redirect if we have a session
    // BUT we don't want to immediately redirect new logins
    const redirectIfAdmin = async () => {
      if (!session) return;
      
      try {
        // Check if the URL contains a "just_logged_in" flag
        const params = new URLSearchParams(window.location.search);
        const justLoggedIn = params.get('just_logged_in');
        
        if (justLoggedIn) {
          // If they just logged in, don't redirect automatically
          return;
        }
        
        // Add a small delay to ensure the session is established
        await new Promise(resolve => setTimeout(resolve, 800));
        const isAdmin = await isUserAdmin();
        console.log("Admin check result on Auth page:", isAdmin);
        
        if (isAdmin) {
          toast({
            title: "Admin Access Granted",
            description: "Redirecting to admin dashboard"
          });
          navigate('/admin');
        }
      } catch (error) {
        console.error("Error checking admin status on Auth page:", error);
      }
    };

    redirectIfAdmin();
  }, [session, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <AuthForm loading={loading} setLoading={setLoading} />
    </div>
  );
};

export default Auth;
