
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AuthFormButtonsProps {
  loading: boolean;
  onSignup: () => void;
}

const AuthFormButtons = ({ loading, onSignup }: AuthFormButtonsProps) => {
  return (
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
  );
};

export default AuthFormButtons;
