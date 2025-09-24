import { useState } from 'react';
import { Clock, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import arvooLogo from '@/assets/arvoo-logo.png';

interface LoginFormProps {
  onLogin: (role: 'admin' | 'employee') => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        // Demo: admin@arvoo.com = admin, others = employee
        const role = email === 'admin@arvoo.com' ? 'admin' : 'employee';
        onLogin(role);
        
        toast({
          title: 'Login realizado com sucesso!',
          description: `Bem-vindo ao Arvoo Ponto`,
        });
      } else {
        toast({
          title: 'Erro no login',
          description: 'Por favor, preencha todos os campos.',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-primary">
            <img src={arvooLogo} alt="Arvoo Ponto" className="w-16 h-16 rounded-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Arvoo Ponto</h1>
          <p className="text-muted-foreground">Sistema de Gestão de Ponto Inteligente</p>
        </div>

        {/* Login Form */}
        <div className="time-card space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-card-foreground">Entrar na sua conta</h2>
            <p className="text-muted-foreground">Digite suas credenciais para acessar o sistema</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full punch-button-primary h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium text-muted-foreground mb-2">Credenciais de demonstração:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><strong>Admin:</strong> admin@arvoo.com | senha123</p>
              <p><strong>Funcionário:</strong> funcionario@arvoo.com | senha123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          © 2024 Arvoo Ponto. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;