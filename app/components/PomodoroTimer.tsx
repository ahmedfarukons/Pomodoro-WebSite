'use client';

import { useState, useEffect } from 'react';
import { useAccentColor } from '../providers/ThemeProvider';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 dakika
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const { accentColor } = useAccentColor();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!isBreak) {
        setTimeLeft(5 * 60); // 5 dakikalık mola
        setIsBreak(true);
      } else {
        setTimeLeft(25 * 60); // 25 dakikalık çalışma
        setIsBreak(false);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
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

  return (
    <div className="text-center">
      <div className={`text-6xl font-bold ${colors.text} mb-8`}>
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-center space-x-4">
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
    </div>
  );
} 