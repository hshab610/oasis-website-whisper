
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Lead } from '@/components/ui/typography';
import { cn } from "@/lib/utils";

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
      const email = `${data.username.toLowerCase()}@oasismovingco.com`;
      
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
      const email = `${values.username.toLowerCase()}@oasismovingco.com`;
      
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              {...register("username", { 
                required: "Username is required",
                minLength: { value: 3, message: "Username must be at least 3 characters" }
              })}
              type="text"
              placeholder="Enter your username"
              disabled={loading}
              className={cn(
                "w-full",
                errors.username ? "border-destructive focus-visible:ring-destructive" : ""
              )}
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-sm text-destructive">{errors.username.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                disabled={loading}
                className={cn(
                  "w-full pr-10",
                  errors.password ? "border-destructive focus-visible:ring-destructive" : ""
                )}
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onSignup}
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
