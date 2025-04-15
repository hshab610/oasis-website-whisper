
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { isUserAdmin } from '@/utils/auth';

const AuthGuard = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    
    // First check for existing session (synchronous)
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(data.session);
          
          // Only check admin status if we have a session
          if (data.session) {
            // Add a delay before checking admin status
            await new Promise(resolve => setTimeout(resolve, 500));
            const adminStatus = await isUserAdmin();
            console.log(`Admin status check: ${adminStatus}`);
            
            if (isMounted) {
              setIsAdmin(adminStatus);
            }
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed:", event, newSession ? "has session" : "no session");
        
        if (isMounted) {
          setSession(newSession);
          
          if (newSession) {
            try {
              // Add a delay before checking admin status
              await new Promise(resolve => setTimeout(resolve, 500));
              const adminStatus = await isUserAdmin();
              console.log(`Admin status check after auth change: ${adminStatus}`);
              
              if (isMounted) {
                setIsAdmin(adminStatus);
              }
            } catch (error) {
              console.error("Error checking admin status:", error);
            }
          } else {
            if (isMounted) {
              setIsAdmin(false);
            }
          }
          
          setLoading(false);
        }
      }
    );

    // Check session
    checkSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }

  // Not logged in, redirect to auth page
  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Admin route but user is not admin
  if (adminOnly && !isAdmin) {
    console.log("User is not admin, redirecting to home");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
