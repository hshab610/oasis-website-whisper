import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lead } from '@/components/ui/typography';
import AuthFormField from './AuthFormField';
import AuthFormButtons from './AuthFormButtons';

interface AuthFormValues {
  username: string;
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
      username: '',
      password: ''
    }
  });

  const onLogin = async (data: AuthFormValues) => {
    setLoading(true);
    
    try {
      const email = `${data.username.toLowerCase()}@oasismovingandstorage.com`;
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Successfully logged in",
      });
    } catch (error: any) {
      let errorMessage = "Failed to login. Please try again.";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid username or password";
      } else if (error.message.includes("rate limit")) {
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

  const onSignup = async () => {
    setLoading(true);
    
    try {
      const values = getValues();
      const email = `${values.username.toLowerCase()}@oasismovingandstorage.com`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password: values.password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Account created successfully. Please wait for admin approval.",
      });
    } catch (error: any) {
      let errorMessage = "Failed to create account. Please try again.";
      
      if (error.message.includes("already exists")) {
        errorMessage = "This username is already taken";
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
            id="username"
            label="Username"
            type="text"
            error={errors.username?.message}
            loading={loading}
            register={register("username", { 
              required: "Username is required",
              minLength: { value: 3, message: "Username must be at least 3 characters" }
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
