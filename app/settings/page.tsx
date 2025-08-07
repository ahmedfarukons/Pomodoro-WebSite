'use client';

import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import ThemeCustomizer from '../components/ThemeCustomizer';
import PomodoroSettings from '../components/PomodoroSettings';
import SpotifyDebug from '../components/SpotifyDebug';

export default function SettingsPage() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('general');
  const { theme, setTheme } = useTheme();
  const [preferences, setPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  useEffect(() => {
    // Handle Spotify callback messages
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    
    if (success === 'spotify_connected') {
      setMessage({ type: 'success', text: 'Spotify başarıyla bağlandı!' });
      // Clear the URL parameter
      router.replace('/settings');
    } else if (error) {
      let errorText = 'Bir hata oluştu.';
      switch (error) {
        case 'spotify_auth_failed':
          errorText = 'Spotify yetkilendirmesi başarısız oldu.';
          break;
        case 'token_exchange_failed':
          errorText = 'Spotify token değişimi başarısız oldu.';
          break;
        case 'callback_failed':
          errorText = 'Spotify callback işlemi başarısız oldu.';
          break;
        case 'spotify_config_missing':
          errorText = 'Spotify yapılandırması eksik. Lütfen environment variables\'ları kontrol edin.';
          break;
      }
      setMessage({ type: 'error', text: errorText });
      router.replace('/settings');
    }
  }, [searchParams, router]);

  const fetchPreferences = async () => {
    try {
      const response = await fetch('/api/user/preferences', {
        headers: {
          'Authorization': `Bearer ${user?._id}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPreferences(data.preferences);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async (newPreferences: any) => {
    setSaving(true);
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?._id}`
        },
        body: JSON.stringify(newPreferences),
      });
      
      if (response.ok) {
        const data = await response.json();
        setPreferences(data.preferences);
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    router.push('/auth');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ayarlar</h1>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-center justify-between">
                <span>{message.text}</span>
                <button
                  onClick={() => setMessage(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`${
                    activeTab === 'general'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Genel
                </button>
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`${
                    activeTab === 'appearance'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Görünüm
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`${
                    activeTab === 'notifications'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Bildirimler
                </button>
                <button
                  onClick={() => setActiveTab('pomodoro')}
                  className={`${
                    activeTab === 'pomodoro'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Pomodoro
                </button>
                <button
                  onClick={() => setActiveTab('debug')}
                  className={`${
                    activeTab === 'debug'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Debug
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profil Bilgileri</h3>
                    <div className="mt-4 grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          İsim
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          defaultValue={user?.name || ''}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          E-posta
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          defaultValue={user?.email || ''}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <ThemeCustomizer />
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bildirim Tercihleri</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="email-notifications"
                          checked={preferences?.notifications?.email || false}
                          onChange={(e) => {
                            const newPrefs = {
                              ...preferences,
                              notifications: {
                                ...preferences?.notifications,
                                email: e.target.checked
                              }
                            };
                            setPreferences(newPrefs);
                            savePreferences(newPrefs);
                          }}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                        />
                        <label htmlFor="email-notifications" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          E-posta Bildirimleri
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="desktop-notifications"
                          checked={preferences?.notifications?.desktop || true}
                          onChange={(e) => {
                            const newPrefs = {
                              ...preferences,
                              notifications: {
                                ...preferences?.notifications,
                                desktop: e.target.checked
                              }
                            };
                            setPreferences(newPrefs);
                            savePreferences(newPrefs);
                          }}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                        />
                        <label htmlFor="desktop-notifications" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Masaüstü Bildirimleri
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pomodoro' && (
                <div className="space-y-6">
                  <PomodoroSettings />
                </div>
              )}

              {activeTab === 'debug' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Debug Bilgileri</h3>
                    <SpotifyDebug />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 