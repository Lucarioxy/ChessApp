import Board from "../chessBoard/Board";
import Timer from '../chessBoard/Timer';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ActiveGame() { 
//   const notify = () => toast(
//    <div>
//     Wanna Resign?
//     <button className="bg-red-500 text-black rounded mx-8 px-6">YES</button>
//    </div>
//   );
//   const notify1 = () => toast(
//     <div>
//      DRAW
//     </div>
//    );
  
  return<div className="bg-yellow-500ChesBoard"> 
        <div id="Board" className=" flex justify-center"><Board/></div>
        {/* <div className="absolute top-12 left-16">
          <Timer seconds={30}/>
        </div>
        <div className="absolute bottom-44 right-60">
          <Timer seconds={30}/>
        </div>
        <div className="flex flex-col w-24 space-y-6 absolute bottom-96 right-0">
        <button onClick = {notify} className="bg-red-500 rounded text-black ">RESIGN</button>
        <button onClick = {notify1} className="bg-green-700 rounded text-black ">DRAW</button>
         */}
        <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        transition =  {Bounce}
        />
        </div>
        // </div>
}
// absolute bottom-2 right-40 px-12