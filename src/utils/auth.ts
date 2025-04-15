
import { supabase } from "@/integrations/supabase/client";

export async function isUserAdmin(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log("No active session found in isUserAdmin");
      return false;
    }

    console.log("Checking admin status for user:", session.user.id);
    
    // First try to use the RPC function which bypasses RLS
    try {
      const { data, error } = await supabase.rpc('is_admin', {
        user_id: session.user.id
      });
      
      if (!error) {
        console.log("Admin check result using RPC in isUserAdmin:", data);
        return !!data;
      }
    } catch (rpcError) {
      console.error("Error using is_admin RPC:", rpcError);
      // Fall back to direct query if RPC fails
    }
    
    // Fallback to direct query
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Error checking admin status:", error);
      return false;
    }

    const isAdmin = data?.role === 'admin';
    console.log("Admin check result in isUserAdmin:", isAdmin);
    return isAdmin;
  } catch (error) {
    console.error("Error in isUserAdmin function:", error);
    return false;
  }
}

export async function getUserRole() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log("No active session found in getUserRole");
      return null;
    }

    // First try to get role using RPC
    try {
      const { data: isAdmin, error: rpcError } = await supabase.rpc('is_admin', {
        user_id: session.user.id
      });
      
      if (!rpcError && isAdmin) {
        console.log("User role determined via RPC: admin");
        return 'admin';
      }
    } catch (rpcError) {
      console.error("Error using is_admin RPC in getUserRole:", rpcError);
      // Fall back to direct query if RPC fails
    }
    
    // Fallback to direct query
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching user role:", error);
      return null;
    }

    console.log("User role result:", data?.role);
    return data?.role;
  } catch (error) {
    console.error("Error in getUserRole function:", error);
    return null;
  }
}
