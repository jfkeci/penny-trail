import { Sun, Moon, Monitor, Download, Wallet } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useTransactionStore } from '../../store/useTransactionStore';
import { exportTransactionsCsv } from '../../lib/exportCsv';
import { currencies } from '../../constants/currencies';
import { Button } from '../common/Button';

export function Header() {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);
  const currency = useUIStore((s) => s.currency);
  const setCurrency = useUIStore((s) => s.setCurrency);
  const transactions = useTransactionStore((s) => s.transactions);

  const themeOptions = [
    { value: 'light' as const, icon: Sun },
    { value: 'dark' as const, icon: Moon },
    { value: 'system' as const, icon: Monitor },
  ];

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">PennyTrail</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            aria-label="Currency"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code}
              </option>
            ))}
          </select>

          <div className="flex rounded-lg border border-gray-300 dark:border-gray-600">
            {themeOptions.map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`p-1.5 transition-colors ${theme === value ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                aria-label={`${value} theme`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => exportTransactionsCsv(transactions)}
            disabled={transactions.length === 0}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
