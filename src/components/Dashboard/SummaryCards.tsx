import { TrendingUp, TrendingDown, PiggyBank, BarChart3 } from 'lucide-react';
import { useDashboardMetrics } from '../../store/selectors';
import { useUIStore } from '../../store/useUIStore';
import { formatCurrency } from '../../utils/formatters';

export function SummaryCards() {
  const { monthlyIncome, monthlyExpenses, monthlySavings, transactionCount } =
    useDashboardMetrics();
  const currency = useUIStore((s) => s.currency);

  const cards = [
    {
      label: 'Monthly Income',
      value: formatCurrency(monthlyIncome, currency),
      icon: TrendingUp,
      color: 'text-income bg-income-light dark:bg-emerald-900/30',
    },
    {
      label: 'Monthly Expenses',
      value: formatCurrency(monthlyExpenses, currency),
      icon: TrendingDown,
      color: 'text-expense bg-expense-light dark:bg-red-900/30',
    },
    {
      label: 'Monthly Savings',
      value: formatCurrency(monthlySavings, currency),
      icon: PiggyBank,
      color: 'text-primary bg-primary-light dark:bg-indigo-900/30',
    },
    {
      label: 'Transactions',
      value: transactionCount.toString(),
      icon: BarChart3,
      color: 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700/50',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {card.label}
            </span>
            <div className={`rounded-lg p-1.5 ${card.color}`}>
              <card.icon size={16} />
            </div>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
