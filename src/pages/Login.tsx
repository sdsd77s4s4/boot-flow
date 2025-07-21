import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard/client');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-purple-900/60 to-purple-800/30 border border-purple-700/40 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Entrar na Plataforma</CardTitle>
          <p className="text-gray-400 mt-2">Acesse sua conta para continuar</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10 bg-[#181825] border border-gray-700 text-white"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Sua senha"
                  className="pl-10 bg-[#181825] border border-gray-700 text-white"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#7e22ce] hover:bg-[#6d1bb7] text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
              disabled={loading}
            >
              <LogIn className="w-5 h-5 mr-1" />
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            <div className="text-right">
              <a href="#" className="text-xs text-purple-400 hover:underline">Esqueceu a senha?</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 