import { checkForCheck, checkForStalemate, lastboard } from "../../../utils/gameLogic";
import { useStateContext } from "../../context";
import Board from "../chessBoard/Board";
import Timer from '../chessBoard/Timer';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ActiveGame.css';

export default function ActiveGame() {

  const { listValidMoves, turn, boardState, lastboard } = useStateContext();

  const notify = () => toast(
    <div>
      Wanna Resign?
      <button className="bg-red-500 text-black rounded mx-8 px-6">YES</button>
    </div>
  );
  const notify1 = () => toast(
    <div>
      DRAW
    </div>
  );


  const Overlayfunction = async () => {
    const Col = (turn) ? ('Black') : ('White');
    // will execute some sockets method here
    if (listValidMoves.length === 0) {
      if (checkForCheck(boardState, lastboard, turn))
        return <Overlay message={`${Col} Won the Game`} st={'Win'} />
      return <Overlay message="The Game Drew" st="Draw" />
    }
    return null;
  }

    return(
      <div className=" bg-slate-900 h-screen">
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className=" gotu-regular text-white text-3xl font-bold">Knight's Quest</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white gotu-regular hover:text-gray-300 text-xl">Home</a>
            <a href="#" className="text-white gotu-regular hover:text-gray-300 text-xl">About</a>
            <a href="#" className="text-white gotu-regular hover:text-gray-300 text-xl">Contact</a>
          </div>
        </div>
      </nav>
      <div className=" sm:flex space-x-10 mt-4 md:mt-10 ml-5 md:ml-8 ">
        {/* left part */}
       <div className="space-y-10">
        {/* Game Info and Player Status */}
       <div className="flex flex-col bg-slate-600 w-96 h-44 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Game Information</h2>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <p className="text-sm">Game Type: Blitz</p>
          </div>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <p className="text-sm">Player 1: Somil <span className="text-green-500">(Available)</span></p>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <p className="text-sm">Player 2: Chetan <span className="text-red-500">(Busy)</span></p>
          </div>
        </div>
         {/*Chat box */}
         <div className="bg-slate-600 w-96 h-96 flex rounded-xl p-4">
          <div className="flex flex-col h-full w-full">
            <h1 className="text-3xl text-center text-white"> Chat Box </h1>
            Chat messages
            <div className="flex-1 overflow-y-auto">
              Sample chat messages
              <div className="bg-gray-100 p-2 rounded-lg mb-2">Hello!</div>
              <div className="bg-gray-100 p-2 rounded-lg mb-2">How are you?</div>
              <div className="bg-gray-100 p-2 rounded-lg mb-2">I'm fine, thank you!</div>
              Add more messages here
            </div>
            Chat input
            <input type="text" placeholder="Type your message..." className="border border-gray-300 rounded-lg p-2" />
          </div>
        </div>
      </div>
      {/* Board */}
        <div>
          <div id="Board" className="flex justify-center items-center "><Board /></div>
        </div>
        {/* Right region */}
      {/* Timers and pieace count */}
        <div className="flex flex-col">
        {/* Timer 1 */}
        <div>
              <Timer seconds={120} />
        </div>
        {/* Pieces */}
        <div className=" bg-slate-400 flex flex-col justify-center mt-40">
          <div className="flex justify-center space-x-4">
          <button><span class="material-symbols-outlined">arrow_back_ios</span></button>
          <button><span class="material-symbols-outlined">skip_next</span></button>
          <button><span class="material-symbols-outlined">skip_previous</span></button>
          <button><span class="material-symbols-outlined">arrow_forward_ios</span></button>
          <button><span class="material-symbols-outlined">menu</span></button>
          </div>
          <div className="bg-slate-200 w-56 h-28 flex justify-center">
            <input></input>
          </div>
        </div>
         {/* draw */}
         <div className="flex space-x-7 mt-5">
            <button onClick={notify} className="bg-gray-300 rounded items-centre text-black w-12 h-10 ">
              <span className="material-symbols-outlined">flag</span>
            </button>
            <button onClick={notify1} className="bg-gray-300 rounded items-centre text-black w-12 h-10">1/2</button>
            <button onClick={notify} className="bg-gray-300 rounded items-centre text-black w-12 h-10 ">
              <span className="material-symbols-outlined">close</span>
            </button>
            <ToastContainer
              position="top-center"
              autoClose={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
              transition={Bounce}
            />
          </div>
          <div className=" mt-5">
              <Timer seconds={30} />
          </div>
        </div>
      </div>
      </div>
      /* <div className="bg-slate-900 ChessBoard h-full flex flex-col items-center"> */
        // {/* Other elements */}
         
      /* absolute bottom-64 right-80 mt-7 */
        /* right region */
        /* <div className="flex">
          <div className="flex flex-col"> */
            /* <div>
              <Timer seconds={120} />
            </div> */
            /* className="absolute top-16 right-48" */
            /* <div>
              <Timer seconds={30} />
            </div> */
          // </div>
          /*<div className="flex absolute items-center space-x-10 right-[15rem] bottom-[13rem]">
            <button onClick={notify} className="bg-gray-300 rounded items-centre text-black w-12 h-10 ">
              <span className="material-symbols-outlined">flag</span>
            </button>
            <button onClick={notify1} className="bg-gray-300 rounded items-centre text-black w-12 h-10">1/2</button>
            <button onClick={notify} className="bg-gray-300 rounded items-centre text-black w-12 h-10 ">
              <span className="material-symbols-outlined">close</span>
            </button>
            <ToastContainer
              position="top-center"
              autoClose={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
              transition={Bounce}
            />
          </div> */
          /* <div className=" bg-slate-400 flex flex-col justify-center absolute pt-3 right-[18rem] bottom-[16rem]">
          
          <div className="flex justify-center space-x-4">
          <button><span class="material-symbols-outlined">arrow_back_ios</span></button>
          <button><span class="material-symbols-outlined">skip_next</span></button>
          <button><span class="material-symbols-outlined">skip_previous</span></button>
          <button><span class="material-symbols-outlined">arrow_forward_ios</span></button>
          <button><span class="material-symbols-outlined">menu</span></button>
          </div>
          <div className="bg-slate-200 w-56 h-28 flex justify-center">
            <input></input>
          </div>
        </div> */
        // </div>

      // </div>
    // </div>

    )
}
// absolute bottom-2 right-40 px-12