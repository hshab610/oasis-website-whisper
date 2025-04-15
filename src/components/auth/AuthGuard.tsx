
import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { isUserAdmin } from '@/utils/auth';

const AuthGuard = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    
    const checkAdminStatus = async (userId: string) => {
      try {
        // Add a small delay to ensure session is established
        await new Promise(resolve => setTimeout(resolve, 500));
        const adminStatus = await isUserAdmin();
        console.log(`Admin status check for user ${userId}: ${adminStatus}`);
        
        if (isMounted) {
          setIsAdmin(adminStatus);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        if (isMounted) {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };

    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", session ? "logged in" : "logged out");
      if (isMounted) {
        setSession(session);
        if (session) {
          checkAdminStatus(session.user.id);
        } else {
          setLoading(false);
        }
      }
    });

    // Then check for an existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Initial session check:", session ? "session found" : "no session");
      if (isMounted) {
        setSession(session);
        if (session) {
          checkAdminStatus(session.user.id);
        } else {
          setLoading(false);
        }
      }
    });

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
