import { format, parseISO } from 'date-fns';
import { getCurrency } from '../constants/currencies';

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = getCurrency(currencyCode);
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.code === 'JPY' ? 0 : 2,
    maximumFractionDigits: currency.code === 'JPY' ? 0 : 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM d, yyyy');
}
