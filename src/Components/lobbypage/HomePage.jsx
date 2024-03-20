import React, { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Img from './images/ChessIMG.jpg';
import Img2 from './images/knight-logo.jpg';

function HomePage() {
    const [inputValue, setInputValue] = useState("");
    const [show,setShow] = useState(false) 
    const ShowRoom =()=> {
        if(show == true){
            setShow(false)
        }
        else{
            setShow(true)
        }
    }
    return (
        <div className="bg-black flex relative">
            <img src={Img} alt="" className="object-cover h-130 w-240 py-32" />
            <div className="flex flex-col static">
                <h1 className="text-orange-500 my-4 mx-7 text-8xl">Knight's Quest</h1>
                <img src={Img2} className="size-20 absolute right-8 top-8" alt="" />
                <div className="mx-48 my-24 absolute right-32 top-24">
                    <div className="text-white flex flex-col space-y-5 bg-zinc-800 h-96 w-64 justify-center rounded-md">
                        <h1 className="text-white relative left-10 top-0 text-4xl ">Play Chess!</h1>
                        <button className="bg-black rounded-md h-12 w-64">Play Online</button>
                        
                        
                        <button onClick={ShowRoom} className="bg-black rounded-md h-12 w-64">Create Custom Game</button>
                        {show && (<div className='flex flex-col'
                        >
                        <input className='text-black text-center'
                            type="text"
                            placeholder="Copy Room Id from here"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <CopyToClipboard text={inputValue}>
                            <button className='mt-4 mb-4'>Copy</button>
                        </CopyToClipboard>

                        <input className='text-black text-center '
                            type="text"
                            placeholder="Paste Room Id from here"
                            />
                        <button className='mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded bg-purple-400 '> Join With Id</button>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;