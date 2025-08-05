"use client";
import React, { useState, useEffect, useCallback } from 'react';

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [showSettings, setShowSettings] = useState(false);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setSeconds(0);
    setMinutes(customMinutes);
    setIsBreak(false);
  }, [customMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer bittiğinde
            const audio = new Audio('/notification.mp3');
            audio.play().catch(() => {
              console.log('Ses çalınamadı');
            });

            if (!isBreak) {
              // Pomodoro bitti, mola başlıyor
              setMinutes(5);
              setIsBreak(true);
            } else {
              // Mola bitti, yeni pomodoro başlıyor
              setMinutes(customMinutes);
              setIsBreak(false);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, customMinutes]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleCustomMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setCustomMinutes(value);
      setMinutes(value);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-80 mb-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full border-8 border-purple-100 dark:border-purple-800">
            <div
              className="w-full h-full rounded-full border-8 border-purple-500 transition-all duration-1000"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${((minutes * 60 + seconds) / (customMinutes * 60)) * 100}% 0%, ${((minutes * 60 + seconds) / (customMinutes * 60)) * 100}% 100%, 50% 100%)`,
                transform: 'rotate(90deg)',
              }}
            />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-3">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-lg font-medium text-purple-600 dark:text-purple-400">
              {isBreak ? 'Mola Zamanı' : 'Odaklanma Zamanı'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <button
          onClick={toggleTimer}
          className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {isActive ? 'Duraklat' : 'Başlat'}
        </button>
        <button
          onClick={resetTimer}
          className="px-10 py-4 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 rounded-2xl hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-purple-200 dark:border-purple-700"
        >
          Sıfırla
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-4 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 rounded-2xl hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-purple-200 dark:border-purple-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {showSettings && (
        <div className="mt-8 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border-2 border-purple-100 dark:border-purple-800">
          <label className="block text-lg font-medium text-purple-600 dark:text-purple-400 mb-3">
            Pomodoro Süresi (dakika)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={customMinutes}
            onChange={handleCustomMinutesChange}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 dark:text-white"
          />
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer; 