'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const [accentColor, setAccentColor] = useState('#6366f1');

  const themes = [
    { name: 'Mor', value: 'purple', color: '#6366f1' },
    { name: 'Mavi', value: 'blue', color: '#3b82f6' },
    { name: 'Yeşil', value: 'green', color: '#22c55e' },
    { name: 'Pembe', value: 'pink', color: '#ec4899' },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tema Özelleştirme</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ana Tema
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                theme === 'light'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              Açık
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              Koyu
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                theme === 'system'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              Sistem
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Vurgu Rengi
          </label>
          <div className="grid grid-cols-4 gap-2">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setAccentColor(t.color)}
                className={`p-2 rounded-lg border ${
                  accentColor === t.color
                    ? 'border-2 border-indigo-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                style={{ backgroundColor: t.color }}
              >
                <span className="sr-only">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 