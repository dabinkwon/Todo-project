import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../utils/formatTime";

export const Timer = () => {
  const [startTime, setStartTime] = useState(0);
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const timeRef = useRef(null);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
    setTime(time ? time : startTime);
    setStartTime(0);
  };
  const handleReset = () => {
    setTime(0);
    setIsOn(false);
  };

  useEffect(() => {
    if (isOn && time > 0) {
      timeRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (!isOn || time === 0) {
      clearInterval(timeRef.current);
    }
    return () => clearInterval(timeRef.current);
  }, [isOn, time]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        max={3600}
        step={30}
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      {time ? formatTime(time) : formatTime(startTime)}
      <button
        className="p-2.5 min-w-[100px] bg-lime-100 shadow-sm shadow-offset-x-4 shadow-offset-y-2 shadow-spread-2 rounded-2xl font-bold cursor-pointer"
        onClick={handleToggle}
      >
        {isOn ? "OFF" : "ON"}
      </button>
      <button
        className="p-2.5 min-w-[100px] bg-lime-100 shadow-sm shadow-offset-x-4 shadow-offset-y-2 shadow-spread-2 rounded-2xl font-bold cursor-pointer"
        onClick={handleReset}
      >
        RESET
      </button>
    </div>
  );
};
