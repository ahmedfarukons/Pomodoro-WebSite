import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  deadline: Date;
  isCompleted: boolean;
}

const Timer: React.FC<TimerProps> = ({ deadline, isCompleted }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  
  const [isLate, setIsLate] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = deadline.getTime() - new Date().getTime();
      const isLate = difference < 0;
      
      const total = Math.abs(difference);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((total % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds, total });
      setIsLate(isLate);
    };
    
    if (isCompleted) {
      return;
    }
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [deadline, isCompleted]);
  
  if (isCompleted) {
    return (
      <div className="flex items-center gap-1 text-gray-500 text-sm">
        <Clock className="h-4 w-4" />
        <span>{isLate ? "Geç Tamamlandı" : "Zamanında Tamamlandı"}</span>
      </div>
    );
  }
  
  const getTimerClasses = () => {
    if (isLate) {
      return "text-red-600";
    }
    
    if (timeLeft.total < 1000 * 60 * 60) { // less than 1 hour
      return "text-red-600 animate-pulse";
    }
    
    if (timeLeft.total < 1000 * 60 * 60 * 24) { // less than 1 day
      return "text-orange-600";
    }
    
    return "text-green-600";
  };
  
  return (
    <div className={`flex items-center gap-1 text-sm ${getTimerClasses()}`}>
      <Clock className="h-4 w-4" />
      {isLate ? (
        <span>
          {timeLeft.days > 0 && `${timeLeft.days}g `}
          {timeLeft.hours > 0 && `${timeLeft.hours}s `}
          {timeLeft.minutes > 0 && `${timeLeft.minutes}d `}
          {timeLeft.seconds}sn geçti
        </span>
      ) : (
        <span>
          {timeLeft.days > 0 && `${timeLeft.days}g `}
          {timeLeft.hours > 0 && `${timeLeft.hours}s `}
          {timeLeft.minutes > 0 && `${timeLeft.minutes}d `}
          {timeLeft.seconds}sn kaldı
        </span>
      )}
    </div>
  );
};

export default Timer;