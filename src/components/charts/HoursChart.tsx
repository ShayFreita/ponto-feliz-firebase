import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer } from 'lucide-react';

interface HoursChartProps {
  data: Array<{
    dia: string;
    horasTrabalhadas: number;
    horasEsperadas: number;
  }>;
  title: string;
  description: string;
}

const HoursChart = ({ data, title, description }: HoursChartProps) => {
  return (
    <Card className="gradient-card border-card-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorWorked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="dia" 
              className="text-xs fill-muted-foreground"
            />
            <YAxis className="text-xs fill-muted-foreground" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--card-foreground))'
              }}
              formatter={(value, name) => [
                `${value}h`,
                name === 'horasTrabalhadas' ? 'Horas Efetivamente Trabalhadas' : 'Horas Previstas para o Dia'
              ]}
              labelFormatter={(label) => `Dia: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="horasEsperadas" 
              stroke="hsl(var(--muted-foreground))" 
              fillOpacity={1} 
              fill="url(#colorExpected)"
              name="Horas Esperadas"
            />
            <Area 
              type="monotone" 
              dataKey="horasTrabalhadas" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1} 
              fill="url(#colorWorked)"
              name="Horas Trabalhadas"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HoursChart;