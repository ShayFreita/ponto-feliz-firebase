import { Clock, Calendar, TrendingUp, FileText, Timer, Coffee, Target, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import HoursChart from '../charts/HoursChart';

const EmployeeDashboard = () => {
  const currentTime = new Date().toLocaleTimeString('pt-BR');
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Mock data para gráficos do funcionário
  const hoursData = [
    { dia: 'Seg', horasTrabalhadas: 8.5, horasEsperadas: 8 },
    { dia: 'Ter', horasTrabalhadas: 8.2, horasEsperadas: 8 },
    { dia: 'Qua', horasTrabalhadas: 7.8, horasEsperadas: 8 },
    { dia: 'Qui', horasTrabalhadas: 8.7, horasEsperadas: 8 },
    { dia: 'Sex', horasTrabalhadas: 8.1, horasEsperadas: 8 },
  ];

  const employeeStats = [
    { 
      label: 'Horas Hoje', 
      value: '7h 45m', 
      icon: Clock, 
      color: 'text-primary', 
      bgColor: 'bg-primary/10',
      detail: 'Restam 15min'
    },
    { 
      label: 'Banco de Horas', 
      value: '+12h 30m', 
      icon: Timer, 
      color: 'text-success', 
      bgColor: 'bg-success/10',
      detail: 'Saldo positivo'
    },
    { 
      label: 'Frequência Mensal', 
      value: '97%', 
      icon: Target, 
      color: 'text-primary', 
      bgColor: 'bg-primary/10',
      detail: '22 de 23 dias'
    },
    { 
      label: 'Pontuação', 
      value: '4.8/5', 
      icon: Award, 
      color: 'text-success', 
      bgColor: 'bg-success/10',
      detail: 'Excelente!'
    },
  ];

  const todaySchedule = [
    { time: '08:00', event: 'Entrada', status: 'completed', actual: '08:15', late: true },
    { time: '12:00', event: 'Saída Almoço', status: 'completed', actual: '12:30', late: true },
    { time: '13:00', event: 'Volta Almoço', status: 'completed', actual: '13:30', late: true },
    { time: '17:00', event: 'Saída', status: 'pending', actual: null, late: false },
  ];

  const monthlyGoals = [
    { 
      goal: 'Frequência', 
      current: 97, 
      target: 98, 
      unit: '%',
      color: 'text-success'
    },
    { 
      goal: 'Pontualidade', 
      current: 87, 
      target: 95, 
      unit: '%',
      color: 'text-warning'
    },
    { 
      goal: 'Horas Cumpridas', 
      current: 172, 
      target: 168, 
      unit: 'h',
      color: 'text-primary'
    },
  ];

  const upcomingReports = [
    {
      type: 'Espelho de Ponto',
      period: 'Setembro 2024',
      date: '01/10/2024',
      status: 'scheduled'
    },
    {
      type: 'Extrato Banco de Horas',
      period: 'Trimestre 3',
      date: '05/10/2024', 
      status: 'scheduled'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Meu Dashboard</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <p className="capitalize">{currentDate}</p>
          <span>•</span>
          <p className="font-medium">{currentTime}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employeeStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="gradient-card border-card-border hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{stat.detail}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hours Chart */}
        <div className="lg:col-span-2">
          <HoursChart 
            data={hoursData}
            title="Minhas Horas Esta Semana"
            description="Comparativo entre horas trabalhadas e esperadas"
          />
        </div>

        {/* Today's Schedule */}
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Cronograma de Hoje
            </CardTitle>
            <CardDescription>Seus registros de ponto planejados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="text-center min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{item.time}</p>
                  {item.actual && (
                    <p className={`text-xs ${item.late ? 'text-warning' : 'text-success'}`}>
                      {item.actual}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{item.event}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'completed' ? 'bg-success' : 'bg-muted-foreground'
                    }`} />
                    <span className="text-xs text-muted-foreground capitalize">
                      {item.status === 'completed' ? 'Registrado' : 'Pendente'}
                    </span>
                    {item.late && (
                      <Badge variant="outline" className="text-xs py-0">
                        Atrasado
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Goals */}
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Metas do Mês
            </CardTitle>
            <CardDescription>Acompanhe seu desempenho mensal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {monthlyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-card-foreground">{goal.goal}</span>
                  <span className={`text-sm font-bold ${goal.color}`}>
                    {goal.current}{goal.unit} / {goal.target}{goal.unit}
                  </span>
                </div>
                <Progress 
                  value={(goal.current / goal.target) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Reports */}
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Próximos Relatórios
            </CardTitle>
            <CardDescription>Relatórios que você receberá automaticamente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-card-foreground">{report.type}</p>
                  <p className="text-sm text-muted-foreground">{report.period}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">{report.date}</p>
                  <Badge variant="outline" className="text-xs">
                    Agendado
                  </Badge>
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary">
                    Relatórios Automáticos Ativados
                  </p>
                  <p className="text-xs text-primary/80">
                    Você receberá seus espelhos de ponto automaticamente por email
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;