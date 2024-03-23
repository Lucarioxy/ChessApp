import React from 'react';
//import Board from './Board';
import './App.css';
import Board from './Components/chessBoard/Board';
import Modal from './Components/Pages/Modal';
import GameEnd from './Components/Pages/GameEnd';
import Waiting from './Components/Waiting';
import { useState } from 'react';
import HomePage from './Components/lobbypage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from '../context';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/active-game" element={<Board />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
export default App;