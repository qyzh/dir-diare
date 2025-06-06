'use client';

import { useEffect, ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {

    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === null) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        document.documentElement.classList.add('dark');
      }
    } else if (darkMode === 'true') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return <>{children}</>;
} 