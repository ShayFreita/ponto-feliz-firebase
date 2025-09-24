import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface AttendanceChartProps {
  data: Array<{
    date: string;
    presente: number;
    ausente: number;
    atrasado: number;
  }>;
  title: string;
  description: string;
}

const AttendanceChart = ({ data, title, description }: AttendanceChartProps) => {
  return (
    <Card className="gradient-card border-card-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
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
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="presente" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              name="Presente"
              dot={{ fill: 'hsl(var(--success))' }}
            />
            <Line 
              type="monotone" 
              dataKey="atrasado" 
              stroke="hsl(var(--warning))" 
              strokeWidth={2}
              name="Atrasado"
              dot={{ fill: 'hsl(var(--warning))' }}
            />
            <Line 
              type="monotone" 
              dataKey="ausente" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="Ausente"
              dot={{ fill: 'hsl(var(--destructive))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;