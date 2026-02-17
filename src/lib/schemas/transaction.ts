import { z } from 'zod';

export const TransactionTypeSchema = z.enum(['income', 'expense']);

export const TransactionFormSchema = z.object({
  type: TransactionTypeSchema,
  amount: z.number().positive('Amount must be positive'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  note: z.string().max(200, 'Note must be less than 200 characters'),
});

export const TransactionSchema = TransactionFormSchema.extend({
  id: z.string(),
  createdAt: z.number(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionFormData = z.infer<typeof TransactionFormSchema>;
