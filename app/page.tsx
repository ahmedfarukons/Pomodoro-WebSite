"use client";
import PomodoroTimer from './components/PomodoroTimer';
import SpotifyMusicPlayer from './components/SpotifyMusicPlayer';
import TodoList from './components/TodoList';
import UserProfile from './components/UserProfile';
import { useSession } from 'next-auth/react';
import ThemeCustomizer from './components/ThemeCustomizer';
import Stats from './components/Stats';
import Social from './components/Social';
import { useAccentColor } from './providers/ThemeProvider';

export default function HomePage() {
  const { data: session } = useSession();
  const { accentColor } = useAccentColor();

  // Accent color'a göre gradient renkleri belirle
  const getGradientColors = (color: string) => {
    switch (color) {
      case '#22c55e': // Yeşil
        return {
          from: 'from-green-50',
          via: 'via-emerald-50', 
          to: 'to-green-100',
          darkFrom: 'dark:from-gray-900',
          darkVia: 'dark:via-green-900',
          darkTo: 'dark:to-gray-800',
          border: 'border-green-100',
          darkBorder: 'dark:border-green-800',
          textGradient: 'from-green-500 via-emerald-500 to-green-600'
        };
      case '#3b82f6': // Mavi
        return {
          from: 'from-blue-50',
          via: 'via-cyan-50',
          to: 'to-blue-100',
          darkFrom: 'dark:from-gray-900',
          darkVia: 'dark:via-blue-900',
          darkTo: 'dark:to-gray-800',
          border: 'border-blue-100',
          darkBorder: 'dark:border-blue-800',
          textGradient: 'from-blue-500 via-cyan-500 to-blue-600'
        };
      case '#ec4899': // Pembe
        return {
          from: 'from-pink-50',
          via: 'via-rose-50',
          to: 'to-pink-100',
          darkFrom: 'dark:from-gray-900',
          darkVia: 'dark:via-pink-900',
          darkTo: 'dark:to-gray-800',
          border: 'border-pink-100',
          darkBorder: 'dark:border-pink-800',
          textGradient: 'from-pink-500 via-rose-500 to-pink-600'
        };
      default: // Mor (varsayılan)
        return {
          from: 'from-purple-50',
          via: 'via-pink-50',
          to: 'to-purple-100',
          darkFrom: 'dark:from-gray-900',
          darkVia: 'dark:via-purple-900',
          darkTo: 'dark:to-gray-800',
          border: 'border-purple-100',
          darkBorder: 'dark:border-purple-800',
          textGradient: 'from-purple-500 via-pink-500 to-purple-600'
        };
    }
  };

  const colors = getGradientColors(accentColor);

  return (
    <main className={`min-h-screen bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} ${colors.darkFrom} ${colors.darkVia} ${colors.darkTo}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol taraf - Todo Listesi ve Tema Özelleştirme */}
            <div className="space-y-8">
              <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border ${colors.border} ${colors.darkBorder}`}>
                <TodoList />
              </div>
              <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border ${colors.border} ${colors.darkBorder}`}>
                <ThemeCustomizer />
              </div>
            </div>
            
            {/* Orta - Pomodoro Timer ve İstatistikler */}
            <div className="lg:col-span-2 space-y-8">
              <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border ${colors.border} ${colors.darkBorder}`}>
                <div className="text-center mb-8">
                  <h1 className={`text-5xl font-bold bg-gradient-to-r ${colors.textGradient} bg-clip-text text-transparent`}>
                    Pomodoro Zamanlayıcı
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
                    Odaklan, Çalış, Başar
                  </p>
                </div>
                <PomodoroTimer />
              </div>
              
              <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border ${colors.border} ${colors.darkBorder}`}>
                <Stats />
              </div>
            </div>
          </div>

          {/* Sosyal Özellikler */}
          {session && (
            <div className="mt-8">
              <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border ${colors.border} ${colors.darkBorder}`}>
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