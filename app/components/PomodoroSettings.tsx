'use client';

import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useAccentColor } from '../providers/ThemeProvider';

interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
}

export default function PomodoroSettings() {
  const [settings, setSettings] = useState<PomodoroSettings>({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useUser();
  const { accentColor } = useAccentColor();

  useEffect(() => {
    const loadSettings = async () => {
      if (user?._id) {
        try {
          const response = await fetch('/api/user/preferences', {
            headers: {
              'Authorization': `Bearer ${user._id}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setSettings(data.preferences.pomodoroSettings);
          }
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
      setIsLoading(false);
    };

    loadSettings();
  }, [user]);

  const handleSave = async () => {
    if (!user?._id) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user._id}`
        },
        body: JSON.stringify({
          pomodoroSettings: settings
        }),
      });

      if (response.ok) {
        // Show success message
        alert('Ayarlar başarıyla kaydedildi!');
      } else {
        alert('Ayarlar kaydedilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Ayarlar kaydedilirken bir hata oluştu.');
    }
    setIsSaving(false);
  };

  const handleInputChange = (field: keyof PomodoroSettings, value: number) => {
    setSettings(prev => ({
      ...prev,
      [field]: Math.max(1, Math.min(60, value)) // Limit between 1-60 minutes
    }));
  };

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

  if (isLoading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Pomodoro Ayarları
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Çalışma Süresi (dakika)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.workDuration}
              onChange={(e) => handleInputChange('workDuration', parseInt(e.target.value) || 25)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kısa Mola (dakika)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={settings.shortBreakDuration}
              onChange={(e) => handleInputChange('shortBreakDuration', parseInt(e.target.value) || 5)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Uzun Mola (dakika)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.longBreakDuration}
              onChange={(e) => handleInputChange('longBreakDuration', parseInt(e.target.value) || 15)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Uzun Mola Aralığı
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={settings.longBreakInterval}
              onChange={(e) => handleInputChange('longBreakInterval', parseInt(e.target.value) || 4)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full px-6 py-3 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${getColorClasses(accentColor)} ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
