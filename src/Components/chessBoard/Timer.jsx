import { useEffect, useRef, useState } from 'react';

const formatTimer = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  return minutes + ':' + seconds;
};

export default function CountDown({ seconds }) {
  const [countdown, setCountdown] = useState(seconds);
  const timerId = useRef();

  useEffect(() => {
    handleTime();
    return () => clearInterval(timerId.current);
  }, []);

  function handleTime() {
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  }

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(timerId.current);
      setCountdown(seconds);
    }
  }, [countdown]);

  return (
    <div className='absolute'>
      <div className='absolute items-center bg-blend-multiply bg-slate-600 py-8 place-items-center rounded-md w-56 h-32 px-3 '>
        <div className='text-5xl bg-stone-300 flex justify-center px-2 rounded'>{formatTimer(countdown)}</div> {/* Adjust font size here */}
        <div className='flex justify-center relative pt-2  space-x-2'>
          <button className="bg-gray-200 hover:bg-yellow-500 text-orange-900 rounded py-1 px-2 text-xs" onClick={() => handleTime()}>Start</button> {/* Adjust font size here */}
          <button className="bg-gray-200 hover:bg-yellow-500 text-orange-900 rounded px-2 text-xs" onClick={() => clearInterval(timerId.current)}>Pause</button> {/* Adjust font size here */}
          <button className="bg-gray-200 hover:bg-yellow-500 text-orange-900 rounded px-2 text-xs" onClick={() => {
            clearInterval(timerId.current);
            setCountdown(seconds);
          }}>Restart</button> {/* Adjust font size here */}
        </div>
      </div>
    </div>
  );
}