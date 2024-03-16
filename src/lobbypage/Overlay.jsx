import { Fragment } from "react";
export function Overlay({isOpen , onClose}) {
    isOpen = true;
  return (
    <>
    {isOpen &&
    <div className=" absolute top-60 right-1/2 bg-slate-500 h-44 w-44 flex flex-col justify-center  items-center ...">
    <div>Custom Game</div>
    <div>Select Your Time</div>
    <div>Create Game</div>
    <button onClick={onClose} className= "bg-slate-800">Heyy</button>
    </div>
}
    </>)
}
export default Overlay;