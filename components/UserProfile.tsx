"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '../app/contexts/UserContext';

interface UserStats {
  totalPomodoros: number;
  totalWorkTime: number;
  totalGold: number;
  completedTasks: number;
  streak: number;
}

const UserProfile: React.FC = () => {
  const { user, logout } = useUser();
  const [stats, setStats] = useState<UserStats>({
    totalPomodoros: 0,
    totalWorkTime: 0,
    totalGold: 0,
    completedTasks: 0,
    streak: 0,
  });

  useEffect(() => {
    if (user) {
      // Burada kullanıcı istatistiklerini veritabanından çekebiliriz
      // Şimdilik örnek veriler kullanıyoruz
      setStats({
        totalPomodoros: 25,
        totalWorkTime: 1250, // dakika cinsinden
        totalGold: 500,
        completedTasks: 15,
        streak: 3,
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => window.location.href = '/auth'}
          className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
          Giriş Yap
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">
            {user.name?.[0] || user.email?.[0] || '?'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {user.name || 'Kullanıcı'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Toplam Pomodoro</span>
            <span className="font-semibold text-gray-900 dark:text-white">{stats.totalPomodoros}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Toplam Çalışma Süresi</span>
            <span className="font-semibold text-gray-900 dark:text-white">{Math.floor(stats.totalWorkTime / 60)}s {stats.totalWorkTime % 60}d</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Toplam Altın</span>
            <span className="font-semibold text-amber-600">{stats.totalGold}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Tamamlanan Görevler</span>
            <span className="font-semibold text-gray-900 dark:text-white">{stats.completedTasks}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Günlük Seri</span>
            <span className="font-semibold text-green-600">{stats.streak} gün</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default UserProfile; 