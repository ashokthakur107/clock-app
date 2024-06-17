import { useState, useEffect } from 'react';

const CountDownTimer = ({ timerData, onSaveStop }) => {
  const [showstopped, setShowstopped] = useState(true);
  const [stoppedAfter, setStoppedAfter] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if(timerData.activeDuration <= 0){
      const interval = setInterval(async () => {
        if(!showstopped){
          return () => clearInterval(interval);
        }
        const now = new Date().getTime();
        const target = new Date(timerData.endDateTime).getTime();
        const timeDifference = target - now;
        if (timeDifference <= 0) {
          clearInterval(interval);
          setShowstopped(false);
          setCountdown({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
          const res = await onSaveStop(timerData._id);
          if(res){
            setStoppedAfter(1);
          }
        } else {
          setCountdown({
            days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
          });
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }else{
          setCountdown({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
          setShowstopped(false);
    }
    
  }, [timerData, showstopped, onSaveStop]);

  const handleStop = async () => {
    setShowstopped(false);
    const res = await onSaveStop(timerData._id);
    if(res){
      setStoppedAfter(1);
    }
  };

  return (
    <div>
      <div>
        {countdown.days} days, {countdown.hours} hours, {countdown.minutes} minutes, {countdown.seconds} seconds {(timerData.activeDuration > 0) ? `Stopped after ${timerData.activeDuration} seconds` : ''}
        {(!showstopped) ? '   (Timer was stopped)' : ''}
           {(showstopped) ? <button onClick={handleStop}>Stop</button> : null}
      </div>
    </div>
  );
};

export default CountDownTimer;