'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useAccentColor() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAccentColor must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accentColor, setAccentColor] = useState('#6366f1');

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeContext.Provider value={{ accentColor, setAccentColor }}>
        {children}
      </ThemeContext.Provider>
    </NextThemeProvider>
  );
} 