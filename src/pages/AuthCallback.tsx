import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Processa o callback do OAuth
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro ao processar callback OAuth:', error);
          navigate('/login?error=oauth_error');
          return;
        }

        if (data.session) {
          // O onAuthStateChange no AuthContext irá processar a sessão
          // e redirecionar o usuário baseado no role
          console.log('Callback OAuth processado com sucesso');
          // Aguarda um momento para o AuthContext processar
          setTimeout(() => {
            // Se ainda estiver na página de callback após 2 segundos, redireciona
            if (window.location.pathname === '/auth/callback') {
              navigate('/');
            }
          }, 2000);
        } else {
          // Sem sessão, redireciona para login
          navigate('/login?error=no_session');
        }
      } catch (error) {
        console.error('Erro inesperado no callback OAuth:', error);
        navigate('/login?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        <h2 className="text-xl font-semibold">Processando autenticação...</h2>
        <p className="text-muted-foreground">Aguarde enquanto finalizamos seu login.</p>
      </div>
    </div>
  );
}

