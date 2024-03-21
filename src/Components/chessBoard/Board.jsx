import "./Board.css";
import Tile from "./Tile/Tile";
import Timer from './Timer';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const peices = [];
for(let i=0;i<8;i++){
peices.push({ image: "Assets/images/pawn_b.png", x: i, y: 6 });
}

for(let i=0;i<8;i++){
  peices.push({ image: "Assets/images/pawn_w.png", x: i, y: 1 });
}

peices.push({image:"Assets/images/rook_b.png",x:0,y:7})
peices.push({image:"Assets/images/rook_b.png",x:7,y:7})
peices.push({image:"Assets/images/rook_w.png",x:0,y:0})
peices.push({image:"Assets/images/rook_w.png",x:7,y:0})


peices.push({image:"Assets/images/knight_b.png",x:1,y:7})
peices.push({image:"Assets/images/knight_b.png",x:6,y:7})
peices.push({image:"Assets/images/knight_w.png",x:1,y:0})
peices.push({image:"Assets/images/knight_w.png",x:6,y:0})

peices.push({image:"Assets/images/bishop_b.png",x:2,y:7})
peices.push({image:"Assets/images/bishop_b.png",x:5,y:7})
peices.push({image:"Assets/images/bishop_w.png",x:2,y:0})
peices.push({image:"Assets/images/bishop_w.png",x:5,y:0})

peices.push({image:"Assets/images/king_b.png",x:4,y:7})
peices.push({image:"Assets/images/queen_b.png",x:3,y:7})
peices.push({image:"Assets/images/king_w.png",x:4,y:0})
peices.push({image:"Assets/images/queen_w.png",x:3,y:0})


const notify = () => {
  toast.error('Wow so easy!', {
    position: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
}
export default function Board() { 
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
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;

      let image = undefined;
      peices.forEach((p) => {
        if (p.x === i && p.y === j) image = p.image;
      });
      board.push(<Tile image={image} number={number} />);
    }
  }

  return<div className="bg-yellow-500ChesBoard"> 
        <div id="Board" className=" flex absolute pt-6 left-96">{board}</div>
        <div className="absolute top-12 left-16">
          <Timer seconds={30}/>
        </div>
        <div className="absolute bottom-44 right-96">
          <Timer seconds={30}/>
        </div>
        <div className="flex flex-col w-24 space-y-6 absolute bottom-96 right-0">
        <button onClick = {notify} className="bg-red-500 rounded text-black ">RESIGN</button>
        <button onClick = {notify1} className="bg-green-700 rounded text-black ">DRAW</button>
        {/* <button onClick = {notify1} className="bg-yellow-700 rounded text-black ">MENU</button> */}
        
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
        </div>
}
// absolute bottom-2 right-40 px-12