
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session } from '@supabase/supabase-js';

export const useAuthState = () => {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed in useAuthState:", session ? "logged in" : "logged out");
      setSession(session);
    });

    // Then check for an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check in useAuthState:", session ? "session found" : "no session");
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading, setLoading };
};
