import {
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  Plus,
  Utensils,
  Car,
  ShoppingBag,
  Film,
  Receipt,
  Heart,
  GraduationCap,
  Plane,
  MoreHorizontal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TransactionFormData } from '../lib/schemas/transaction';

export interface CategoryDef {
  value: string;
  label: string;
  type: TransactionFormData['type'];
  icon: LucideIcon;
  color: string;
}

export const categories: CategoryDef[] = [
  // Income
  { value: 'salary', label: 'Salary', type: 'income', icon: Briefcase, color: 'emerald-500' },
  { value: 'freelance', label: 'Freelance', type: 'income', icon: Laptop, color: 'teal-500' },
  { value: 'investments', label: 'Investments', type: 'income', icon: TrendingUp, color: 'blue-500' },
  { value: 'gifts-in', label: 'Gifts', type: 'income', icon: Gift, color: 'purple-500' },
  { value: 'other-income', label: 'Other Income', type: 'income', icon: Plus, color: 'gray-500' },
  // Expense
  { value: 'food', label: 'Food & Dining', type: 'expense', icon: Utensils, color: 'orange-500' },
  { value: 'transport', label: 'Transportation', type: 'expense', icon: Car, color: 'blue-500' },
  { value: 'shopping', label: 'Shopping', type: 'expense', icon: ShoppingBag, color: 'pink-500' },
  { value: 'entertainment', label: 'Entertainment', type: 'expense', icon: Film, color: 'purple-500' },
  { value: 'bills', label: 'Bills & Utilities', type: 'expense', icon: Receipt, color: 'yellow-500' },
  { value: 'healthcare', label: 'Healthcare', type: 'expense', icon: Heart, color: 'red-500' },
  { value: 'education', label: 'Education', type: 'expense', icon: GraduationCap, color: 'indigo-500' },
  { value: 'travel', label: 'Travel', type: 'expense', icon: Plane, color: 'cyan-500' },
  { value: 'other-expense', label: 'Other Expenses', type: 'expense', icon: MoreHorizontal, color: 'gray-500' },
];

export function getCategoriesByType(type: TransactionFormData['type']) {
  return categories.filter((c) => c.type === type);
}

export function getCategoryDef(value: string): CategoryDef | undefined {
  return categories.find((c) => c.value === value);
}

const iconMap: Record<string, LucideIcon> = Object.fromEntries(
  categories.map((c) => [c.value, c.icon]),
);

export function getCategoryIcon(value: string): LucideIcon | undefined {
  return iconMap[value];
}
