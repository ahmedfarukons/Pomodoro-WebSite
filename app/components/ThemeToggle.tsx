'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-50 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
      title={`${theme === 'dark' ? 'Açık' : 'Koyu'} temaya geç`}
    >
      <div className="text-xl">
        {theme === 'dark' ? '🎨' : '🖌️'}
      </div>
    </button>
  );
} 