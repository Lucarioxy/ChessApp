import React, { useEffect, useState } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import { useStateContext } from '../../context'

function Pieces({ piece, number }) {

  const { setPickElement } = useStateContext();

  const startDrag = () => {
    setPickElement(number);
  }

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'piece',
    item: ()=>{
      startDrag();
      return { id: piece.id, type: 'piece'};
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const dropResult = monitor.getDropResult();
        console.log('Drop result:', dropResult);
      } else {
        // Drop was not handled
        console.log('Drop was not handled');
      }
    }
  }));
  
  return (
    <>
      <DragPreviewImage key={new Date().getTime()} connect={preview} src={piece.previewimg} />
      <div ref={drag} className='h-full w-full cursor-move'>
        <img src={piece.image} className={`opacity-${(isDragging) ? ('50') : ('100')}`} />
      </div>
    </>
  )
}

export default Pieces
