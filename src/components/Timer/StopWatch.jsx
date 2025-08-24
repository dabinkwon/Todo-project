import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../utils/formatTime";

export const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const timeRef = useRef(null);

  const handleReset = () => {
    setTime(0);
    setIsOn(false);
  };

  const handleStartToggle = () => {
    setIsOn(true);
  };
  const handleStopToggle = () => {
    setIsOn(false);
  };

  useEffect(() => {
    if (isOn) {
      timeRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timeRef.current);
    }
    return () => clearInterval(timeRef.current);
  }, [isOn]);

  return (
    <div className="flex justify-center items-center gap-2">
      {formatTime(time)}
      <button 
      className="p-2.5 min-w-[100px] bg-lime-100 shadow-sm shadow-offset-x-4 shadow-offset-y-2 shadow-spread-2 rounded-2xl font-bold"
      onClick={handleStartToggle}>START</button>
      <button
      className="p-2.5 min-w-[100px] bg-lime-100 shadow-sm shadow-offset-x-4 shadow-offset-y-2 shadow-spread-2 rounded-2xl font-bold"
      onClick={handleStopToggle}>STOP</button>
      <button 
      className = "p-2.5 min-w-[100px] bg-lime-100 shadow-sm shadow-offset-x-4 shadow-offset-y-2 shadow-spread-2 rounded-2xl font-bold"
      onClick={handleReset}>RESET</button>
    </div>
  );
};
