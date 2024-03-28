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
    const [game, setGame] = useState(1);

    useEffect(()=>{
        setListValidMoves(ListOnlyValidMove(boardState,lastBoard,turn));
    },[boardState,turn,lastBoard]);

    useEffect(()=>{
        console.log("Something");
    },[pickElement])

    useEffect(()=>{
        if(dropDestination!==null){
        let dummyBoard = boardState.map(row => row.map(obj => ({ ...obj })));
        let dummyLastBoard = lastBoard.map(row => row.map(obj => ({ ...obj })));
        const temp = makeMove(dummyBoard,dummyLastBoard,[Math.floor(pickElement/8),pickElement%8,Math.floor(dropDestination/8),dropDestination%8],turn);
        console.log(temp,turn,[Math.floor(pickElement/8),pickElement%8,Math.floor(dropDestination/8),dropDestination%8]);
        if(temp){
            setLastBoard(dummyLastBoard);
            setBoardState(dummyBoard);
            setTurn(!turn);
        }
    }
    },[dropDestination])

    return (
        <UserContext.Provider value={{color,timer,role,setColor,setTimer,setRole,boardState,setBoardState,pickElement,setPickElement,setDropDestination,dropDestination,turn,setTurn,listValidMoves,setListValidMoves,lastBoard,setLastBoard,color,game,setGame}}>
            {children}
        </UserContext.Provider>
    )
}

export const useStateContext = ()=> useContext(UserContext);
