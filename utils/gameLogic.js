// making some grabage changes

const makePiece = (name,color)=>{
    let piece = {
        piece:name,
        color,
        hasMoved:false,
    }
    return piece;
}

let board = [
    [makePiece('Rook',0),makePiece('Knight',0),makePiece('Bishop',0),makePiece('Queen',0),makePiece('King',0),makePiece('Bishop',0),makePiece('Knight',0),makePiece('Rook',0)],
    [makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0)],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1)],
    [makePiece('Rook',1),makePiece('Knight',1),makePiece('Bishop',1),makePiece('Queen',1),makePiece('King',1),makePiece('Bishop',1),makePiece('Knight',1),makePiece('Rook',1)],
]

const validateBoundary = (pos)=>{
    return ((pos[0]>=0 && pos[0]<8 ) && (pos[1]>=0 && pos[1]<8));
}

const isEmpty = (coordinates)=>{
    return Object.keys(board[coordinates[0]][coordinates[1]]).length===0;
}

const UnCheckedMoves = (piece)=>{
    switch(piece.name){
        case 'Pawn':
            return (
                (initialPos)=>{
                    let movesArray = [];
                    let direction = (piece.color)?(1):(-1);
                    // normal move straight
                    if(validateBoundary([initialPos[0]+direction,initialPos[1]]) && isEmpty([initialPos[0]+direction][initialPos[1]])){
                        movesArray.push([initialPos[0]+direction,initialPos[1]]);
                    }
                    // cutting move in diagonal
                    if(validateBoundary([initialPos[0]+direction,initialPos[1]+direction]) && board[initialPos[0]+direction][initialPos[1]+direction].color!==piece.color){
                        movesArray.push([initialPos[0]+direction,initialPos[1]+direction]);
                    }
                    // cutting move in diagonal
                    if(validateBoundary([initialPos[0]+direction,initialPos[1]-direction]) && board[initialPos[0]+direction][initialPos[1]-direction].color!==piece.color){
                        movesArray.push([initialPos[0]+direction,initialPos[1]-direction]);
                    }
                    // double jump move 
                    if(validateBoundary([initialPos[0]+2*direction,initialPos[1]]) && isEmpty([initialPos[0]+2*direction][initialPos[1]]) && (!piece.hasMoved)){
                        movesArray.push([initialPos[0]+2*direction,initialPos[1]]);
                    }
                }
            )
        case 'Bishop':
            return (
                (initialPos)=>{

                }
            )
        case 'Rook':
            return (
                (initialPos)=>{

                }
            )
        case 'Knight':
            return (
                (initialPos)=>{

                }
            )
        case 'King':
            return (
                (initialPos)=>{

                }
            )
        case 'Queen':
            return (
                (initialPos)=>{

                }
            )
    }
}