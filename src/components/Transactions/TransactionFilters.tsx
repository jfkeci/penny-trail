import { useState, useEffect } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';
import { categories } from '../../constants/categories';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export function TransactionFilters() {
  const { type, searchQuery, dateRange, categories: selectedCategories } = useFilterStore();
  const { setType, setSearchQuery, setDateRange, setCategories, resetFilters } = useFilterStore();

  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(localSearch), 300);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  const typeOptions = ['all', 'income', 'expense'] as const;

  const filteredCategories =
    type === 'all' ? categories : categories.filter((c) => c.type === type);

  function toggleCategory(value: string) {
    if (selectedCategories.includes(value)) {
      setCategories(selectedCategories.filter((c) => c !== value));
    } else {
      setCategories([...selectedCategories, value]);
    }
  }

  const hasActiveFilters =
    type !== 'all' ||
    searchQuery !== '' ||
    selectedCategories.length > 0 ||
    dateRange.start !== null;

  return (
    <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search notes..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw size={14} />
            Reset
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        {typeOptions.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              type === t
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {filteredCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => toggleCategory(cat.value)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              selectedCategories.includes(cat.value)
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="date"
          value={dateRange.start ?? ''}
          onChange={(e) =>
            setDateRange({ start: e.target.value || null, end: dateRange.end })
          }
          className="flex-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          aria-label="Start date"
        />
        <span className="text-xs text-gray-400">to</span>
        <input
          type="date"
          value={dateRange.end ?? ''}
          onChange={(e) =>
            setDateRange({ start: dateRange.start, end: e.target.value || null })
          }
          className="flex-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          aria-label="End date"
        />
      </div>
    </div>
  );
}
