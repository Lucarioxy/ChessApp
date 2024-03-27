import React, { useState } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import { useStateContext } from '../../context'
import { ItemsTypes } from '../../../utils/constants';

function Pieces({ piece, number }) {

  const { setPickElement } = useStateContext();

  const startDrag = () => {
    setPickElement(number);
  }

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemsTypes.KNIGHT,
    item: () => {
      startDrag();
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))


  return (
    <>
      <DragPreviewImage key={new Date().getTime()} connect={preview} src={piece.previewimg} />
      <div className='h-full w-full cursor-move'>
        <img ref={drag} src={piece.image} className={`opacity-${(isDragging) ? ('50') : ('100')}`} />
      </div>
    </>
  )
}

export default Pieces
