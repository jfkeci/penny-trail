import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  currency: string;
}

interface UIActions {
  setTheme: (theme: UIState['theme']) => void;
  setCurrency: (currency: string) => void;
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      theme: 'system',
      currency: 'USD',

      setTheme: (theme) => set({ theme }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'pennytrail-ui',
      partialize: (state) => ({
        theme: state.theme,
        currency: state.currency,
      }),
    },
  ),
);
