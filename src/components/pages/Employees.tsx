import { useState } from 'react';
import { Users, Plus, Search, Filter, MoreHorizontal, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockEmployees = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@empresa.com',
      department: 'Desenvolvimento',
      role: 'Desenvolvedor Senior',
      status: 'Ativo',
      hoursThisMonth: '172h 30m',
      lastPunch: '17:45 - Hoje',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      department: 'RH',
      role: 'Analista de RH',
      status: 'Ativo',
      hoursThisMonth: '168h 15m',
      lastPunch: '18:00 - Hoje',
      avatar: 'MS'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro.costa@empresa.com',
      department: 'Vendas',
      role: 'Gerente de Vendas',
      status: 'Ativo',
      hoursThisMonth: '180h 45m',
      lastPunch: '19:30 - Hoje',
      avatar: 'PC'
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'ana.oliveira@empresa.com',
      department: 'Marketing',
      role: 'Designer',
      status: 'Férias',
      hoursThisMonth: '120h 00m',
      lastPunch: '17:30 - 3 dias atrás',
      avatar: 'AO'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-success/10 text-success';
      case 'Férias':
        return 'bg-warning/10 text-warning';
      case 'Inativo':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const departmentStats = [
    { name: 'Desenvolvimento', count: 8, avgHours: '175h' },
    { name: 'RH', count: 3, avgHours: '168h' },
    { name: 'Vendas', count: 6, avgHours: '172h' },
    { name: 'Marketing', count: 4, avgHours: '170h' },
    { name: 'Financeiro', count: 3, avgHours: '169h' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Gerenciar Funcionários</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie informações da equipe
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Funcionários</p>
                <p className="text-2xl font-bold text-card-foreground mt-1">24</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ativos Hoje</p>
                <p className="text-2xl font-bold text-card-foreground mt-1">18</p>
              </div>
              <Clock className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Média Horas/Mês</p>
                <p className="text-2xl font-bold text-card-foreground mt-1">171h</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Departamentos</p>
                <p className="text-2xl font-bold text-card-foreground mt-1">5</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Stats */}
      <Card className="gradient-card border-card-border">
        <CardHeader>
          <CardTitle>Estatísticas por Departamento</CardTitle>
          <CardDescription>
            Visão geral dos departamentos e suas métricas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-card-foreground mb-1">{dept.name}</h4>
                <p className="text-sm text-muted-foreground">{dept.count} funcionários</p>
                <p className="text-sm font-medium text-primary mt-1">{dept.avgHours} média</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Actions */}
      <Card className="gradient-card border-card-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar funcionários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button className="punch-button-primary">
                <Plus className="w-4 h-4 mr-2" />
                Novo Funcionário
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employees List */}
      <Card className="gradient-card border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Lista de Funcionários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg border border-card-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-foreground">
                      {employee.avatar}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-semibold text-card-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.email}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">
                        {employee.department}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{employee.role}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-card-foreground">{employee.hoursThisMonth}</p>
                    <p className="text-xs text-muted-foreground">Horas este mês</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-card-foreground">{employee.lastPunch}</p>
                    <p className="text-xs text-muted-foreground">Último registro</p>
                  </div>
                  
                  <Badge className={getStatusColor(employee.status)}>
                    {employee.status}
                  </Badge>
                  
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {mockEmployees.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Nenhum funcionário encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;