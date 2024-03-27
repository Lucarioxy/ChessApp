import React from 'react'
import './TileInner.css'

function TileInner({number,children}) {
  return (
      <div className={`tile ${((Math.floor(number/8)%2) === (number%8)%2)?('white'):('black')}-tile`}>
            {children}
        </div>
  )
}

export default TileInner
