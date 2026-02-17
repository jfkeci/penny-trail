import { create } from 'zustand';

interface DateRange {
  start: string | null;
  end: string | null;
}

interface FilterState {
  dateRange: DateRange;
  categories: string[];
  type: 'income' | 'expense' | 'all';
  searchQuery: string;
}

interface FilterActions {
  setDateRange: (range: DateRange) => void;
  setCategories: (categories: string[]) => void;
  setType: (type: FilterState['type']) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  dateRange: { start: null, end: null },
  categories: [],
  type: 'all',
  searchQuery: '',
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...initialState,
  setDateRange: (dateRange) => set({ dateRange }),
  setCategories: (categories) => set({ categories }),
  setType: (type) => set({ type }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () => set(initialState),
}));
