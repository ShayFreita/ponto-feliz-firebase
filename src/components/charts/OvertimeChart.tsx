import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface OvertimeChartProps {
  data: Array<{
    funcionario: string;
    horasExtras: number;
    bancoHoras: number;
  }>;
  title: string;
  description: string;
}

const OvertimeChart = ({ data, title, description }: OvertimeChartProps) => {
  return (
    <Card className="gradient-card border-card-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="funcionario" 
              className="text-xs fill-muted-foreground"
              angle={-45}
              textAnchor="end"
              height={60}
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
                name === 'horasExtras' ? 'Horas Extras' : 'Banco de Horas'
              ]}
            />
            <Bar 
              dataKey="horasExtras" 
              fill="hsl(var(--warning))" 
              name="Horas Extras"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="bancoHoras" 
              fill="hsl(var(--primary))" 
              name="Banco de Horas"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OvertimeChart;