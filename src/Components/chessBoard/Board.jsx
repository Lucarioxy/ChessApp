import Tile from './Tile.jsx'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useStateContext } from '../../context.jsx';
import { isEmpty } from '../../../utils/gameLogic.js';
import Pieces from './Pieces.jsx';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Board() {

  const { boardState, turn } = useStateContext();

  let board = new Array(8);
  for (let j = 0; j < verticalAxis.length; j++) {
      for (let i = 0; i < horizontalAxis.length; i++) {
          let number;
          if (turn % 2 === 0) {
              number = 63 - (8 * j + i);
          } else {
              number = 8 * j + i;
          }
          const isemp = isEmpty(boardState, [j, i]);
          board[number] = (
              <div key={number} className='w-full h-full'>
                  <Tile key={number} number={number}>
                      {isemp ? null : <Pieces key={number} piece={boardState[j][i]} number={number} />}
                  </Tile>
              </div>
          );
      }
  }
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='grid grid-cols-8'>
        {board}
      </div>
    </DndProvider>
  )
}
