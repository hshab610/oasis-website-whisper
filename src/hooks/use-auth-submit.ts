
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthValues {
  email: string;
  password: string;
}

export const useAuthSubmit = (setLoading: (loading: boolean) => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (data: AuthValues) => {
    setLoading(true);
    
    try {
      console.log("Attempting login with:", data.email);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      console.log("Login successful, checking admin status");
      toast({
        title: "Login Successful",
        description: "Verifying your access level",
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id || '')
        .maybeSingle();

      if (roleError) {
        console.error("Error checking role:", roleError);
      }

      const isAdmin = roleData?.role === 'admin';
      console.log("Is admin check result:", isAdmin);
      
      if (isAdmin) {
        toast({
          title: "Admin Access Granted",
          description: "Redirecting to admin dashboard",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back to Oasis Moving & Storage",
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Failed to login. Please try again.";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password";
      } else if (error.message?.includes("rate limit")) {
        errorMessage = "Too many login attempts. Please try again later.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (values: AuthValues) => {
    setLoading(true);
    
    try {
      console.log("Attempting signup with:", values.email);
      
      const { data: authData, error: signupError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (signupError) throw signupError;
      
      if (!authData.user) {
        throw new Error("Failed to create user account");
      }
      
      const userId = authData.user.id;
      console.log("User created with ID:", userId);
      
      const { error: functionError } = await supabase.functions.invoke('assign-admin-role', {
        body: { userId: userId }
      }).catch((err) => {
        console.error("Function invocation error:", err);
        return { error: err };
      });
      
      if (functionError) {
        console.error("Failed to assign admin role:", functionError);
        toast({
          title: "Partial Success",
          description: "Account created, but admin privileges could not be assigned.",
          variant: "destructive",
        });
      } else {
        console.log("Admin role successfully assigned");
        toast({
          title: "Success",
          description: "Admin account created. You are now logged in.",
        });
      }
      
      navigate('/admin?just_signed_up=true');
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "Failed to create account. Please try again.";
      
      if (error.message?.includes("already exists")) {
        errorMessage = "This email is already taken. Try logging in instead.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleSignup };
};
