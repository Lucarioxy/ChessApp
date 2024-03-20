import "./Board.css";
import Tile from "./Tile/Tile";
import Timer from './Timer';
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



export default function Board() { 
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

  return<div>
        <div id="Board" className="absolute px-96 h-52">{board}</div>
        <div className = "absolute px-16 pt-96">
          <Timer seconds={30}/> 
        </div>
        </div>
}
