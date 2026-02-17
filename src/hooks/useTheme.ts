import { useEffect } from 'react';
import { useUIStore } from '../store/useUIStore';

export function useTheme() {
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;

    function apply(resolved: 'light' | 'dark') {
      root.classList.toggle('dark', resolved === 'dark');
    }

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      apply(mq.matches ? 'dark' : 'light');

      const handler = (e: MediaQueryListEvent) => apply(e.matches ? 'dark' : 'light');
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }

    apply(theme);
  }, [theme]);

  return theme;
}

export function useResolvedDark(): boolean {
  const theme = useUIStore((s) => s.theme);
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
