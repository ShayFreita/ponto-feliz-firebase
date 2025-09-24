import { useState } from 'react';
import { Calendar, Clock, Download, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Records = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [searchTerm, setSearchTerm] = useState('');

  const mockRecords = [
    {
      date: '2024-01-15',
      entry: '08:15',
      lunchOut: '12:30',
      lunchIn: '13:30',
      exit: '17:45',
      totalHours: '8h 30m',
      overtime: '0h 30m',
      status: 'complete'
    },
    {
      date: '2024-01-14',
      entry: '08:10',
      lunchOut: '12:25',
      lunchIn: '13:35',
      exit: '17:40',
      totalHours: '8h 20m',
      overtime: '0h 20m',
      status: 'complete'
    },
    {
      date: '2024-01-13',
      entry: '08:20',
      lunchOut: '12:30',
      lunchIn: '13:30',
      exit: '17:30',
      totalHours: '8h 00m',
      overtime: '0h 00m',
      status: 'complete'
    },
    {
      date: '2024-01-12',
      entry: '08:15',
      lunchOut: '12:30',
      lunchIn: '--',
      exit: '--',
      totalHours: '4h 15m',
      overtime: '0h 00m',
      status: 'incomplete'
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'complete' ? 'text-success' : 'text-warning';
  };

  const monthlyStats = {
    totalHours: '172h 45m',
    workingDays: 22,
    completeDays: 21,
    averageHours: '7h 52m',
    totalOvertime: '8h 20m'
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Meus Registros</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie seus registros de ponto
        </p>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="gradient-card border-card-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{monthlyStats.totalHours}</p>
            <p className="text-sm text-muted-foreground">Horas Totais</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-card-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-card-foreground">{monthlyStats.workingDays}</p>
            <p className="text-sm text-muted-foreground">Dias Úteis</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-card-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{monthlyStats.completeDays}</p>
            <p className="text-sm text-muted-foreground">Dias Completos</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-card-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-card-foreground">{monthlyStats.averageHours}</p>
            <p className="text-sm text-muted-foreground">Média Diária</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-card-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{monthlyStats.totalOvertime}</p>
            <p className="text-sm text-muted-foreground">Horas Extras</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="gradient-card border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filtros e Ações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-01">Janeiro 2024</SelectItem>
                <SelectItem value="2023-12">Dezembro 2023</SelectItem>
                <SelectItem value="2023-11">Novembro 2023</SelectItem>
              </SelectContent>
            </Select>

            <Button className="punch-button-primary">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card className="gradient-card border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Registros Detalhados
          </CardTitle>
          <CardDescription>
            Registros de ponto do mês selecionado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Data</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Entrada</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Saída Almoço</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Volta Almoço</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Saída</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Total</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Extras</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRecords.map((record, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-card-foreground">{formatDate(record.date)}</p>
                        <p className="text-xs text-muted-foreground">{record.date}</p>
                      </div>
                    </td>
                    <td className="p-3 text-card-foreground">{record.entry}</td>
                    <td className="p-3 text-card-foreground">{record.lunchOut}</td>
                    <td className="p-3 text-card-foreground">{record.lunchIn}</td>
                    <td className="p-3 text-card-foreground">{record.exit}</td>
                    <td className="p-3 font-medium text-card-foreground">{record.totalHours}</td>
                    <td className="p-3 text-warning font-medium">{record.overtime}</td>
                    <td className="p-3">
                      <span className={`text-sm font-medium ${getStatusColor(record.status)}`}>
                        {record.status === 'complete' ? 'Completo' : 'Incompleto'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {mockRecords.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Nenhum registro encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Records;