export interface CurrencyDef {
  code: string;
  symbol: string;
  label: string;
  locale: string;
}

export const currencies: CurrencyDef[] = [
  { code: 'USD', symbol: '$', label: 'US Dollar', locale: 'en-US' },
  { code: 'EUR', symbol: '€', label: 'Euro', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', label: 'British Pound', locale: 'en-GB' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen', locale: 'ja-JP' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee', locale: 'en-IN' },
];

export function getCurrency(code: string): CurrencyDef {
  return currencies.find((c) => c.code === code) ?? currencies[0];
}
