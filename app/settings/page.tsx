'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const { theme, setTheme } = useTheme();

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ayarlar</h1>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`${
                    activeTab === 'general'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Genel
                </button>
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`${
                    activeTab === 'appearance'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Görünüm
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`${
                    activeTab === 'notifications'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Bildirimler
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
                          defaultValue={session.user?.name || ''}
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
                          defaultValue={session.user?.email || ''}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tema Ayarları</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          id="light"
                          checked={theme === 'light'}
                          onChange={() => setTheme('light')}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="light" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Açık Tema
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          id="dark"
                          checked={theme === 'dark'}
                          onChange={() => setTheme('dark')}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="dark" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Koyu Tema
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          id="system"
                          checked={theme === 'system'}
                          onChange={() => setTheme('system')}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="system" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Sistem Teması
                        </label>
                      </div>
                    </div>
                  </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 