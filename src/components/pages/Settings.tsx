import { Settings as SettingsIcon, Building, Clock, Users, Mail, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();

  const handleSaveCompany = () => {
    toast({
      title: 'Configurações da empresa salvas',
      description: 'As informações da empresa foram atualizadas com sucesso.',
    });
  };

  const handleSaveHours = () => {
    toast({
      title: 'Horários salvos',
      description: 'Configurações de horário de trabalho foram atualizadas.',
    });
  };

  const handleTestEmail = () => {
    toast({
      title: 'Testando configurações de email...',
      description: 'Um email de teste será enviado em breve.',
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: 'Configurações salvas',
      description: 'Todas as configurações foram atualizadas com sucesso.',
    });
  };

  const handleExportSettings = () => {
    toast({
      title: 'Exportando configurações',
      description: 'O arquivo de configurações será baixado em breve.',
    });
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações da empresa e do sistema
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Company Settings */}
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              Configurações da Empresa
            </CardTitle>
            <CardDescription>
              Informações básicas da empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input id="company-name" placeholder="Arvoo Tecnologia" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company-cnpj">CNPJ</Label>
              <Input id="company-cnpj" placeholder="00.000.000/0001-00" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company-address">Endereço</Label>
              <Input id="company-address" placeholder="Rua Exemplo, 123" />
            </div>
            
            <Button className="w-full punch-button-primary" onClick={handleSaveCompany}>
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        {/* Work Hours Settings */}
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Configurações de Horário
            </CardTitle>
            <CardDescription>
              Defina os horários padrão de trabalho
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Entrada Padrão</Label>
                <Input id="start-time" type="time" defaultValue="08:00" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-time">Saída Padrão</Label>
                <Input id="end-time" type="time" defaultValue="17:00" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lunch-duration">Duração Almoço</Label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="90">1 hora 30 min</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tolerance">Tolerância</Label>
                <Select defaultValue="15">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutos</SelectItem>
                    <SelectItem value="10">10 minutos</SelectItem>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="w-full punch-button-primary" onClick={handleSaveHours}>
              Salvar Horários
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-primary" />
              Configurações do Sistema
            </CardTitle>
            <CardDescription>
              Configurações gerais do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Banco de Horas</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir acúmulo de banco de horas
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reconhecimento Facial</Label>
                <p className="text-sm text-muted-foreground">
                  Ativar reconhecimento facial
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações Push</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar notificações aos usuários
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Realizar backup diário dos dados
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Configurações de Email
            </CardTitle>
            <CardDescription>
              Configure o envio automático de relatórios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-server">Servidor SMTP</Label>
              <Input id="smtp-server" placeholder="smtp.gmail.com" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Porta</Label>
                <Input id="smtp-port" placeholder="587" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtp-security">Segurança</Label>
                <Select defaultValue="tls">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhuma</SelectItem>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtp-user">Usuário</Label>
              <Input id="smtp-user" placeholder="seu@email.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtp-password">Senha</Label>
              <Input id="smtp-password" type="password" placeholder="********" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Envio Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar relatórios automaticamente
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Button className="w-full punch-button-primary" onClick={handleTestEmail}>
              Testar e Salvar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card className="gradient-card border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Configurações de Segurança
          </CardTitle>
          <CardDescription>
            Defina políticas de segurança e conformidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-card-foreground">Políticas de Senha</h4>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Exigir Senha Forte</Label>
                  <p className="text-sm text-muted-foreground">
                    Mínimo 8 caracteres com símbolos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-expiry">Expiração da Senha</Label>
                <Select defaultValue="90">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                    <SelectItem value="never">Nunca</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-card-foreground">Conformidade LGPD</h4>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Consentimento de Dados</Label>
                  <p className="text-sm text-muted-foreground">
                    Solicitar consentimento LGPD
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data-retention">Retenção de Dados</Label>
                <Select defaultValue="5years">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 ano</SelectItem>
                    <SelectItem value="2years">2 anos</SelectItem>
                    <SelectItem value="5years">5 anos</SelectItem>
                    <SelectItem value="10years">10 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <Button className="punch-button-primary mr-4" onClick={handleSaveSettings}>
              Salvar Configurações
            </Button>
            <Button variant="outline" onClick={handleExportSettings}>
              Exportar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;