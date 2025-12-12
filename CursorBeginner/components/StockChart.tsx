'use client';

import { StockChartData } from '@/lib/mockData';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface StockChartProps {
  data: StockChartData[];
  isPositive: boolean;
}

export default function StockChart({ data, isPositive }: StockChartProps) {
  const lineColor = isPositive ? '#10b981' : '#ef4444';
  const barColor = isPositive ? '#10b981' : '#ef4444';

  return (
    <div className="w-full h-[400px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            yAxisId="left"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            label={{ value: '주가 ($)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            label={{ value: '거래량', angle: 90, position: 'insideRight', fill: '#9ca3af' }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value: number, name: string) => {
              if (name === '거래량') {
                return [(value / 1000000).toFixed(2) + 'M', name];
              }
              return ['$' + value.toFixed(2), name];
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              color: '#9ca3af',
            }}
          />
          <Bar
            yAxisId="right"
            dataKey="volume"
            fill={barColor}
            opacity={0.3}
            name="거래량"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={2}
            dot={{ fill: lineColor, r: 4 }}
            activeDot={{ r: 6 }}
            name="주가"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

