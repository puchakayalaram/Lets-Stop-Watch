import { useState,useRef } from "react" 
import ResultModal from "./ResultModal";


export default function TimerChallenge({title,targetTime}){
    const [timeRemain,setTimeRemain]=useState(targetTime*1000);
    const timer=useRef();
    const dialog=useRef();
    const timerIsActive= timeRemain >0 && timeRemain < targetTime * 1000;

    if(timeRemain<=0){
        clearInterval(timer.current)
        dialog.current.open()
    }
    function handleReset(){
        setTimeRemain(targetTime * 1000)
    }

    function handleStart(){
        timer.current=setInterval(()=>{
            setTimeRemain(prev=>prev-10) 
        },10)
    }
    function handleStop(){
        clearInterval(timer.current)
        dialog.current.open();
    }
    return <section className="challenge">
        <h2>{title}</h2>
        <ResultModal ref={dialog}  targetTime={targetTime} remainingTime={timeRemain} onReset={handleReset}/> 
        <p className="challenge-time">{targetTime} second{targetTime > 1 ? 's':''}</p>
        <p>
            <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop':'Start'} Challenge</button>
        </p>
        <p>
            {timerIsActive ? 'Time is running ...' : 'Timer active'}
        </p>
    </section>
}