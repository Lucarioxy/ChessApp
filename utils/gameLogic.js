// we will make a different function for checking for the castling move 
// import readline from 'readline';

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // Function to take array input
// function takeArrayInput() {
//     return new Promise((resolve, reject) => {
//         rl.question('Enter array elements separated by spaces (or type "done" to exit): ', (input) => {
//             if (input.toLowerCase() === 'done') {
//                 rl.close();
//             } else {
//                 const array = input.split(' ').map(Number);
//                 resolve(array);
//             }
//         });
//     });
// }

export const deepEqual = (obj1, obj2)=> {
    if (obj1 === obj2) return true;
    if (typeof obj1 != "object" || typeof obj2 != "object" || obj1 == null || obj2 == null) return false;
    
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}

export const makePiece = (name,color)=>{
    let piece = {
        piece:name,
        color,
        hasMoved:false,
        image:`Assets/images/${name.toLowerCase()}_${(color)?('w'):('b')}.png`
    }
    return piece;
}

let turn = 1;
let gameState = 0;

export let board = [
    [makePiece('Rook',0),makePiece('Knight',0),makePiece('Bishop',0),makePiece('Queen',0),makePiece('King',0),makePiece('Bishop',0),makePiece('Knight',0),makePiece('Rook',0)],
    [makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0)],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1)],
    [makePiece('Rook',1),makePiece('Knight',1),makePiece('Bishop',1),makePiece('Queen',1),makePiece('King',1),makePiece('Bishop',1),makePiece('Knight',1),makePiece('Rook',1)],
]

export let lastboard = [
    [makePiece('Rook',0),makePiece('Knight',0),makePiece('Bishop',0),makePiece('Queen',0),makePiece('King',0),makePiece('Bishop',0),makePiece('Knight',0),makePiece('Rook',0)],
    [makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0)],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1)],
    [makePiece('Rook',1),makePiece('Knight',1),makePiece('Bishop',1),makePiece('Queen',1),makePiece('King',1),makePiece('Bishop',1),makePiece('Knight',1),makePiece('Rook',1)],
]

export const printChessboard = (board) => {
    let temp = '\t';
    for(let i=0;i<8;i++)
        temp += `${i}\t\t`;
    console.log(temp);
    
    for (let i = 0; i < board.length; i++) {
        let row = `${i}\t`;
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].piece) {
                row += `${board[i][j].piece} (${board[i][j].color})\t`;
            } else {
                row += "Empty\t\t";
            }
        }
        console.log(row);
    }
}

export const printArray = (array)=>{
    array.forEach((a)=>{
        console.log(a);
    })
}

export const validateBoundary = (pos)=>{
    return ((pos[0]>=0 && pos[0]<8 ) && (pos[1]>=0 && pos[1]<8));
}

export const isEmpty = (board,coordinates)=> (Object.keys(board[coordinates[0]][coordinates[1]]).length===0);

// 0 is error 
// 1 is enpassant 
// 2 is promotion (keeping queenn promotion as default)
// 3 is castle 
// 4 normal moves

export const detectTypeOfMove = (board,lastboard,move,color)=>{
    if(isEmpty(board,[move[0],move[1]]))
        return 0;
    let direction = (color)?(-1):(1);
    if(board[move[0]][move[1]].piece==='Pawn' && Math.abs(move[1]-move[3])===1 && Math.abs(move[0]-move[2])===1){
        if(isEmpty(board,[move[2],move[3]]) && !isEmpty(board,[move[0],move[3]]) && board[move[0]][move[3]].piece==='Pawn' && isEmpty(lastboard,[move[0],move[3]]) && validateBoundary([move[0]+direction*2,move[3]]) && !isEmpty(lastboard,[move[0] + direction*2,move[3]]) && lastboard[move[0]+2*direction][move[3]].piece==='Pawn')
        return 1;
    }
    let lastRow = (color)?(0):(7);
    if(board[move[0]][move[1]].piece == 'Pawn' && move[2]==lastRow)
        return 2;
    if(board[move[0]][move[1]].piece === 'King' && move[0]==move[2] &&  Math.abs(move[1]-move[3])==2)
        return 3;
        
    return 4;
}

export const makeMoveWithoutValidation = (board,lastboard,move,color)=>{    
    let type = detectTypeOfMove(board,lastboard,move,color);
    switch(type){
        case 0:{
            console.log("Errorrr try again");
            break;
        };
        case 1:{
            board[move[2]][move[3]] = board[move[0]][move[1]];
            board[move[0]][move[1]] = {};
            board[move[0]][move[3]] = {};
            board[move[2]][move[3]].hasMoved = true;
            break;
        }
        case 2:{
            board[move[0]][move[1]] = {};
            board[move[2]][move[2]] = {piece:'Queen',color,hasMoved:false};
            board[move[2]][move[3]].hasMoved = true;
            break;
        }
        case 3:{
            let rookPos = (move[1]-move[3] > 0)?(0):(7);
            let direct  = (rookPos)?(-1):(1);
            board[move[2]][move[3]] = board[move[0]][move[1]];
            board[move[2]][move[3]+direct] = board[move[2]][rookPos];
            board[move[0]][move[1]] = {};
            board[move[2]][rookPos] = {};
            board[move[2]][move[3]].hasMoved = true;
            board[move[2]][move[3]+direct].hasMoved = true;
            break;
        }
        default:{
            lastboard  = board.map(row => row.map(obj => ({ ...obj })));
            board[move[2]][move[3]] = board[move[0]][move[1]];
            board[move[0]][move[1]] = {};
            board[move[2]][move[3]].hasMoved = true;
            break;
        }
    }
}

export const makeMove = (board , lastboard, move,color)=>{
    const moveList = ListOnlyValidMove(board,lastboard,color);
    for(let i =0;i<moveList.length;i++){
        let flag = true;
        for(let j = 0;j<4;j++)
            if(moveList[i][j] != move[j])
                flag = false;
        if(flag){
            makeMoveWithoutValidation(board,lastboard,move,color);
            return true;
        }
    }
    return false;
}

export const checkforEnpassant = (board,lastboard,color)=>{
    
    let changeInBoard = new Array(4).fill(null);
    for(let i = 0;i<8;i++){
        for(let j=0;j<8;j++){
            if(!deepEqual(board[i][j],lastboard[i][j])){
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

    if(board[changeInBoard[2]][changeInBoard[3]].piece !== 'Pawn' || board[changeInBoard[2]][changeInBoard[3]].color==color || changeInBoard[1]!==changeInBoard[3] || (Math.abs(changeInBoard[0]-changeInBoard[2]) !== 2)) return [];
    let toReturnArray = [];
    let direction = (color)?(-1):(1);
    [-1,1].forEach((dx)=>{
        if(validateBoundary([changeInBoard[2]+direction,changeInBoard[3]+dx]) && board[changeInBoard[2]][changeInBoard[3]+dx].piece==='Pawn' && board[changeInBoard[2]][changeInBoard[3]+dx].color==color)
            toReturnArray.push([changeInBoard[2],changeInBoard[3]+dx,changeInBoard[2]+direction,changeInBoard[3]]);
    })
    return toReturnArray;
}

export const UnCheckedMoves = (piece)=>{
    switch(piece.piece){
        case 'Pawn':
            return (
                (initialPos,board,lastboard)=>{
                    
                    let movesArray = [];
                    let direction = (piece.color)?(-1):(1);
                    // normal move straight
                    if(validateBoundary([initialPos[0]+direction,initialPos[1]]) && isEmpty(board,[initialPos[0]+direction,initialPos[1]])){
                        movesArray.push([...initialPos,initialPos[0]+direction,initialPos[1]]);
                        if(validateBoundary([initialPos[0]+2*direction,initialPos[1]]) && isEmpty(board,[initialPos[0]+2*direction,initialPos[1]]) && (!board[initialPos[0]][initialPos[1]].hasMoved)){
                            movesArray.push([...initialPos,initialPos[0]+2*direction,initialPos[1]]);
                        }
                    }
                    // cutting move in diagonal
                    if(validateBoundary([initialPos[0]+direction,initialPos[1]+direction]) && !isEmpty(board,[initialPos[0]+direction,initialPos[1]+direction]) && board[initialPos[0]+direction][initialPos[1]+direction].color!==board[initialPos[0]][initialPos[1]].color){
                        movesArray.push([...initialPos,initialPos[0]+direction,initialPos[1]+direction]);
                    }
                    // cutting move in diagonal
                    if(validateBoundary([initialPos[0]+direction,initialPos[1]-direction]) && !isEmpty(board,[initialPos[0]+direction,initialPos[1]-direction]) && board[initialPos[0]+direction][initialPos[1]-direction].color!==board[initialPos[0]][initialPos[1]].color){
                        movesArray.push([...initialPos,initialPos[0]+direction,initialPos[1]-direction]);
                    }

                    checkforEnpassant(board,lastboard,board[initialPos[0]][initialPos[1]].color).forEach((move)=>{
                        if(move[0]===initialPos[0] && move[1]===initialPos[1])
                            movesArray.push(move);
                    });
                    return movesArray;
                }
            )
        case 'Bishop':
            return (
                (initialPos,board,lastboard)=>{ 
                    let movesArray = [];
                    let direction = [-1,1,1,-1,-1];
                    for(let j=0;j<4;j++){
                        for(let i=1;i<8;i++){
                            if(validateBoundary([initialPos[0] + direction[j]*i,initialPos[1] + direction[j+1]*i]) && isEmpty(board,[initialPos[0]+direction[j]*i,initialPos[1] + direction[j+1]*i]))
                                movesArray.push([...initialPos,initialPos[0] + direction[j]*i,initialPos[1] + direction[j+1]*i]);
                            else if(validateBoundary([initialPos[0]+direction[j]*i,initialPos[1]+direction[j+1]*i]) && !isEmpty(board,[initialPos[0]+direction[j]*i,initialPos[1] + direction[j+1]*i])){
                                if(board[initialPos[0]][initialPos[1]].color != board[initialPos[0]+direction[j]*i][initialPos[1]+direction[j+1]*i].color){
                                    movesArray.push([...initialPos,initialPos[0]+direction[j]*i,initialPos[1]+direction[j+1]*i])
                                }
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
                (initialPos,board,lastboard)=>{
                    
                    let movesArray = [];
                    let direction = [1,0,0,1,-1,0,0,-1];
                    for(let j=0;j<4;j++){
                        for(let i=1;i<8;i++){
                            if(validateBoundary([initialPos[0]+direction[2*j]*i,initialPos[1]+direction[2*j+1]*i]) && isEmpty(board,[initialPos[0]+direction[2*j]*i,initialPos[1]+direction[2*j+1]*i]))
                                movesArray.push([...initialPos,initialPos[0]+direction[2*j]*i,initialPos[1]+direction[2*j+1]*i]);
                            else if(validateBoundary([initialPos[0]+direction[2*j]*i,initialPos[1]+direction[2*j+1]*i]) && !isEmpty(board,[initialPos[0]+direction[2*j]*i,initialPos[1] + direction[2*j+1]*i])){
                                if(board[initialPos[0]][initialPos[1]].color != board[initialPos[0] + direction[2*j]*i][initialPos[1]+direction[2*j+1]*i].color){
                                    movesArray.push([...initialPos,initialPos[0]+direction[2*j]*i,initialPos[1]+direction[2*j+1]*i]);
                                }
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
                (initialPos,board,lastboard)=>{
                    
                    let movesArray = [];
                    let direction = [-1,1,1,-1,-1];
                    let jumps = [2,1,2];
                    for(let j = 0;j<4;j++){
                        for(let i = 0;i<2;i++){
                            if(validateBoundary([initialPos[0] + direction[j]*jumps[i],initialPos[1] + direction[j+1]*jumps[i+1]]) && (board[initialPos[0]+direction[j]*jumps[i]][initialPos[1] + direction[j+1]*jumps[i+1]].color!=board[initialPos[0]][initialPos[1]].color))
                                movesArray.push([...initialPos,initialPos[0] + direction[j]*jumps[i],initialPos[1] + direction[j+1]*jumps[i+1]]);
                        }
                    }
                    return movesArray
                }
            )
        case 'King':
            return (
                (initialPos,board,lastboard)=>{
                    let movesArray = [];
                    let direction = [1,0,-1,0,0,1,0,-1,1,1,-1,-1,1,-1,-1,1];
                    for (let j=0;j<8;j++){
                        if(validateBoundary([initialPos[0]+direction[2*j],initialPos[1]+direction[2*j+1]]) && (board[initialPos[0]+direction[2*j]][initialPos[1]+direction[2*j+1]].color !== board[initialPos[0]][initialPos[1]].color))
                            movesArray.push([...initialPos,initialPos[0]+direction[2*j],initialPos[1]+direction[2*j+1]])
                    }
                    return movesArray;
                }
            )
        case 'Queen':
            return (
                (initialPos,board,lastboard)=>{
                    
                    let movesArray = UnCheckedMoves({hasMoved:true,color:piece.color,piece:'Bishop'})(initialPos,board,lastboard);
                    movesArray = movesArray.concat(UnCheckedMoves({piece:'Rook',color:piece.color,hasMoved:true})(initialPos,board,lastboard));
                    return movesArray
                }
            )
    }
}

export const findAllUnvalidated = (board,lastboard,color)=>{
    let moveArray = [];
    for(let i = 0;i<8;i++){
        for(let j=0;j<8;j++){
            if(!isEmpty(board,[i,j]) && board[i][j].color == color)
                moveArray = moveArray.concat(UnCheckedMoves(board[i][j])([i,j],board,lastboard));
        }
    }
    return moveArray;
}

export const checkForCheck = (board,lastboard,color)=>{
    // suppose that we need to check for the check on the white king then.
    // find the position of white king first;
    let kingPos = [];
    for(let i = 0;i<8;i++)
        for(let j = 0;j<8;j++)
            if(!isEmpty(board,[i,j]) && board[i][j].color == color && board[i][j].piece === 'King')
                kingPos = [i,j];
    // we will find out the all the unvalidated moves of the other color piece if any one of then is pointing to king thhhen its a check 
    if(kingPos.length === 0)
        console.log("The king wasn't found");

    let moveArray = findAllUnvalidated(board,lastboard,!color);
    // now compare between the postion of king and the list to check 
    let flag = false;
    moveArray.forEach((item)=>{
        if(item[2]===kingPos[0] && item[3]===kingPos[1])
            flag = true;
    })
    return flag;
}

export const checkForCastle = (board,lastboard,color)=>{
    let row = (color)?(7):(0);
    let returnArray = [];
    if(isEmpty(board,[row,4]) || board[row][4].hasMoved)
        return returnArray;

    let arrayToCheck = findAllUnvalidated(board,lastboard,!color).filter((movePos)=> movePos[2]===row);
    let dummyArray = new Array(8).fill(0);
    arrayToCheck.forEach((move)=>{dummyArray[move[3]]=1});

    let i = 1;
    [0,7].forEach((value)=>{
        let flag = true;
        if(!isEmpty(board,[row,value]) && !board[row][value].hasMoved){
            for(i;i<((value)?(7):(5));i++){
                if(dummyArray[i]){
                    flag = false; 
                }
                else if(!isEmpty(board,[row,i]) && !(board[row][i].piece=='King' && board[row][i].color==color))
                    flag = false;
            }
            if(flag)
                returnArray.push((value==0)?(1):(2));
        }
        i = 4;
    })
    return returnArray;
} 

export const funcValidateMove = (board,lastboard,move,color)=>{
    let dummyBoard =  board.map(row => row.map(obj => ({ ...obj })));
    let dummyLastBoard =  lastboard.map(row => row.map(obj => ({ ...obj })));
    makeMoveWithoutValidation(dummyBoard,dummyLastBoard,move,color);
    if(checkForCheck(dummyBoard,dummyLastBoard,color))
        return false;
    return true;
}

export const ListOnlyValidMove = (board,lastboard,color)=>{ 
    const GoodMoves = findAllUnvalidated(board,lastboard,color).filter((moves)=> funcValidateMove(board,lastboard,moves,color));
    const castleArray = checkForCastle(board,lastboard,color);
    const kingPos = (color)?([7,4]):([0,4]);
    if(castleArray.indexOf(1) !== -1)
        GoodMoves.push([...kingPos,kingPos[0],kingPos[1]-2]);
    if(castleArray.indexOf(2) !== -1)
        GoodMoves.push([...kingPos,kingPos[0],kingPos[1]+2]);
    return GoodMoves;
};

export const checkForStalemate = (board,lastboard,color)=>(ListOnlyValidMove(board,lastboard,color).length===0);

export const restartGame = ()=>{
    board = [
        [makePiece('Rook',0),makePiece('Knight',0),makePiece('Bishop',0),makePiece('Queen',0),makePiece('King',0),makePiece('Bishop',0),makePiece('Knight',0),makePiece('Rook',0)],
        [makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0),makePiece('Pawn',0)],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1),makePiece('Pawn',1)],
        [makePiece('Rook',1),makePiece('Knight',1),makePiece('Bishop',1),makePiece('Queen',1),makePiece('King',1),makePiece('Bishop',1),makePiece('Knight',1),makePiece('Rook',1)],
    ]
    
    turn = 1;
    gameState = 1;
}

// have to implement a similar logic in the front end using event listeners
// here completing the function for verification purpose 
// const GameLogic = async ()=>{
//     restartGame();
//     let flag = true;
//     while(flag){
//         printChessboard(board);
//         console.log("Turn is ",turn);
//         console.log("Printing all the validating moves");
//         printArray(ListOnlyValidMove(board,lastboard,turn));
//         const arrays = await takeArrayInput();
//         let dummyLastBoard = board.map(row => row.map(obj => ({ ...obj })));
//         let verify  = makeMove(board,lastboard,arrays,turn);
//         if(verify){
//             turn = !turn;
//             lastboard = dummyLastBoard;
//             console.log("Verified");
//         }
//         else
//             console.log("Some error occured");
//         flag = !checkForStalemate(board,lastboard,turn);
//         if(!flag){
//             if(checkForCheck(board,turn))
//                 console.log(`The Player ${!turn} Won`);
//             else
//                 console.log("Draww");
//         }
//     }
//     printChessboard(board);
//     console.log("Its Over")
    
// }

// GameLogic();