import React from 'react';
//import Board from './Board';
import './App.css';
import Board from './Components/chessBoard/Board';
import Modal from './Components/Pages/Modal';
import GameEnd from './Components/Pages/GameEnd';
import Waiting from './Components/Waiting';
import { useState } from 'react';
import HomePage from './Components/lobbypage/HomePage';

import { UserProvider } from '../context';

function App() {
    const [showModal,setShowModal] = useState(false)
    return(
      // <div className="h-screen flex flex-col items-center gap-6 bg-[#14161b]">
      //   <h1 className="text-5xl font-bold mt-4 text-white"> Dummy Page</h1>
      //   <button onClick={()=>setShowModal(true)} className="bg-violet-500 px-4 py-2 rounded-lg text-lg"> Create Game</button>
      // {showModal && <Waiting onClose={()=> setShowModal(false)}/>}
      // </div>
      <HomePage/>
    );
}
export default App;