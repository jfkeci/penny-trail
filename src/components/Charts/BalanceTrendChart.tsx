import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Transaction } from '../../lib/schemas/transaction';
import { calculateRunningBalance } from '../../utils/calculations';
import { useResolvedDark } from '../../hooks/useTheme';

interface BalanceTrendChartProps {
  transactions: Transaction[];
}

export function BalanceTrendChart({ transactions }: BalanceTrendChartProps) {
  const isDark = useResolvedDark();
  const data = calculateRunningBalance(transactions);

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400 dark:text-gray-500">
        No data to display
      </div>
    );
  }

  const axisColor = isDark ? '#9ca3af' : '#6b7280';
  const gridColor = isDark ? '#374151' : '#e5e7eb';

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="date" tick={{ fill: axisColor, fontSize: 12 }} />
          <YAxis tick={{ fill: axisColor, fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#fff',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              color: isDark ? '#f3f4f6' : '#111827',
            }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3, fill: '#6366f1' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
