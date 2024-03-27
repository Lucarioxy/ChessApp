import Tile from './Tile.jsx'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Board() {

  let board = new Array(8);
  for (let j = 0; j < verticalAxis.length; j++) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = 8 * j + i;
      board[number] = (<Tile key={number} number={number} />);
    }
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='grid grid-cols-8 '>
        {board}
      </div>
    </DndProvider>
  )
}