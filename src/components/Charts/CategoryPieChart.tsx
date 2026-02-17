import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Transaction } from '../../lib/schemas/transaction';
import { groupByCategory } from '../../utils/calculations';
import { getCategoryDef } from '../../constants/categories';
import { colorToHex } from '../../utils/colors';
import { useResolvedDark } from '../../hooks/useTheme';

interface CategoryPieChartProps {
  transactions: Transaction[];
}

export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
  const isDark = useResolvedDark();
  const expenses = transactions.filter((t) => t.type === 'expense');
  const data = groupByCategory(expenses).map((g) => {
    const cat = getCategoryDef(g.category);
    return {
      name: cat?.label ?? g.category,
      value: g.total,
      color: cat ? colorToHex(cat.color) : '#6b7280',
    };
  });

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400 dark:text-gray-500">
        No expense data to display
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#fff',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              color: isDark ? '#f3f4f6' : '#111827',
            }}
            formatter={(value) => [`$${Number(value).toFixed(2)}`, '']}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: isDark ? '#9ca3af' : '#6b7280' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
