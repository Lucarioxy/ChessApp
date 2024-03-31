import React , {createContext, useContext, useEffect, useState} from 'react'
import { ListOnlyValidMove, board, makeMove } from '../utils/gameLogic';

const UserContext = createContext();

export const UserProvider = ({children})=>{

    const [color , setColor] = useState(true);
    const [turn,setTurn] = useState(true)
    const [timer,setTimer] = useState(300);
    const [role, setRole] = useState('main');
    const [boardState , setBoardState] = useState(board);
    const [lastBoard,setLastBoard] = useState(board);
    const [pickElement, setPickElement] = useState(0);
    const [dropDestination,setDropDestination] = useState(null);
    const [listValidMoves,setListValidMoves] = useState([]);
    const [dummyStateForDestination,setDummyStateForDestination] = useState(true);
    const [game, setGame] = useState(1);

    useEffect(()=>{
        setListValidMoves(ListOnlyValidMove(boardState,lastBoard,turn));
    },[boardState,turn,lastBoard]);

    useEffect(()=>{
        console.log("Something");
    },[pickElement])

    useEffect(()=>{
        if(dropDestination!==null ){
        let dummyBoard = boardState.map(row => row.map(obj => ({ ...obj })));
        let dummyLastBoard = lastBoard.map(row => row.map(obj => ({ ...obj })));
        let x1, y1, x2, y2;
if (turn) {
    x1 = Math.floor(pickElement / 8);
    y1 = pickElement % 8;
    x2 = Math.floor(dropDestination / 8);
    y2 = dropDestination % 8;
} else {
    x1 = 7 - Math.floor(pickElement / 8);
    y1 = 7 - (pickElement % 8);
    x2 = 7 - Math.floor(dropDestination / 8);
    y2 = 7 - (dropDestination % 8);
}

const temp = makeMove(dummyBoard, dummyLastBoard, [x1, y1, x2, y2], turn);

        console.log(temp,turn,[Math.floor(pickElement/8),pickElement%8,Math.floor(dropDestination/8),dropDestination%8]);
        if(temp){
            setLastBoard(dummyLastBoard);
            setBoardState(dummyBoard);
            setTurn(!turn);
        }
    }
    },[dropDestination,dummyStateForDestination])

    return (
        <UserContext.Provider value={{color,timer,role,setColor,setTimer,setRole,boardState,setBoardState,pickElement,setPickElement,setDropDestination,dropDestination,turn,setTurn,listValidMoves,setListValidMoves,lastBoard,setLastBoard,color,game,setGame,dummyStateForDestination,setDummyStateForDestination}}>
            {children}
        </UserContext.Provider>
    )
}

export const useStateContext = ()=> useContext(UserContext);
