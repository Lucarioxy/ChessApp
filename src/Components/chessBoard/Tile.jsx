import { useStateContext } from '../../context';
import {isEmpty, makeMove } from '../../../utils/gameLogic';
import Pieces from './Pieces';
import { useDrop } from 'react-dnd';
import { ItemsTypes } from '../../../utils/constants';
import TileInner from './TileInner';

export default function Tile({ number ,children}) {
    const { pickElement,listValidMoves , setDropDestination } = useStateContext();

    const onDropping = async ()=>{
        // console.log("The function was triggered");
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

    const onDrop = async()=>{
        // here what happens when we can make moves ?? 
        console.log("It Dropped");
        setDropDestination(number);
    }
    
    
    const [{isOver, canDrop}, drop] = useDrop(() => ({
        accept:'piece',
        drop: (item) =>(onDrop()),
        canDrop:()=>onDropping(),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop:!!monitor.canDrop(),
        })
    }))
    
    return (
        <div 
        ref={drop}
        className='relative w-full h-full'
        >
        <TileInner key={number} number={number}>{children}</TileInner>
        </div>
    )
}
