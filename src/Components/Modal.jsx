import React from "react";
import { X } from 'lucide-react';
import { Play } from 'lucide-react';

function Modal({ onClose }) {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-10 flex flex-col gap-5 text-white'>
                <button onClick={onClose} className='place-self-end'><X size={30} /></button>
                <div className='bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4 '>
                    <h1 className='text-3xl font-extrabold'> Create Custom Game </h1>
                    <p className='text-xl font-bold text-center'> select Colour</p>
                    <div className='container'>
                        <input type='radio' name='size' id='small' checked='checked' />
                        <label htmlFor='small' style={{ marginLeft: '10px' }}>White</label>
                        <input type='radio' name='size' id='large' style={{ marginLeft: '20px' }} />
                        <label htmlFor='large'>Black</label>
                    </div>
                    <h2 className='text-xl font-bold text-center'> Select Game time</h2>
                    <div className='container2'>
                        <input type='radio' name='time' id='five' />
                        <label htmlFor='five' style={{ marginLeft: '10px' }}>5 mins</label>
                        <input type='radio' name='time' id='ten' style={{ marginLeft: '20px' }} />
                        <label htmlFor='ten'>10 mins</label>
                        <input type='radio' name='time' id='fifteen' style={{ marginLeft: '20px' }} />
                        <label htmlFor='fifteen'>15 mins</label>
                    </div>
                    <button className='mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded bg-black '><Play /> Start Game</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;
