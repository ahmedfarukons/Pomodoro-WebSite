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
import { useUser } from './contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: session } = useSession();
  const { accentColor } = useAccentColor();
  const { user, loading, login } = useUser();
  const router = useRouter();

  // NextAuth session ile kendi user context'ini senkronize et
  useEffect(() => {
    if (session && !user && session.user) {
      // Session'dan user context'ini doldur (eksik alanlar dummy ile)
      login({
        _id: 'spotify-' + (session.user.email || ''),
        name: session.user.name || '',
        email: session.user.email || '',
        preferences: {
          theme: 'light',
          pomodoroSettings: {
            workDuration: 25,
            shortBreakDuration: 5,
            longBreakDuration: 15,
            longBreakInterval: 4,
          },
        },
        stats: {
          totalPomodoros: 0,
          totalFocusTime: 0,
          totalBreakTime: 0,
          currentStreak: 0,
          longestStreak: 0,
        },
        createdAt: new Date().toISOString(),
      });
    }
  }, [session, user, login]);

  useEffect(() => {
    if (!loading && !user && !session) {
      router.push('/auth');
    }
  }, [user, loading, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Accent color'a göre gradient renkleri belirle
  const getGradientColors = (color: string) => {
    switch (color) {
      case '#22c55e': // Yeşil
        return {
          from: 'from-white',
          via: 'via-green-50', 
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
          from: 'from-white',
          via: 'via-blue-50',
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
          from: 'from-white',
          via: 'via-pink-50',
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
          from: 'from-white',
          via: 'via-purple-50',
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
              <div className={`bg-gray-100 dark:bg-gray-800 backdrop-blur-lg rounded-3xl shadow-xl p-6 border ${colors.border} ${colors.darkBorder}`}>
                <TodoList />
              </div>
              <div className={`bg-gray-100 dark:bg-gray-800 backdrop-blur-lg rounded-3xl shadow-xl p-6 border ${colors.border} ${colors.darkBorder}`}>
                <ThemeCustomizer />
              </div>
            </div>
            
            {/* Orta - Pomodoro Timer ve İstatistikler */}
            <div className="lg:col-span-2 space-y-8">
              <div className={`bg-gray-100 dark:bg-gray-800 backdrop-blur-lg rounded-3xl shadow-xl p-8 border ${colors.border} ${colors.darkBorder}`}>
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
              
              <div className={`bg-gray-100 dark:bg-gray-800 backdrop-blur-lg rounded-3xl shadow-xl p-6 border ${colors.border} ${colors.darkBorder}`}>
                <Stats />
              </div>
            </div>
          </div>

          {/* Sosyal Özellikler */}
          {session && (
            <div className="mt-8">
              <div className={`bg-gray-100 dark:bg-gray-800 backdrop-blur-lg rounded-3xl shadow-xl p-6 border ${colors.border} ${colors.darkBorder}`}>
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