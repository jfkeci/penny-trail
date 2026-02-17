import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { Transaction } from '../../lib/schemas/transaction';
import { groupByMonth } from '../../utils/calculations';
import { useResolvedDark } from '../../hooks/useTheme';

interface IncomeExpenseBarChartProps {
  transactions: Transaction[];
}

export function IncomeExpenseBarChart({ transactions }: IncomeExpenseBarChartProps) {
  const isDark = useResolvedDark();
  const data = groupByMonth(transactions);

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
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} />
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
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
