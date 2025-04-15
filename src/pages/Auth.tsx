
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from '@/hooks/use-auth-state';
import AuthForm from '@/components/auth/AuthForm';
import { useEffect } from 'react';
import { isUserAdmin } from '@/utils/auth';

const Auth = () => {
  const { session, loading, setLoading } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      if (session) {
        const isAdmin = await isUserAdmin();
        if (isAdmin) {
          navigate('/admin');
        }
      }
    };

    checkUserAndRedirect();
  }, [session, navigate]);

  // Don't automatically redirect if there's a session
  // Let the effect above handle the redirection after checking admin status

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <AuthForm loading={loading} setLoading={setLoading} />
    </div>
  );
};

export default Auth;
