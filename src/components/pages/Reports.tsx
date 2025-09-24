import { FileText, Download, Eye, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ReportsProps {
  userRole: 'admin' | 'employee';
}

const Reports = ({ userRole }: ReportsProps) => {
  const employeeReports = [
    {
      month: 'Janeiro 2024',
      status: 'Disponível',
      generated: '01/02/2024',
      type: 'PDF',
      size: '245 KB'
    },
    {
      month: 'Dezembro 2023',
      status: 'Disponível',
      generated: '01/01/2024',
      type: 'PDF',
      size: '238 KB'
    },
    {
      month: 'Novembro 2023',
      status: 'Disponível',
      generated: '01/12/2023',
      type: 'PDF',
      size: '251 KB'
    }
  ];

  const adminReports = [
    {
      title: 'Relatório Consolidado - Janeiro 2024',
      employees: 24,
      status: 'Disponível',
      generated: '01/02/2024',
      type: 'PDF',
      size: '1.2 MB'
    },
    {
      title: 'Relatório Individual - João Silva',
      employees: 1,
      status: 'Disponível',
      generated: '01/02/2024',
      type: 'PDF',
      size: '245 KB'
    },
    {
      title: 'Relatório de Horas Extras - Janeiro',
      employees: 8,
      status: 'Disponível',
      generated: '01/02/2024',
      type: 'XLSX',
      size: '124 KB'
    }
  ];

  const reports = userRole === 'admin' ? adminReports : employeeReports;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {userRole === 'admin' ? 'Relatórios Administrativos' : 'Meus Relatórios'}
        </h1>
        <p className="text-muted-foreground">
          {userRole === 'admin' 
            ? 'Gerencie e visualize relatórios da equipe'
            : 'Acesse seus relatórios mensais de ponto'
          }
        </p>
      </div>

      {userRole === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="gradient-card border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Relatórios Gerados</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">156</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Emails Enviados</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">142</p>
                </div>
                <Mail className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-card-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Funcionários Ativos</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">24</p>
                </div>
                <FileText className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Generate New Report */}
      {userRole === 'admin' && (
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle>Gerar Novo Relatório</CardTitle>
            <CardDescription>
              Criar relatórios personalizados para funcionários específicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="punch-button-primary">
                <FileText className="w-4 h-4 mr-2" />
                Relatório Individual
              </Button>
              <Button className="punch-button-success">
                <FileText className="w-4 h-4 mr-2" />
                Relatório Consolidado
              </Button>
              <Button className="punch-button hover:bg-secondary text-secondary-foreground">
                <Mail className="w-4 h-4 mr-2" />
                Envio Automático
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reports List */}
      <Card className="gradient-card border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {userRole === 'admin' ? 'Relatórios Recentes' : 'Histórico de Relatórios'}
          </CardTitle>
          <CardDescription>
            {userRole === 'admin' 
              ? 'Últimos relatórios gerados para a equipe'
              : 'Seus relatórios mensais de ponto'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-card-border hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground">
                    {userRole === 'admin' ? report.title : `Relatório - ${report.month}`}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>Gerado em {report.generated}</span>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                    {userRole === 'admin' && 'employees' in report && (
                      <>
                        <span>•</span>
                        <span>{report.employees} funcionário(s)</span>
                      </>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      {report.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  {userRole === 'admin' && (
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-1" />
                      Reenviar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {reports.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Nenhum relatório disponível</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Templates (Admin Only) */}
      {userRole === 'admin' && (
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle>Templates de Relatório</CardTitle>
            <CardDescription>
              Gerencie templates personalizados para diferentes tipos de relatório
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-card-border rounded-lg">
                <h4 className="font-semibold text-card-foreground mb-2">Template Padrão</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Template básico com informações essenciais de ponto
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Editar Template
                </Button>
              </div>
              
              <div className="p-4 border border-card-border rounded-lg">
                <h4 className="font-semibold text-card-foreground mb-2">Template Detalhado</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Inclui gráficos e análises detalhadas
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Editar Template
                </Button>
              </div>
              
              <div className="p-4 border border-card-border rounded-lg">
                <h4 className="font-semibold text-card-foreground mb-2">Template Gerencial</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Focado em métricas e indicadores de RH
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Editar Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;