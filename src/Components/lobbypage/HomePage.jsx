import React, { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Img from './images/ChessIMG.jpg';
import Img2 from './images/knight-logo.jpg';
import { useStateContext } from "../../context";

function HomePage() {
    const [inputValue, setInputValue] = useState("");
    const [show, setShow] = useState(false);

    const ShowRoom = () => {
        setShow(!show);
    }

    const generateRoomKey = () => {
        // Logic to generate room key goes here
        const roomKey = "GeneratedRoomKey"; // Example room key, replace with actual generation logic
        setInputValue(roomKey);
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
                        <button className="bg-violet-800 rounded-md h-12 mx-8 w-48 text-xl hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">Play Online</button>

                        <button onClick={ShowRoom} className="bg-violet-800 rounded-md h-12 mx-8 w-48 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">Create Custom Game</button>
                        {show && (
                            <div className='flex flex-col px-2'>
                                <div className="flex items-center">
                                    <input className='text-black text-center w-36 flex'
                                        type="text"
                                        placeholder="Copy Room Id"
                                        value={inputValue}
                                        onChange={e => setInputValue(e.target.value)}

                                    />
                                    <CopyToClipboard text={inputValue}>
                                        <button className='ml-2  py-2 '>Copy</button>
                                    </CopyToClipboard>
                                    <div className=" mb-2">
                                    <button className="mt-2 px-4 py-2  " onClick={generateRoomKey}>Key</button>

                                    </div>

                                </div>
                                
                                <div className="flex items-center mt-2">
                                    <input className='text-black text-center w-48 flex'
                                        type="text"
                                        placeholder="Paste Room Id from here"
                                    />
                                </div>
                                <div className="px-12 mt-2">
                                <button className='ml-2 px-4 py-2 bg-violet-800 rounded-md h-12 mx-8 w-36 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 '>Join Game</button>

                                </div>

                                {/* Generate Room Key Button */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
