import type { InputHTMLAttributes } from 'react';

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export function DatePicker({ label, error, className = '', id, ...props }: DatePickerProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        type="date"
        id={inputId}
        className={`rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 ${error ? 'border-expense' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-expense">{error}</p>}
    </div>
  );
}
