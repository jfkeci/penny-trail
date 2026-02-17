import { format, parseISO } from 'date-fns';
import type { Transaction } from '../lib/schemas/transaction';

export interface CategoryGroup {
  category: string;
  total: number;
}

export interface MonthGroup {
  month: string;
  income: number;
  expense: number;
}

export interface BalancePoint {
  date: string;
  balance: number;
}

export function groupByCategory(transactions: Transaction[]): CategoryGroup[] {
  const map: Record<string, number> = {};
  for (const t of transactions) {
    map[t.category] = (map[t.category] ?? 0) + t.amount;
  }
  return Object.entries(map)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

export function groupByMonth(transactions: Transaction[]): MonthGroup[] {
  const map: Record<string, { income: number; expense: number }> = {};
  for (const t of transactions) {
    const month = format(parseISO(t.date), 'yyyy-MM');
    if (!map[month]) map[month] = { income: 0, expense: 0 };
    map[month][t.type] += t.amount;
  }
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({ month, ...data }));
}

export function calculateRunningBalance(transactions: Transaction[]): BalancePoint[] {
  const sorted = [...transactions].sort(
    (a, b) => a.date.localeCompare(b.date) || a.createdAt - b.createdAt,
  );
  let balance = 0;
  return sorted.map((t) => {
    balance += t.type === 'income' ? t.amount : -t.amount;
    return { date: t.date, balance };
  });
}
