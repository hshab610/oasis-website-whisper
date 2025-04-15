
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from "@/lib/utils";

interface AuthFormFieldProps {
  id: string;
  label: string;
  type: 'text' | 'password';
  error?: string;
  loading?: boolean;
  register: any;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const AuthFormField = ({ 
  id, 
  label, 
  type,
  error, 
  loading,
  register,
  showPassword,
  onTogglePassword
}: AuthFormFieldProps) => {
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          {...register}
          type={inputType}
          placeholder={`Enter your ${label.toLowerCase()}`}
          disabled={loading}
          className={cn(
            "w-full",
            isPassword && "pr-10",
            error ? "border-destructive focus-visible:ring-destructive" : ""
          )}
          autoComplete={id}
        />
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={onTogglePassword}
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
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default AuthFormField;
