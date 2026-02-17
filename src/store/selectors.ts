import { useMemo } from 'react';
import { useTransactionStore } from './useTransactionStore';
import { useFilterStore } from './useFilterStore';
import { parseISO, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

export function useFilteredTransactions() {
  const transactions = useTransactionStore((s) => s.transactions);
  const { dateRange, categories, type, searchQuery } = useFilterStore();

  return useMemo(() => {
    return transactions.filter((t) => {
      if (type !== 'all' && t.type !== type) return false;

      if (categories.length > 0 && !categories.includes(t.category)) return false;

      if (dateRange.start && dateRange.end) {
        const date = parseISO(t.date);
        if (
          !isWithinInterval(date, {
            start: parseISO(dateRange.start),
            end: parseISO(dateRange.end),
          })
        )
          return false;
      }

      if (searchQuery && !t.note.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [transactions, dateRange, categories, type, searchQuery]);
}

export function useDashboardMetrics() {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const monthlyTransactions = transactions.filter((t) => {
      const date = parseISO(t.date);
      return isWithinInterval(date, { start: monthStart, end: monthEnd });
    });

    const monthlyIncome = monthlyTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlySavings = monthlyIncome - monthlyExpenses;

    return {
      totalIncome,
      totalExpenses,
      balance,
      monthlyIncome,
      monthlyExpenses,
      monthlySavings,
      transactionCount: transactions.length,
    };
  }, [transactions]);
}
