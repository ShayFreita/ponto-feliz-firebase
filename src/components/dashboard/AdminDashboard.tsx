import { Users, Clock, TrendingUp, FileText, AlertTriangle, CheckCircle, Calendar, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AttendanceChart from '../charts/AttendanceChart';
import OvertimeChart from '../charts/OvertimeChart';

const AdminDashboard = () => {
  const currentTime = new Date().toLocaleTimeString('pt-BR');
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Mock data para gráficos
  const attendanceData = [
    { date: '19/09', presente: 22, ausente: 2, atrasado: 3 },
    { date: '20/09', presente: 24, ausente: 0, atrasado: 1 },
    { date: '21/09', presente: 23, ausente: 1, atrasado: 2 },
    { date: '22/09', presente: 24, ausente: 0, atrasado: 0 },
    { date: '23/09', presente: 21, ausente: 3, atrasado: 4 },
  ];

  const overtimeData = [
    { funcionario: 'João', horasExtras: 12, bancoHoras: 8 },
    { funcionario: 'Maria', horasExtras: 8, bancoHoras: 15 },
    { funcionario: 'Pedro', horasExtras: 15, bancoHoras: 5 },
    { funcionario: 'Ana', horasExtras: 6, bancoHoras: 12 },
    { funcionario: 'Carlos', horasExtras: 10, bancoHoras: 7 },
  ];

  const adminStats = [
    { 
      label: 'Funcionários Ativos', 
      value: '24', 
      icon: Users, 
      color: 'text-primary', 
      bgColor: 'bg-primary/10',
      change: '+2 este mês'
    },
    { 
      label: 'Pontos Registrados Hoje', 
      value: '86', 
      icon: Clock, 
      color: 'text-success', 
      bgColor: 'bg-success/10',
      change: '96% de presença'
    },
    { 
      label: 'Horas Extras (Mês)', 
      value: '127h', 
      icon: TrendingUp, 
      color: 'text-warning', 
      bgColor: 'bg-warning/10',
      change: '-8% vs mês anterior'
    },
    { 
      label: 'Relatórios Pendentes', 
      value: '3', 
      icon: FileText, 
      color: 'text-destructive', 
      bgColor: 'bg-destructive/10',
      change: 'Vencimento em 2 dias'
    },
  ];

  const reportStatus = [
    { funcionario: 'João Silva', status: 'enviado', data: '20/09', email: 'joao@empresa.com' },
    { funcionario: 'Maria Santos', status: 'pendente', data: '19/09', email: 'maria@empresa.com' },
    { funcionario: 'Pedro Costa', status: 'enviado', data: '20/09', email: 'pedro@empresa.com' },
    { funcionario: 'Ana Lima', status: 'erro', data: '18/09', email: 'ana@empresa.com' },
  ];

  const recentAlerts = [
    { 
      message: 'João Silva - Banco de horas próximo ao limite (58h)', 
      type: 'warning', 
      time: '10:30',
      action: 'Revisar banco de horas'
    },
    { 
      message: 'Maria Santos - 3 dias consecutivos de atraso', 
      type: 'error', 
      time: '09:15',
      action: 'Conversar com funcionário'
    },
    { 
      message: 'Relatório mensal gerado com sucesso', 
      type: 'success', 
      time: '08:45',
      action: 'Ver relatório'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <p className="capitalize">{currentDate}</p>
          <span>•</span>
          <p className="font-medium">{currentTime}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => {
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
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart 
          data={attendanceData}
          title="Frequência Semanal"
          description="Controle de presença, ausências e atrasos"
        />
        
        <OvertimeChart 
          data={overtimeData}
          title="Horas Extras & Banco de Horas"
          description="Distribuição por funcionário este mês"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alertas e Notificações */}
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Alertas Recentes
            </CardTitle>
            <CardDescription>Notificações que requerem atenção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'success' ? 'bg-success' : 
                  alert.type === 'warning' ? 'bg-warning' : 'bg-destructive'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground leading-tight">
                    {alert.message}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                    <button className="text-xs text-primary hover:underline">
                      {alert.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Status dos Relatórios */}
        <Card className="lg:col-span-2 gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Status dos Relatórios Mensais
            </CardTitle>
            <CardDescription>Controle de envio automático dos espelhos de ponto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportStatus.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {report.status === 'enviado' ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : report.status === 'pendente' ? (
                        <Clock className="w-4 h-4 text-warning" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                      )}
                      <span className="font-medium text-card-foreground">{report.funcionario}</span>
                    </div>
                    <Badge 
                      variant={
                        report.status === 'enviado' ? 'secondary' : 
                        report.status === 'pendente' ? 'outline' : 'destructive'
                      }
                    >
                      {report.status === 'enviado' ? 'Enviado' : 
                       report.status === 'pendente' ? 'Pendente' : 'Erro'}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-card-foreground">{report.data}</p>
                    <p className="text-xs text-muted-foreground">{report.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;