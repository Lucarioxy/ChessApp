import React from "react";
import { X } from 'lucide-react';
import { Play } from 'lucide-react';

function Waiting({ onClose }) {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-10 flex flex-col gap-5 text-white'>
                <button onClick={onClose} className='place-self-end'><X size={30} /></button>
                <div className='bg-gray-500 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4 '>
                    
                   <div className='text-center text-3xl'> Message From the Server !</div>
                   <p className='text-xl'>
                        Waiting for the Other Person to configure... 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Waiting;
