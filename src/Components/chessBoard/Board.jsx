import "./Board.css";
import Tile from "./Tile/Tile";
import Timer from './Timer';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const pieces = [];

for (let i = 0; i < 8; i++) {
  pieces.push({ image: "Assets/images/pawn_b.png", x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ image: "Assets/images/pawn_w.png", x: i, y: 1 });
}

pieces.push({ image: "Assets/images/rook_b.png", x: 0, y: 7 });
pieces.push({ image: "Assets/images/rook_b.png", x: 7, y: 7 });
pieces.push({ image: "Assets/images/rook_w.png", x: 0, y: 0 });
pieces.push({ image: "Assets/images/rook_w.png", x: 7, y: 0 });

pieces.push({ image: "Assets/images/knight_b.png", x: 1, y: 7 });
pieces.push({ image: "Assets/images/knight_b.png", x: 6, y: 7 });
pieces.push({ image: "Assets/images/knight_w.png", x: 1, y: 0 });
pieces.push({ image: "Assets/images/knight_w.png", x: 6, y: 0 });

pieces.push({ image: "Assets/images/bishop_b.png", x: 2, y: 7 });
pieces.push({ image: "Assets/images/bishop_b.png", x: 5, y: 7 });
pieces.push({ image: "Assets/images/bishop_w.png", x: 2, y: 0 });
pieces.push({ image: "Assets/images/bishop_w.png", x: 5, y: 0 });

pieces.push({ image: "Assets/images/king_b.png", x: 4, y: 7 });
pieces.push({ image: "Assets/images/queen_b.png", x: 3, y: 7 });
pieces.push({ image: "Assets/images/king_w.png", x: 4, y: 0 });
pieces.push({ image: "Assets/images/queen_w.png", x: 3, y: 0 });

export default function Board() {
  const notifyResign = () => {
    toast(
      <div>
        Wanna Resign?
        <button className="bg-red-500 text-black rounded mx-8 px-6">YES</button>
      </div>
    );
  };

  const notifyDraw = () => {
    toast(<div>DRAW</div>);
  };

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;

      let image = undefined;
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) image = p.image;
      });
      board.push(<Tile image={image} number={number} />);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col bg-slate-700">
      <div className="absolute top-3  ">
        <Timer seconds={30} />
      </div>
      <div id="Board" className="flex mb-40 justify-center items-center">{board}</div>
      <div className="absolute bottom-28">
        <Timer seconds={30} />
      </div>
      <div className="flex space-x-5 absolute bottom-32">
        <button onClick={notifyResign} className="bg-red-500 rounded text-black w-24">
          RESIGN
        </button>
        <button onClick={notifyDraw} className="bg-green-700 rounded text-black w-24">
          DRAW
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
  );
}
