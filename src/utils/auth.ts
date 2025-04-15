
import { supabase } from "@/integrations/supabase/client";

export async function isUserAdmin(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) return false;

  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .single();

  if (error) return false;

  return data?.role === 'admin';
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
