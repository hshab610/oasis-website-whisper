
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lead } from '@/components/ui/typography';
import AuthFormField from './AuthFormField';
import AuthFormButtons from './AuthFormButtons';
import { isUserAdmin } from '@/utils/auth';

interface AuthFormValues {
  email: string;
  password: string;
}

interface AuthFormProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AuthForm = ({ loading, setLoading }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    getValues
  } = useForm<AuthFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onLogin = async (data: AuthFormValues) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      // Check if the user is an admin after successful login
      const isAdmin = await isUserAdmin();
      if (!isAdmin) {
        await supabase.auth.signOut();
        throw new Error("Access denied. Admin privileges required.");
      }

      toast({
        title: "Success",
        description: "Successfully logged in",
      });
    } catch (error: any) {
      let errorMessage = "Failed to login. Please try again.";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password";
      } else if (error.message.includes("rate limit")) {
        errorMessage = "Too many login attempts. Please try again later.";
      } else if (error.message.includes("Access denied")) {
        errorMessage = "You do not have admin access";
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

  const onSignup = async () => {
    setLoading(true);
    
    try {
      const values = getValues();
      
      // First create the user with email verification disabled
      const { data: authData, error: signupError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: window.location.origin + '/auth',
          // Skip email verification
          data: {
            email_confirmed: true
          }
        }
      });

      if (signupError) throw signupError;
      
      if (authData.user) {
        // Then log in the user to create a session
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (loginError) throw loginError;

        // With an active session, add the admin role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ 
            user_id: authData.user.id, 
            role: 'admin' 
          }]);

        if (roleError) {
          console.error("Failed to assign admin role:", roleError);
          throw new Error("Failed to create admin account. Please contact support.");
        }

        toast({
          title: "Success",
          description: "Admin account created. You are now logged in.",
        });
      }
    } catch (error: any) {
      let errorMessage = "Failed to create account. Please try again.";
      
      if (error.message.includes("already exists")) {
        errorMessage = "This email is already taken";
      } else if (error.message.includes("Failed to create admin account")) {
        errorMessage = error.message;
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

  return (
    <Card className="w-full max-w-md animate-fadeIn">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl md:text-3xl text-center font-bold">
          Admin Login
        </CardTitle>
        <Lead className="text-center text-muted-foreground text-sm md:text-base">
          Sign in to access the admin dashboard
        </Lead>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
          <AuthFormField
            id="email"
            label="Email"
            type="text"
            error={errors.email?.message}
            loading={loading}
            register={register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          
          <AuthFormField
            id="password"
            label="Password"
            type="password"
            error={errors.password?.message}
            loading={loading}
            register={register("password", { 
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <AuthFormButtons loading={loading} onSignup={onSignup} />
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
