
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
    console.log("Setting up AuthGuard with adminOnly:", adminOnly);
    
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed in AuthGuard:", event, newSession ? "has session" : "no session");
        
        if (isMounted) {
          setSession(newSession);
          
          if (newSession) {
            if (adminOnly) {
              try {
                // Add a delay before checking admin status
                await new Promise(resolve => setTimeout(resolve, 1000));
                const adminStatus = await isUserAdmin();
                console.log(`Admin status check in AuthGuard: ${adminStatus}`);
                
                if (isMounted) {
                  setIsAdmin(adminStatus);
                }
              } catch (error) {
                console.error("Error checking admin status in AuthGuard:", error);
                if (isMounted) {
                  setIsAdmin(false);
                }
              }
            }
          } else {
            if (isMounted) {
              setIsAdmin(false);
            }
          }
          
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    );

    // Check for existing session
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        console.log("Initial session check in AuthGuard:", data.session ? "session found" : "no session");
        
        if (isMounted) {
          setSession(data.session);
          
          if (data.session && adminOnly) {
            try {
              // Add a longer delay for initial check
              await new Promise(resolve => setTimeout(resolve, 1500));
              const adminStatus = await isUserAdmin();
              console.log(`Initial admin status check in AuthGuard: ${adminStatus}`);
              
              if (isMounted) {
                setIsAdmin(adminStatus);
              }
            } catch (error) {
              console.error("Error in initial admin check:", error);
              if (isMounted) {
                setIsAdmin(false);
              }
            }
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking session in AuthGuard:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [adminOnly]);

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
    console.log("No session, redirecting to auth page");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Admin route but user is not admin
  if (adminOnly && !isAdmin) {
    console.log("User is not admin, redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("Authentication successful, rendering protected content");
  return <>{children}</>;
};

export default AuthGuard;
