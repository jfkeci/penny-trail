import { ReceiptText } from 'lucide-react';
import type { Transaction } from '../../lib/schemas/transaction';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-white py-12 text-center dark:bg-gray-800">
        <ReceiptText className="mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No transactions yet</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Add your first transaction to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
