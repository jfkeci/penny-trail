import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useDashboardMetrics } from '../../store/selectors';
import { useUIStore } from '../../store/useUIStore';
import { formatCurrency } from '../../utils/formatters';

export function BalanceCard() {
  const { balance, totalIncome, totalExpenses } = useDashboardMetrics();
  const currency = useUIStore((s) => s.currency);

  return (
    <div className="rounded-xl bg-gradient-to-br from-primary to-indigo-700 p-6 text-white shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <Wallet className="h-5 w-5" />
        <span className="text-sm font-medium opacity-90">Total Balance</span>
      </div>
      <p className="mb-6 text-3xl font-bold">{formatCurrency(balance, currency)}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-white/20 p-1.5">
            <TrendingUp size={16} />
          </div>
          <div>
            <p className="text-xs opacity-75">Income</p>
            <p className="text-sm font-semibold">{formatCurrency(totalIncome, currency)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-white/20 p-1.5">
            <TrendingDown size={16} />
          </div>
          <div>
            <p className="text-xs opacity-75">Expenses</p>
            <p className="text-sm font-semibold">{formatCurrency(totalExpenses, currency)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
