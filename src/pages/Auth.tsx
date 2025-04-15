
import { useNavigate } from 'react-router-dom';
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
        try {
          const isAdmin = await isUserAdmin();
          console.log("Admin check result on Auth page:", isAdmin);
          if (isAdmin) {
            navigate('/admin');
          }
        } catch (error) {
          console.error("Error checking admin status on Auth page:", error);
        }
      }
    };

    checkUserAndRedirect();
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <AuthForm loading={loading} setLoading={setLoading} />
    </div>
  );
};

export default Auth;
