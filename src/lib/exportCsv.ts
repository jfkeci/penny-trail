import type { Transaction } from './schemas/transaction';
import { getCategoryDef } from '../constants/categories';

export function exportTransactionsCsv(transactions: Transaction[]) {
  const header = 'Date,Type,Category,Amount,Note';
  const rows = transactions.map((t) => {
    const cat = getCategoryDef(t.category);
    const catLabel = cat ? cat.label : t.category;
    const note = t.note.includes(',') ? `"${t.note}"` : t.note;
    return `${t.date},${t.type},${catLabel},${t.amount},${note}`;
  });

  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `pennytrail-export-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}
