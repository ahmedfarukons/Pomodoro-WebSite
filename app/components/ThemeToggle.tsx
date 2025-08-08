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
    // Animate body background transitions by toggling a helper class
    document.documentElement.classList.add('transition-colors');
    setTimeout(() => document.documentElement.classList.remove('transition-colors'), 400);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg p-3 z-50 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
      title={`${theme === 'dark' ? 'Açık' : 'Koyu'} temaya geç`}
    >
      <div className="text-xl">
        {theme === 'dark' ? '🎨' : '🖌️'}
      </div>
    </button>
  );
} 