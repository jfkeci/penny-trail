import { useState, useEffect } from 'react';
import { TransactionFormSchema } from '../../lib/schemas/transaction';
import type { Transaction, TransactionFormData } from '../../lib/schemas/transaction';
import { getCategoriesByType } from '../../constants/categories';
import { useTransactionStore } from '../../store/useTransactionStore';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { DatePicker } from '../common/DatePicker';

interface TransactionFormProps {
  editingTransaction?: Transaction | null;
  onClose: () => void;
}

export function TransactionForm({ editingTransaction, onClose }: TransactionFormProps) {
  const addTransaction = useTransactionStore((s) => s.addTransaction);
  const updateTransaction = useTransactionStore((s) => s.updateTransaction);

  const [type, setType] = useState<TransactionFormData['type']>(
    editingTransaction?.type ?? 'expense',
  );
  const [amount, setAmount] = useState(editingTransaction?.amount.toString() ?? '');
  const [category, setCategory] = useState(editingTransaction?.category ?? '');
  const [date, setDate] = useState(
    editingTransaction?.date ?? new Date().toISOString().slice(0, 10),
  );
  const [note, setNote] = useState(editingTransaction?.note ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categoryOptions = getCategoriesByType(type).map((c) => ({
    value: c.value,
    label: c.label,
  }));

  useEffect(() => {
    if (!editingTransaction) {
      setCategory('');
    }
  }, [type, editingTransaction]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = TransactionFormSchema.safeParse({
      type,
      amount: parseFloat(amount),
      category,
      date,
      note,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0]?.toString();
        if (field) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    if (editingTransaction) {
      updateTransaction(editingTransaction.id, parsed.data);
    } else {
      addTransaction(parsed.data);
    }

    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        {(['expense', 'income'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              type === t
                ? t === 'income'
                  ? 'bg-income text-white'
                  : 'bg-expense text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <Input
        label="Amount"
        type="number"
        step="0.01"
        min="0"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={errors.amount}
      />

      <Select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categoryOptions}
        placeholder="Select category"
        error={errors.category}
      />

      <DatePicker
        label="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={errors.date}
      />

      <Input
        label="Note"
        placeholder="Add a note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        error={errors.note}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{editingTransaction ? 'Update' : 'Add'} Transaction</Button>
      </div>
    </form>
  );
}
