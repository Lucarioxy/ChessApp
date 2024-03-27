import React from 'react';
//import Board from './Board';
import './App.css';
import HomePage from './Components/lobbypage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context';
import ActiveGame from './Components/Pages/ActiveGame';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/active-game" element={<ActiveGame/>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
export default App;