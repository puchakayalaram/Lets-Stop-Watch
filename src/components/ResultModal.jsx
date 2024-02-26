import { forwardRef,useImperativeHandle,useRef} from "react";
import {createPortal} from 'react-dom'

const ResultModal=forwardRef(function ResultModal({targetTime,remainingTime,onReset},ref){
    const userlost= remainingTime <=0;
    const formatRemainingTime =(remainingTime/1000).toFixed(2);
    const score=Math.round((1-remainingTime/(targetTime*1000))*100);
    const dialog=useRef();
    useImperativeHandle(ref,()=>{
        return{
            open(){
                dialog.current.showModal();  //by default <dialog> will be invisible to make it vvisible we need to add "open" in dialog tag
                               // but by making open in dialog it causes the background blur disable .so we are using showmodal function
            }
        }
    })
   return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
        <h2>{userlost ?'You Lost' : `Your Score ${score}`}</h2>
        <p>
            The Target Time was <strong>{targetTime} second{targetTime >1 ? 's':''}</strong>
        </p>
        <p>
            You stopped the Timer with <strong>{formatRemainingTime} second{formatRemainingTime > 1 ? 's':''} Left</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>,
    document.getElementById('modal')
   );
})
export default ResultModal;