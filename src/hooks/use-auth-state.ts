
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session } from '@supabase/supabase-js';

export const useAuthState = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let isMounted = true;
    console.log("Setting up auth state in useAuthState");
    
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log("Auth state changed in useAuthState:", newSession ? "logged in" : "logged out");
      if (isMounted) {
        setSession(newSession);
        setLoading(false);
      }
    });

    // Then check for an existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check in useAuthState:", currentSession ? "session found" : "no session");
      if (isMounted) {
        setSession(currentSession);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, loading, setLoading };
};
