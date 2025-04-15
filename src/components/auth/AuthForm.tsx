
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lead } from '@/components/ui/typography';
import AuthFormField from './AuthFormField';
import AuthFormButtons from './AuthFormButtons';
import { useAuthSubmit } from '@/hooks/use-auth-submit';

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
  const { handleLogin, handleSignup } = useAuthSubmit(setLoading);
  
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
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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

          <AuthFormButtons 
            loading={loading} 
            onSignup={() => handleSignup(getValues())} 
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
