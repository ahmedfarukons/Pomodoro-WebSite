"use client";
import PomodoroTimer from './components/PomodoroTimer';
import SpotifyMusicPlayer from './components/SpotifyMusicPlayer';
import TodoList from './components/TodoList';
import UserProfile from './components/UserProfile';
import { useSession } from 'next-auth/react';
import ThemeCustomizer from './components/ThemeCustomizer';
import Stats from './components/Stats';
import Social from './components/Social';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol taraf - Todo Listesi ve Tema Özelleştirme */}
            <div className="space-y-8">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-purple-100 dark:border-purple-800">
                <TodoList />
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-purple-100 dark:border-purple-800">
                <ThemeCustomizer />
              </div>
            </div>
            
            {/* Orta - Pomodoro Timer ve İstatistikler */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-purple-100 dark:border-purple-800">
                <div className="text-center mb-8">
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    Pomodoro Zamanlayıcı
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
                    Odaklan, Çalış, Başar
                  </p>
                </div>
                <PomodoroTimer />
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-purple-100 dark:border-purple-800">
                <Stats />
              </div>
            </div>
          </div>

          {/* Sosyal Özellikler */}
          {session && (
            <div className="mt-8">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-purple-100 dark:border-purple-800">
                <Social />
              </div>
            </div>
          )}
        </div>
      </div>
      <UserProfile />
      <SpotifyMusicPlayer />
    </main>
  );
} 