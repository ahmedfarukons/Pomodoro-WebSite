'use client';

import { useTheme } from 'next-themes';
import { useAccentColor } from '../providers/ThemeProvider';
import { useState, useEffect } from 'react';

export default function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const { accentColor, setAccentColor } = useAccentColor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">Yükleniyor...</div>;
  }

  const themes = [
    { name: 'Mor', value: 'purple', color: '#6366f1' },
    { name: 'Mavi', value: 'blue', color: '#3b82f6' },
    { name: 'Yeşil', value: 'green', color: '#22c55e' },
    { name: 'Pembe', value: 'pink', color: '#ec4899' },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case '#22c55e':
        return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
      case '#3b82f6':
        return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
      case '#ec4899':
        return 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500';
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tema Özelleştirme</h2>
      
      <div className="space-y-6">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Spotify Bağlantısı
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Spotify bağlı değil
                </span>
              </div>
            </div>
            <button
              onClick={() => (window.location.href = '/api/auth/spotify/login')}
              className={`px-4 py-2 text-sm text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${getColorClasses(accentColor)}`}
            >
              🎵 Spotify'a Bağlan
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Spotify'a bağlanarak müzik çaları kullanabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
} 