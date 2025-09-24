import { Clock, Users, TrendingUp, Calendar, Timer, Coffee } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {
  userRole: 'admin' | 'employee';
}

const Dashboard = ({ userRole }: DashboardProps) => {
  const currentTime = new Date().toLocaleTimeString('pt-BR');
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const employeeStats = [
    { label: 'Horas Hoje', value: '7h 45m', icon: Clock, color: 'text-primary', bgColor: 'bg-primary/10' },
    { label: 'Entrada', value: '08:15', icon: Timer, color: 'text-success', bgColor: 'bg-success/10' },
    { label: 'Almoço', value: '12:30', icon: Coffee, color: 'text-warning', bgColor: 'bg-warning/10' },
    { label: 'Meta Mensal', value: '87%', icon: TrendingUp, color: 'text-primary', bgColor: 'bg-primary/10' },
  ];

  const adminStats = [
    { label: 'Funcionários Ativos', value: '24', icon: Users, color: 'text-primary', bgColor: 'bg-primary/10' },
    { label: 'Pontos Hoje', value: '18', icon: Clock, color: 'text-success', bgColor: 'bg-success/10' },
    { label: 'Horas Extras', value: '12h', icon: TrendingUp, color: 'text-warning', bgColor: 'bg-warning/10' },
    { label: 'Relatórios', value: '8', icon: Calendar, color: 'text-primary', bgColor: 'bg-primary/10' },
  ];

  const stats = userRole === 'admin' ? adminStats : employeeStats;

  const recentActivity = [
    { time: '08:15', action: 'Entrada registrada', type: 'success' },
    { time: '12:30', action: 'Saída para almoço', type: 'warning' },
    { time: '13:30', action: 'Volta do almoço', type: 'success' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {userRole === 'admin' ? 'Painel Administrativo' : 'Meu Dashboard'}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <p className="capitalize">{currentDate}</p>
          <span>•</span>
          <p className="font-medium">{currentTime}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="gradient-card border-card-border hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-card-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {userRole === 'admin' ? 'Atividade Recente da Equipe' : 'Minha Atividade Hoje'}
            </CardTitle>
            <CardDescription>
              {userRole === 'admin' 
                ? 'Últimos registros de ponto da equipe'
                : 'Seus registros de ponto de hoje'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-success' : 'bg-warning'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full punch-button-primary">
              <Clock className="w-4 h-4 mr-2" />
              Registrar Ponto
            </button>
            <button className="w-full punch-button hover:bg-secondary text-secondary-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              Ver Registros
            </button>
            {userRole === 'admin' && (
              <button className="w-full punch-button hover:bg-secondary text-secondary-foreground">
                <Users className="w-4 h-4 mr-2" />
                Gerenciar Equipe
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;