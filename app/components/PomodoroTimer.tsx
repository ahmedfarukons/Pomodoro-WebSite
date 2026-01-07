'use client';

import { useState, useEffect } from 'react';
import { useAccentColor } from '../providers/ThemeProvider';
import { useUser } from '../contexts/UserContext';

interface UserPreferences {
  pomodoroSettings: {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    longBreakInterval: number;
  };
}

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { accentColor } = useAccentColor();
  const { user } = useUser();

  // Load user preferences
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (user?._id) {
        try {
          const response = await fetch('/api/user/preferences', {
            headers: {
              'Authorization': `Bearer ${user._id}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setUserPreferences(data.preferences);
            // Set initial timer based on user preferences
            setTimeLeft(data.preferences.pomodoroSettings.workDuration * 60);
          }
        } catch (error) {
          console.error('Error loading user preferences:', error);
        }
      }
      setIsLoading(false);
    };

    loadUserPreferences();
  }, [user]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      
      // Play notification sound
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification(isBreak ? 'Çalışma Zamanı!' : 'Mola Zamanı!', {
            body: isBreak ? 'Mola bitti, çalışmaya devam edin!' : 'Çalışma süresi bitti, mola zamanı!',
            icon: '/favicon.ico'
          });
        }
      }

      if (!isBreak) {
        // Work session completed
        setCompletedSessions(prev => prev + 1);
        
        // Check if it's time for a long break
        const shouldTakeLongBreak = (completedSessions + 1) % (userPreferences?.pomodoroSettings.longBreakInterval || 4) === 0;
        const breakDuration = shouldTakeLongBreak 
          ? (userPreferences?.pomodoroSettings.longBreakDuration || 15) 
          : (userPreferences?.pomodoroSettings.shortBreakDuration || 5);
        
        setTimeLeft(breakDuration * 60);
        setIsBreak(true);
      } else {
        // Break completed, start new work session
        setTimeLeft((userPreferences?.pomodoroSettings.workDuration || 25) * 60);
        setIsBreak(false);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak, completedSessions, userPreferences]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft((userPreferences?.pomodoroSettings.workDuration || 25) * 60);
    setIsBreak(false);
    setCompletedSessions(0);
  };

  const skipToNext = () => {
    setIsRunning(false);
    if (isBreak) {
      setTimeLeft((userPreferences?.pomodoroSettings.workDuration || 25) * 60);
      setIsBreak(false);
    } else {
      const shouldTakeLongBreak = (completedSessions + 1) % (userPreferences?.pomodoroSettings.longBreakInterval || 4) === 0;
      const breakDuration = shouldTakeLongBreak 
        ? (userPreferences?.pomodoroSettings.longBreakDuration || 15) 
        : (userPreferences?.pomodoroSettings.shortBreakDuration || 5);
      setTimeLeft(breakDuration * 60);
      setIsBreak(true);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Accent color'a göre renk sınıfları
  const getColorClasses = (color: string) => {
    switch (color) {
      case '#22c55e': // Yeşil
        return {
          text: 'text-green-600 dark:text-green-400',
          button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
          buttonText: 'text-white'
        };
      case '#3b82f6': // Mavi
        return {
          text: 'text-blue-600 dark:text-blue-400',
          button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          buttonText: 'text-white'
        };
      case '#ec4899': // Pembe
        return {
          text: 'text-pink-600 dark:text-pink-400',
          button: 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500',
          buttonText: 'text-white'
        };
      default: // Mor (varsayılan)
        return {
          text: 'text-indigo-600 dark:text-indigo-400',
          button: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
          buttonText: 'text-white'
        };
    }
  };

  const colors = getColorClasses(accentColor);

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-400 mb-8">--:--</div>
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mb-4">
        <span className={`text-sm font-medium ${colors.text}`}>
          {isBreak ? 'Mola' : 'Çalışma'} • {completedSessions} tamamlandı
        </span>
      </div>
      
      <div className={`text-6xl font-bold ${colors.text} mb-8`}>
        {formatTime(timeLeft)}
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={toggleTimer}
          className={`px-8 py-3 ${colors.button} ${colors.buttonText} rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 font-medium`}
        >
          {isRunning ? '⏸️ Duraklat' : '▶️ Başlat'}
        </button>
        <button
          onClick={resetTimer}
          className="px-8 py-3 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          🔄 Sıfırla
        </button>
      </div>
      
      <button
        onClick={skipToNext}
        className="px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
      >
        ⏭️ Sonraki
      </button>
    </div>
  );
} 