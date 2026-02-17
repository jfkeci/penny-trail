import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Transaction } from '../../lib/schemas/transaction';
import { useFilteredTransactions } from '../../store/selectors';
import { useTransactionStore } from '../../store/useTransactionStore';
import { BalanceCard } from './BalanceCard';
import { SummaryCards } from './SummaryCards';
import { TransactionForm } from '../Transactions/TransactionForm';
import { TransactionList } from '../Transactions/TransactionList';
import { TransactionFilters } from '../Transactions/TransactionFilters';
import { CategoryPieChart } from '../Charts/CategoryPieChart';
import { IncomeExpenseBarChart } from '../Charts/IncomeExpenseBarChart';
import { BalanceTrendChart } from '../Charts/BalanceTrendChart';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const filteredTransactions = useFilteredTransactions();
  const allTransactions = useTransactionStore((s) => s.transactions);
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction);

  function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction);
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setEditingTransaction(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={18} />
          Add Transaction
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <BalanceCard />
        <div className="lg:col-span-2">
          <SummaryCards />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Expenses by Category
          </h3>
          <CategoryPieChart transactions={allTransactions} />
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Income vs Expenses
          </h3>
          <IncomeExpenseBarChart transactions={allTransactions} />
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Balance Trend
          </h3>
          <BalanceTrendChart transactions={allTransactions} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <TransactionFilters />
        </div>
        <div className="lg:col-span-3">
          <TransactionList
            transactions={filteredTransactions}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
          />
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm editingTransaction={editingTransaction} onClose={handleClose} />
      </Modal>
    </div>
  );
}
