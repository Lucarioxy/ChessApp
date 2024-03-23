import React , {createContext, useContext, useState} from 'react'

const UserContext = createContext();

export const UserProvider = ({children})=>{

    const [color , setColor] = useState();
    const [timer,setTimer] = useState();
    const [role, setRole] = useState();

    return (
        <UserContext.Provider value={{color,timer,role,setColor,setTimer,setRole}}>
            {children}
        </UserContext.Provider>
    )
}

export const useStateContext = ()=> useContext(UserContext);
