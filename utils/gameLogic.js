// we will make a different function for checking for the castling move 

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

let lastboard = [
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
    return ((pos[0]>=0 
        
        && pos[0]<8 ) && (pos[1]>=0 && pos[1]<8));
}

const isEmpty = (board,coordinates)=>{
    return Object.keys(board[coordinates[0]][coordinates[1]]).length===0;
}

// 0 is error 
// 1 is enpassant 
// 2 is promotion (keeping queenn promotion as default)
// 3 is castle 
// 4 normal moves

const detectTypeOfMove = (board,lastboard,move,color)=>{
   
    // first check if the piece to m
    if(isEmpty(board,[move[0],move[1]]))
        return 0;
    
    let direction = (color)?(-1):(1);
    if(board[move[0]][move[1]].piece==='Pawn' && abs(move[1]-move[3])===1 && abs(move[0]-move[2])===1){
        if(isEmpty(board,[move[2],move[3]] && !isEmpty(board,[move[0],move[3]] && board[move[0]][move[3]].piece==='Pawn' && isEmpty(lastboard,[move[0],move[3]] && validateBoundary([move[0]+direction*2,move[3]]) && !isEmpty(lastboard,[move[0] + direction*2,move[3]]) && lastboard[move[0]+2*direction][move[3]].piece==='Pawn'))))
            return 1;
    }

    let lastRow = (color)?(7):(0);
    if(board[move[0]][move[1]].piece === 'Pawn' && move[2]===lastRow)
        return 2;

    if(board[move[0]][move[1]].piece === 'King' && move[0]===move[2] &&  abs(move[1]-move[3])==2)
        return 3;
    
    return 4;
}

const makeMoveWithoutValidation = (board,lastboard,move,color)=>{
    let type = detectTypeOfMove(board,lastboard,move,color);
    
    switch(type){
        case 0:{
            console.log("The position is empty");
            break;
        };
        case 1:{
            lastboard = board;
            board[move[2]][move[3]] = board[move[0]][move[1]];
            board[move[0]][move[1]] = {};
            board[move[0]][move[3]] = {};
            board[move[2]][move[3]].hasMoved = true;
        }
        case 2:{
            lastboard = board;
            board[move[0]][move[1]] = {};
            board[move[2]][move[2]] = {piece:'Queen',color,hasMoved:false};
            board[move[2]][move[3]].hasMoved = true;
        }
        case 3:{
            lastboard = board;
            let rookPos = (move[1]-move[3] > 0)?(0):(7);
            board[move[2]][move[3]] = board[move[0]][move[1]];
            board[move[2]][(Math.floor((move[1]+move[3])/2))] = board[move[2]][rookPos];
            board[move[2]][move[3]] = {};
            board[move[2]][(Math.floor((move[1]+move[3])/2))] = {};
            board[move[2]][move[3]].hasMoved = true;
            board[move[2]][(Math.floor((move[1]+move[3])/2))],hasMoved = true;
        }
        default:{
            lastboard  = board;
            board[move[2]][move[3]] = board[move[2]][move[3]];
            board[move[0]][move[1]] = {};
            board[move[2]][move[3]].hasMoved = true;
        }
    }
}

const makeMove = (board , lastboard, move,color)=>{
    const moveList = ListOnlyValidMove(board,color);
    // now check our move in the list 
    for(let i =0;i<moveList.length;i++){
        let flag = true;
        for(let j = 0;j<4;j++)
            if(moveList[i][j] !== move[j])
                flag = false;
        if(flag){
            makeMoveWithoutValidation(board,lastboard,move,color);
            retrun ;
        }
    }
}

const checkforEnpassant = (board,lastboard,color)=>{
    let changeInBoard = new Array(4,null);
    for(let i = 0;i<8;i++){
        for(let j=0;j<8;j++){
            if(board[i][j] !== lastboard[i][j]){
                if(isEmpty(board,[i,j])){
                    changeInBoard[0] = i;
                    changeInBoard[1] = j;
                }
                else{
                    changeInBoard[2] = i;
                    changeInBoard[3] = j;
                }
            }
        }
    }

    for(let i=0;i<4;i++) if(changeInBoard[i]===null) return [];
    if(board[changeInBoard[2]][changeInBoard[3]].piece !== 'Pawn' || board[changeInBoard[0]][changeInBoard[1]].color===color || changeInBoard[1]!==changeInBoard[3] || (abs(changeInBoard[0]-changeInBoard[1] !== 2))) return [];

    let toReturnArray = []; 
    let direction = (color)?(1):(-1);
    [-1,1].forEach((dx)=>{
        if(validateBoundary([changeInBoard[2]+direction,changeInBoard[3]+dx]) && board[changeInBoard[2]][changeInBoard[3]+dx].piece==='Pawn' && board[changeInBoard[2]][changeInBoard[3]+dx].color===color)
            toReturnArray.push([changeInBoard[2],changeInBoard[3]+dx,changeInBoard[2]+direction,changeInBoard[3]]);
    })
}

const UnCheckedMoves = (piece)=>{
    switch(piece.name){
        case 'Pawn':
            return (
                (initialPos)=>{
                    let movesArray = [];
                    let direction = (piece.color)?(1):(-1);
                    // normal move straight
                    if(validateBoundary([initialPos[0]+direction,initialPos[1]]) && isEmpty(board,[initialPos[0]+direction,initialPos[1]])){
                        movesArray.push([...initialPos,initialPos[0]+direction,initialPos[1]]);
                    }
                    // cutting move in diagonal
                    if(validateBoundary([initialPos[0]+direction,initialPos[1]+direction]) && board[initialPos[0]+direction,initialPos[1]+direction].color!==piece.color){
                        movesArray.push([...initialPos,initialPos[0]+direction,initialPos[1]+direction]);
                    }
                    // cutting move in diagonal
                    if(validateBoundary([initialPos[0]+direction,initialPos[1]-direction]) && board[initialPos[0]+direction,initialPos[1]-direction].color!==piece.color){
                        movesArray.push([...initialPos,initialPos[0]+direction,initialPos[1]-direction]);
                    }
                    // double jump move 
                    if(validateBoundary([initialPos[0]+2*direction,initialPos[1]]) && isEmpty(board,[initialPos[0]+2*direction,initialPos[1]]) && (!piece.hasMoved)){
                        movesArray.push([...initialPos,initialPos[0]+2*direction,initialPos[1]]);
                    }

                    // handling en-passant is left 
                    checkforEnpassant(board,lastboard,piece.color).forEach((move)=>{
                        if(move[0]===initialPos[0] && move[1]===initialPos[1])
                            movesArray.push(move);
                    });

                    // pawn Promotion is left

                    return movesArray;
                }
            )
        case 'Bishop':
            return (
                (initialPos)=>{ 
                    let movesArray = [];
                    let direction = [-1,1,1,-1,-1];
                    for(let j = 0;j<4;j++){
                        for(let i = 1;i<8;i++){
                            if(validateBoundary([initialPos[0] + direction[j]*i,initialPos[1] + direction[j+1]*i]) && isEmpty(board,[initialPos[0]+direction[j]*i,initialPos[1] + direction[j+1]*i]))
                                movesArray.push([...initialPos,initialPos[0] + direction[j]*i,initialPos[1] + direction[j+1]*i]);
                            else if(validateBoundary([initialPos[0]+direction[j]*i,initialPos[1]+direction[j+1]*i])){
                                if(piece.color !== board[initialPos[0]+direction[j]*i][initialPos[1]+direction[j+1]*i].color)
                                    movesArray.push([...initialPos,initialPos[0]+direction[j]*i,initialPos[1]+direction[j+1]*i])
                                break;
                            }
                            else{
                                break;
                            }
                        }
                    }
                    return movesArray;
                }
            )
        case 'Rook':
            return (
                (initialPos)=>{
                    let movesArray = [];
                    let direction = [1,0,0,1,-1,0,0,-1];
                    for(let j=0;j<4;j++){
                        for(let i=1;i<8;i++){
                            if(validateBoundary([initialPos[0]+direction[2*j]*i,initialPos[1]+direction[2*j+1]*i]) && isEmpty(board,[initialPos[0]+direction[2*j]*i,initialPos[1]+direction[2*j+1]*i]))
                                movesArray.push([...initialPos,initialPos[0]+direction[2*j]*i,initialPos[1]+direction[2*j+1]*i]);
                            else if(validateBoundary[[initialPos[0]+direction[2*j]*i,initialPos[1]+direction[2*j+1]*i]]){
                                if(piece.color !== board[initialPos[0] + direction[2*j]*i][initialPos[1]+direction[2*j+1]*i].color)
                                    movesArray.push([...initialPos,initialPos[0]+direction[2*j]*i,initialPos[1]+direction[2*j+1]*i]);
                                break;  
                            }
                            else
                                break;
                        }
                    }
                    return movesArray;
                }
            )
        case 'Knight':
            return (
                (initialPos)=>{
                    let movesArray = [];
                    let direction = [-1,1,1,-1,-1];
                    let jumps = [2,1,2];
                    for(let j = 0;j<4;j++){
                        for(let i = 0;i<2;i++){
                            if(validateBoundary([initialPos[0] + direction[j]*jumps[i],initialPos[1] + direction[j+1]*jumps[i+1]]) && (board[initialPos[0]+direction[j]*jumps[i]][initialPos[1] + direction[j+1]*jumps[i+1]].color!==piece.color))
                                movesArray.push([...initialPos,initialPos[0] + direction[j]*jumps[i],initialPos[1] + direction[j+1]*jumps[i+1]]);
                        }
                    }
                    return movesArray
                }
            )
        case 'King':
            return (
                (initialPos)=>{
                    let movesArray = [];
                    let direction = [1,0,-1,0,0,1,0,-1,1,1,-1,-1,1,-1,-1,1];
                    for (let j=0;j<8;j++){
                        if(validateBoundary([initialPos[0]+direction[2*j],initialPos[1]+direction[2*j+1]]) && (board[initialPos[0]+direction[2*j]][initialPos[1]+direction[2*j+1]].color !== piece.color))
                            movesArray.push([...initialPos,initialPos[0]+direction[2*j],initialPos[1]+direction[2*j+1]])
                    }
                    // castling is yet to be done
                    return movesArray;
                }
            )
        case 'Queen':
            return (
                (initialPos)=>{
                    let movesArray = UnCheckedMoves({hasMoved:true,color:piece.color,piece:'Bishop'})(initialPos);
                    movesArray = movesArray.concat(UnCheckedMoves({piece:'Rook',color:piece.color,hasMoved:true})(initialPos));
                    return movesArray
                }
            )
    }
}

const findAllUnvalidated = (board,color)=>{
    let moveArray = [];
    for(let i = 0;i<8;i++){
        for(let j=0;j<8;j++){
            if(board[i][j].color === color)
                moveArray.concat(UnCheckedMoves[board[i][j].piece]([i,j]));
        }
    }
    return moveArray;
}

const checkForCheck = (board,color)=>{
    // suppose that we need to check for the check on the white king then.
    // find the position of white king first;
    let kingPos = [];
    for(let i = 0;i<8;i++)
        for(let j = 0;j<8;j++)
            if(board[i][j].color === color)
                kingPos = [i,j];
    // we will find out the all the unvalidated moves of the other color piece if any one of then is pointing to king thhhen its a check 
    if(kingPos.length === 0)
        console.log("King found");

    let moveArray = findAllUnvalidated(board,!color);
    // now compare between the postion of king and the list to check 

    let flag = false;
    moveArray.forEach((item)=>{
        if(item[2]===kingPos[0] && item[3]===kingPos[1])
            flag = true;
    })
    return flag;
}

const checkForCastle = (board,color)=>{
    let row = (color)?(7):(0);
    // let kingCompare = {piece:'King',color,hasMoved:false}; 
    let returnArray = [];
    if(board[row][4].hasMoved)
        return returnArray;

    let arrayToCheck = findAllUnvalidated(board,!color).filter((movePos)=> movePos[0]===row);
    let dummyArray = new Array(8,0);
    arrayToCheck.forEach((move)=>{dummyArray[move[3]]=1});

    let i = 1;
    [0,7].forEach((value)=>{
        if(!isEmpty(board,[row,value]) && !board[row][value].hasMoved){
            let flag = true;
            for(i;i<(value)?(5):(8);i++)
                if(dummyArray[i] || (!isEmpty(board,[row,i]) && (board[row][i].piece!=='King' || board[row][i].color!==color)))
                    flag = false;
            if(flag)
                returnArray.push((value==0)?(1):(2));
        }
        i = 4;
    })
    return returnArray;
} 

const funcValidateMove = (board,move,color)=>{
    let dummyBoard = board;
    makeMove(dummyBoard,lastboard,move);
    if(checkForCheck(board,color))
        return false;
    return true;
}

const ListOnlyValidMove = (board,color)=> findAllUnvalidated(board,color).filter((moves)=>{
    makeMoveWithoutValidation(board,lastboard,moves,color);
    return checkForCheck(board,color)
})

