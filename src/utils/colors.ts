const tailwindHexMap: Record<string, string> = {
  'emerald-500': '#10b981',
  'teal-500': '#14b8a6',
  'blue-500': '#3b82f6',
  'purple-500': '#a855f7',
  'gray-500': '#6b7280',
  'orange-500': '#f97316',
  'pink-500': '#ec4899',
  'yellow-500': '#eab308',
  'red-500': '#ef4444',
  'indigo-500': '#6366f1',
  'cyan-500': '#06b6d4',
};

export function colorToHex(token: string): string {
  return tailwindHexMap[token] ?? '#6b7280';
}
