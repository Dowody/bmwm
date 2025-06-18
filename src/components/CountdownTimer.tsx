import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center space-x-4">
      <div className="countdown-item w-16 h-16 flex flex-col items-center justify-center rounded-lg text-white">
        <span className="text-xl font-bold">{timeLeft.days}</span>
        <span className="text-xs uppercase">Days</span>
      </div>
      <div className="countdown-item w-16 h-16 flex flex-col items-center justify-center rounded-lg text-white">
        <span className="text-xl font-bold">{timeLeft.hours}</span>
        <span className="text-xs uppercase">Hours</span>
      </div>
      <div className="countdown-item w-16 h-16 flex flex-col items-center justify-center rounded-lg text-white">
        <span className="text-xl font-bold">{timeLeft.minutes}</span>
        <span className="text-xs uppercase">Mins</span>
      </div>
      <div className="countdown-item w-16 h-16 flex flex-col items-center justify-center rounded-lg text-white">
        <span className="text-xl font-bold">{timeLeft.seconds}</span>
        <span className="text-xs uppercase">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
