import { Pencil, Trash2 } from 'lucide-react';
import type { Transaction } from '../../lib/schemas/transaction';
import { getCategoryDef } from '../../constants/categories';
import { useUIStore } from '../../store/useUIStore';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { colorToHex } from '../../utils/colors';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionItem({ transaction, onEdit, onDelete }: TransactionItemProps) {
  const currency = useUIStore((s) => s.currency);
  const cat = getCategoryDef(transaction.category);
  const Icon = cat?.icon;
  const iconColor = cat ? colorToHex(cat.color) : '#6b7280';

  return (
    <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750">
      {Icon && (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Icon size={20} style={{ color: iconColor }} />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
          {cat?.label ?? transaction.category}
        </p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
          {transaction.note || 'No note'} &middot; {formatDate(transaction.date)}
        </p>
      </div>

      <p
        className={`text-sm font-semibold whitespace-nowrap ${transaction.type === 'income' ? 'text-income' : 'text-expense'}`}
      >
        {transaction.type === 'income' ? '+' : '-'}
        {formatCurrency(transaction.amount, currency)}
      </p>

      <div className="flex shrink-0 gap-1">
        <button
          onClick={() => onEdit(transaction)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          aria-label="Edit transaction"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(transaction.id)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-expense dark:hover:bg-red-900/20"
          aria-label="Delete transaction"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
