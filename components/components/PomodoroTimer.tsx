import React, { useState, useRef, useEffect } from 'react';

const POMODORO_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;
const POMODOROS_UNTIL_LONG_BREAK = 4;

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

const PomodoroTimer: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [autoStart, setAutoStart] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    switch (newMode) {
      case 'pomodoro':
        setSecondsLeft(POMODORO_MINUTES * 60);
        break;
      case 'shortBreak':
        setSecondsLeft(SHORT_BREAK_MINUTES * 60);
        break;
      case 'longBreak':
        setSecondsLeft(LONG_BREAK_MINUTES * 60);
        break;
    }
  };

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsRunning(false);
          
          if (audioRef.current) {
            audioRef.current.play();
          }

          if (mode === 'pomodoro') {
            setCompletedPomodoros(prev => {
              const newCount = prev + 1;
              if (newCount % POMODOROS_UNTIL_LONG_BREAK === 0) {
                if (autoStart) switchMode('longBreak');
                return newCount;
              }
              if (autoStart) switchMode('shortBreak');
              return newCount;
            });
          } else {
            if (autoStart) switchMode('pomodoro');
          }
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    switchMode(mode);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl font-mono text-gray-800 dark:text-gray-100 mb-4">
        {formatTime(secondsLeft)}
      </div>
      
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => switchMode('pomodoro')}
          className={`px-4 py-2 rounded-lg transition ${
            mode === 'pomodoro' 
              ? 'bg-amber-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Pomodoro
        </button>
        <button 
          onClick={() => switchMode('shortBreak')}
          className={`px-4 py-2 rounded-lg transition ${
            mode === 'shortBreak' 
              ? 'bg-amber-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Kısa Mola
        </button>
        <button 
          onClick={() => switchMode('longBreak')}
          className={`px-4 py-2 rounded-lg transition ${
            mode === 'longBreak' 
              ? 'bg-amber-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          Uzun Mola
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        {isRunning ? (
          <button onClick={pauseTimer} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Duraklat</button>
        ) : (
          <button onClick={startTimer} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">Başlat</button>
        )}
        <button onClick={resetTimer} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition">Sıfırla</button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="autoStart"
          checked={autoStart}
          onChange={(e) => setAutoStart(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="autoStart" className="text-gray-800 dark:text-gray-200">
          Otomatik başlat
        </label>
      </div>

      <div className="text-gray-800 dark:text-gray-200">
        Tamamlanan Pomodoro: {completedPomodoros}
      </div>
    </div>
  );
};

export default PomodoroTimer; 