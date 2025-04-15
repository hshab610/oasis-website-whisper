
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
    const checkAdminStatus = async () => {
      const adminStatus = await isUserAdmin();
      setIsAdmin(adminStatus);
      setLoading(false);
    };

    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", session ? "logged in" : "logged out");
      setSession(session);
      if (session) {
        await checkAdminStatus();
      } else {
        setLoading(false);
      }
    });

    // Then check for an existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Initial session check:", session ? "session found" : "no session");
      setSession(session);
      if (session) {
        await checkAdminStatus();
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
