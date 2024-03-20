import React from "react";
import { X } from 'lucide-react';
import { Play } from 'lucide-react';

function GameEnd({ onClose }) {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-10 flex flex-col gap-5 text-white'>
                <button onClick={onClose} className='place-self-end'><X size={30} /></button>
                <div className='bg-gray-500 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4 '>
                    
                    <div>
                        <div className='text-3xl text-center '>Result!</div>
                        <p className='px-4 py-4 mt-4 rounded border-2 '> Player1 Won/lost the game..</p>
                    </div>
                    <button className='mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded bg-black '> Go Back</button>

                </div>
            </div>
        </div>
    )
}

export default GameEnd;
