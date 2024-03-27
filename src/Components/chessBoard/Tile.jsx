import { useStateContext } from '../../context';
import {isEmpty } from '../../../utils/gameLogic';
import Pieces from './Pieces';
import { useDrop } from 'react-dnd';
import { ItemsTypes } from '../../../utils/constants';
import TileInner from './TileInner';

export default function Tile({ number }) {
    const { boardState ,pickElement,listValidMoves} = useStateContext();

    const onDropping = ()=>{
        console.log("The function was triggered");
        const y = Math.floor(number/8);
        const x = number%8;
        const fromy = Math.floor(pickElement/8);
        const fromx = pickElement%8;
        const temp = [fromy,fromx,y,x];

        listValidMoves.forEach(element => {
            let tem = true;
            for(let a=0;a<4;a++)
                if(element[a] !== temp[a])
                    tem = false;
            if(tem)
                return true;
        });
        return false;
    }

    const onDrop = ()=>{
        console.log('sro');
    }
    
    
    const [{isOver, canDrop}, drop] = useDrop(() => ({
        accept: ItemsTypes.KNIGHT,
        drop: (item) =>(onDrop()),
        canDrop:()=>onDropping(),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }),[number])
    
    return (
        <div 
        ref={drop}
        className='relative w-full h-full'
        >
        <TileInner number={number}>{(!isEmpty(boardState,[Math.floor(number/8),number%8])) && <Pieces piece={boardState[Math.floor(number/8)][number%8]} number={number}/>}</TileInner>
        </div>
    )
}
