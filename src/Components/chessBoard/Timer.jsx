import {useEffect , useRef , useState} from 'react';
const formatTimer = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time - minutes*60)
    if(minutes <  10) minutes = '0' + minutes;
    if(seconds < 10) seconds = '0' + seconds;
    return minutes + ':' + seconds
}
export default function CountDown({seconds}){
  const[countdown , setCountdown] = useState(seconds);
  let timerId = useRef();
  useEffect(() => {
    handleTime();
    return() => clearInterval(timerId.current)
  } , [])
  function handleTime() {
    timerId.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
    } , 1000);
  }
  useEffect(() => {
    if(countdown == 0){
        clearInterval(timerId.current)
        setCountdown(seconds)
    }
  } , [countdown])
  return(
    <div className='absolute'>
        <div className= 'absolute items-cente bg-amber-700 pt-5  place-items-center rounded-md w-84 px-3 py-3'>
        <div className= "text-8xl bg-amber-500 px-1 rounded">{formatTimer(countdown)}</div>
        <div className= 'flex relative pt-2 px-3 space-x-2'>
        <button className =  "bg-amber-300 hover:bg-yellow-500 text-orange-900 rounded py-1 px-3" onClick = {() => handleTime()}>Start</button>
        <button className = "bg-amber-300 hover:bg-yellow-500 text-orange-900 rounded px-3" onClick={() => clearInterval(timerId.current)}>Pause</button>  
        <button className = "bg-amber-300 hover:bg-yellow-500 text-orange-900 rounded px-3" onClick={() => {
            clearInterval(timerId.current);
            setCountdown(seconds);
        }}>Restart</button>
        </div>
    </div>
    </div>
  )
}
