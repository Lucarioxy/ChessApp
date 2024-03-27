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
    <>
    {/* {(Overlayfunction()) && Overlayfunction()} */}
      <div className="bg-slate-900 ChesBoard">
        <div id="Board" className="flex justify-center pt-16"><Board /></div>
        <div>
        <div className="flex flex-col absolute top-96 right-80">
        <div className="absolute bottom-64 right-32 ">
          <Timer seconds={120} />
        </div>
        <div className="absolute top-16 right-32">
          <Timer seconds={30} />
        </div>
        </div>
        <div className="flex absolute items-centre space-x-10 right-56 bottom-72 ">
          <button onClick={notify} className="bg-slate-500 rounded items-centre text-black "><span class="material-symbols-outlined">
          flag
          </span></button>
          <button onClick={notify1} className="bg-slate-500 rounded items-centre text-black ">1/2</button>
          <button onClick={notify} className="bg-slate-500 rounded items-centre text-black "><span class="material-symbols-outlined">
           close
          </span>   
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
        </div>
        
      </div>
    </>
    )
}
// absolute bottom-2 right-40 px-12