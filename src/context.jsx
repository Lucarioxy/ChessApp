import React , {createContext, useContext, useEffect, useState} from 'react'
import { ListOnlyValidMove, board } from '../utils/gameLogic';

const UserContext = createContext();

export const UserProvider = ({children})=>{

    const [color , setColor] = useState('white');
    const [turn,setTurn] = useState(1)
    const [timer,setTimer] = useState(300);
    const [role, setRole] = useState('main');
    const [boardState , setBoardState] = useState(board);
    const [lastBoard,setLastBoard] = useState(board);
    const [pickElement, setPickElement] = useState(0);
    const [dropDestination,SetDropDestination] = useState(0);
    const [listValidMoves,setListValidMoves] = useState([]);

    useEffect(()=>{
        setListValidMoves(ListOnlyValidMove(boardState,lastBoard,turn));
    },[board]);

    return (
        <UserContext.Provider value={{color,timer,role,setColor,setTimer,setRole,boardState,setBoardState,pickElement,setPickElement,SetDropDestination,dropDestination,turn,setTurn,listValidMoves,setListValidMoves}}>
            {children}
        </UserContext.Provider>
    )
}

export const useStateContext = ()=> useContext(UserContext);
