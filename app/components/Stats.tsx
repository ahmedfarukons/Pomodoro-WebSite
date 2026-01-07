'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export default function Stats() {
  const [stats, setStats] = useState({
    totalPomodoros: 0,
    totalFocusTime: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: 'İlk Adım',
      description: 'İlk Pomodoro oturumunu tamamla',
      icon: '🎯',
      unlocked: false,
    },
    {
      id: 2,
      title: 'Odaklanma Ustası',
      description: '10 Pomodoro oturumu tamamla',
      icon: '🎓',
      unlocked: false,
    },
    {
      id: 3,
      title: 'Seri Katil',
      description: '3 gün üst üste çalış',
      icon: '🔥',
      unlocked: false,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Toplam Pomodoro</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalPomodoros}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Toplam Odaklanma</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {Math.floor(stats.totalFocusTime / 60)} saat
          </p>
        </motion.div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Başarılar</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg border ${
                achievement.unlocked
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 