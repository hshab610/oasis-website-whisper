
import { Navigate } from 'react-router-dom';
import { useAuthState } from '@/hooks/use-auth-state';
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  const { session, loading, setLoading } = useAuthState();

  if (session) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <AuthForm loading={loading} setLoading={setLoading} />
    </div>
  );
};

export default Auth;
