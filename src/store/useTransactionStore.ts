import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Transaction, TransactionFormData } from '../lib/schemas/transaction';

interface TransactionState {
  transactions: Transaction[];
}

interface TransactionActions {
  addTransaction: (data: TransactionFormData) => void;
  updateTransaction: (id: string, updates: Partial<TransactionFormData>) => void;
  deleteTransaction: (id: string) => void;
  clearAllTransactions: () => void;
}

export const useTransactionStore = create<TransactionState & TransactionActions>()(
  persist(
    immer((set) => ({
      transactions: [],

      addTransaction: (data) =>
        set((state) => {
          state.transactions.unshift({
            ...data,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
          });
        }),

      updateTransaction: (id, updates) =>
        set((state) => {
          const index = state.transactions.findIndex((t) => t.id === id);
          if (index !== -1) {
            Object.assign(state.transactions[index], updates);
          }
        }),

      deleteTransaction: (id) =>
        set((state) => {
          const index = state.transactions.findIndex((t) => t.id === id);
          if (index !== -1) {
            state.transactions.splice(index, 1);
          }
        }),

      clearAllTransactions: () => set({ transactions: [] }),
    })),
    { name: 'pennytrail-transactions' },
  ),
);
