import React, { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import socket from "../../../utils/socket";
import Img from './images/ChessIMG.jpg'; // original
import Img2 from './images/knight-logo.jpg';
import { useStateContext } from "../../context";
import Img3 from './images/chess_image.jpg';
import Img4 from './images/chess_image2.jpg';
import Img5 from './images/chess_image4.webp';
import Img6 from './images/chess_image5.jpg';
import './HomePage.css';
function HomePage() {
    const [inputValue, setInputValue] = useState("");
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameSubmitted, setUsernameSubmitted] = useState(false);
    const [createGame, setCreateGame] = useState(false);
    const [roomKey, setRoomKey] = useState('');
    const [roomInput, setRoomInput] = useState('');
    const ShowRoom = () => {
        setShow(!show);
    }

    // Handle username submission
    const handleUsernameSubmit = () => {
        if (!username) return; 
        socket.emit("username", username); 
        
        setUsernameSubmitted(true);
    }

    const handleJoinRoom = () => {
        if (!roomInput) return; 
        socket.emit("joinRoom", { roomId: roomInput }, (r) => {
            // r is the response from the server
            if (r.error) {
                setRoomError(r.message); 
                return;
            }
            console.log("response:", r);
            // setRoom(r?.roomId); // set room to the room ID
            // setPlayers(r?.players); // set players array to the array of players in the room
            // setOrientation("black"); // set orientation as black
            // setRoomDialogOpen(false); // close dialog
        });
    }
    //'https://media.geeksforgeeks.org/wp-content/uploads/rk.png'
    return (
        <div  className ="bg-hero-pattern bg-cover bg-center min-h-screen flex flex-col justify-center">
           {/* <img src={Img6} alt="" className=""/> */}
           <h1 className=" text-white text-8xl flex justify-center gotu-regular">Knight's Quest</h1>
            <div className="flex justify-center items-center">
                <div className="flex justify-center">
                    <div className="text-white flex flex-col space-y-5 bg-zinc-900 bg-opacity-75 h-96 w-64 justify-center rounded-md">
                        <h1 className="text-white flex justify-center text-4xl ">Play Chess!</h1>
                        <button className="bg-gray-600 rounded-md h-12 mx-8 w-48 text-xl hover:bg-gray-500 
                        active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-800">Play Online</button>
                        <button onClick={() => {
                            setShow(true);
                            setCreateGame(true);
                        }} className="bg-gray-800 rounded-md h-12 mx-8 w-48 hover:bg-gray-600
                         active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-600 ">Create Custom Game</button>
                        
                        {show && (
                            <div className='flex flex-col px-2'>
                                 {!usernameSubmitted && (
                                    <div className="flex items-center">
                                        <input
                                            className='text-black text-center w-36 flex'
                                            type="text"
                                            placeholder="Enter your username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)} 
                                        />
                                        <button onClick={handleUsernameSubmit} className="ml-2 py-2">Submit</button>
                                    </div>
                                 )}
                                 {usernameSubmitted && createGame && (
                                    <button 
                                        onClick={() => {
                                            // Emit createRoom event to the server
                                            socket.emit("createRoom", (r) => {
                                                console.log(r);
        
                                               //setRoom(r); // Set the received room key
                                                
                                            });
                                        }} 
                                        className='ml-2 px-4 py-2 bg-violet-800 rounded-md h-12 mx-8 w-36 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 '
                                    >
                                        Create room
                                    </button>
                                 )}
                                 {usernameSubmitted && (
                                    <div>
                                        <input
                                            className='text-black text-center w-48 flex mt-2'
                                            type="text"
                                            placeholder="Enter room key"
                                            value={roomInput} 
                                            onChange={(e) => setRoomInput(e.target.value)} 
                                        />
                                        <button onClick={handleJoinRoom} className='ml-2 px-4 py-2 bg-violet-800 rounded-md h-12 mx-8 w-36 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 '>Join Game</button>
                                    </div>
                                )}
                             </div>
                         )}
                    </div>
                 </div> 
            </div> 
        </div>
    );
}

export default HomePage;
