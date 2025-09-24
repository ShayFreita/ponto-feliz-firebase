import { useState } from 'react';
import { Clock, Camera, Hash, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type PunchType = 'entry' | 'lunch_out' | 'lunch_in' | 'exit';

interface PunchOption {
  id: PunchType;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

const PunchSystem = () => {
  const [selectedPunch, setSelectedPunch] = useState<PunchType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [usePin, setUsePin] = useState(false);
  const [pin, setPin] = useState('');
  const { toast } = useToast();

  const currentTime = new Date().toLocaleTimeString('pt-BR');
  const currentDate = new Date().toLocaleDateString('pt-BR');

  const punchOptions: PunchOption[] = [
    {
      id: 'entry',
      label: 'Entrada',
      description: 'Iniciar expediente',
      color: 'text-success',
      bgColor: 'bg-success/10 hover:bg-success/20',
    },
    {
      id: 'lunch_out',
      label: 'Saída Almoço',
      description: 'Pausar para almoço',
      color: 'text-warning',
      bgColor: 'bg-warning/10 hover:bg-warning/20',
    },
    {
      id: 'lunch_in',
      label: 'Volta Almoço',
      description: 'Retornar do almoço',
      color: 'text-primary',
      bgColor: 'bg-primary/10 hover:bg-primary/20',
    },
    {
      id: 'exit',
      label: 'Saída',
      description: 'Finalizar expediente',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10 hover:bg-destructive/20',
    },
  ];

  const handlePunchSubmit = async () => {
    if (!selectedPunch) return;

    setIsProcessing(true);

    // Simulate face recognition or PIN validation
    setTimeout(() => {
      const option = punchOptions.find(opt => opt.id === selectedPunch);
      
      toast({
        title: 'Ponto registrado com sucesso!',
        description: `${option?.label} registrada às ${currentTime}`,
      });

      // Reset form
      setSelectedPunch(null);
      setUsePin(false);
      setPin('');
      setIsProcessing(false);
    }, 2000);
  };

  const todayRecords = [
    { time: '08:15', type: 'Entrada', status: 'confirmed' },
    { time: '12:30', type: 'Saída Almoço', status: 'confirmed' },
    { time: '13:30', type: 'Volta Almoço', status: 'confirmed' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Sistema de Ponto</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <p>{currentDate}</p>
          <span>•</span>
          <p className="font-medium text-primary">{currentTime}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Punch System */}
        <div className="xl:col-span-2 space-y-6">
          {/* Punch Type Selection */}
          <Card className="gradient-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Selecionar Tipo de Registro
              </CardTitle>
              <CardDescription>
                Escolha o tipo de registro que deseja realizar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {punchOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedPunch(option.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedPunch === option.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    } ${option.bgColor}`}
                  >
                    <h3 className={`font-semibold ${option.color} mb-1`}>
                      {option.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Face Recognition / PIN */}
          {selectedPunch && (
            <Card className="gradient-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {usePin ? <Hash className="w-5 h-5 text-primary" /> : <Camera className="w-5 h-5 text-primary" />}
                  {usePin ? 'Autenticação por PIN' : 'Reconhecimento Facial'}
                </CardTitle>
                <CardDescription>
                  {usePin 
                    ? 'Digite seu PIN para confirmar o registro'
                    : 'Posicione seu rosto na câmera para autenticação'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!usePin ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Câmera será ativada aqui</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          (Reconhecimento facial com TensorFlow.js)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => setUsePin(true)}
                        className="text-sm text-primary hover:underline"
                      >
                        Usar PIN como alternativa
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex gap-2 justify-center">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-12 h-12 border-2 border-border rounded-lg flex items-center justify-center text-lg font-bold"
                        >
                          {pin[i - 1] ? '•' : ''}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''].map((num, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (num !== '' && pin.length < 4) {
                              setPin(pin + num.toString());
                            }
                          }}
                          className="h-12 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold disabled:opacity-50"
                          disabled={num === ''}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {setUsePin(false); setPin('');}}
                        className="text-sm text-primary hover:underline"
                      >
                        Usar reconhecimento facial
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handlePunchSubmit}
                    disabled={isProcessing || (usePin && pin.length !== 4)}
                    className="flex-1 punch-button-primary h-12"
                  >
                    {isProcessing ? 'Processando...' : 'Confirmar Registro'}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedPunch(null);
                      setUsePin(false);
                      setPin('');
                    }}
                    variant="outline"
                    className="px-8"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Today's Records */}
        <Card className="gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Registros de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayRecords.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-card-foreground">{record.type}</p>
                    <p className="text-sm text-muted-foreground">{record.time}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
              ))}
              
              {todayRecords.length === 0 && (
                <div className="text-center py-8">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Nenhum registro hoje</p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Horas trabalhadas:</span>
                  <span className="font-medium">4h 15m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-success">Em expediente</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PunchSystem;