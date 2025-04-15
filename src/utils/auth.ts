
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
      .maybeSingle(); // Use maybeSingle() instead of single() to handle no results

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
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return null;

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .maybeSingle(); // Use maybeSingle() instead of single()

    if (error) {
      console.error("Error fetching user role:", error);
      return null;
    }

    return data?.role;
  } catch (error) {
    console.error("Error in getUserRole function:", error);
    return null;
  }
}
