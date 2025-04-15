
import { supabase } from "@/integrations/supabase/client";

export async function isUserAdmin(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log("No active session found");
      return false;
    }

    console.log("Checking admin status for user:", session.user.id);
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      console.error("Error checking admin status:", error);
      return false;
    }

    const isAdmin = data?.role === 'admin';
    console.log("Admin check result:", isAdmin);
    return isAdmin;
  } catch (error) {
    console.error("Error in isUserAdmin function:", error);
    return false;
  }
}

export async function getUserRole() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) return null;

  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .single();

  if (error) return null;

  return data?.role;
}
