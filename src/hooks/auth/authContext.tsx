"use client"
import { Dispatch, createContext, useEffect, useRef, useState } from "react";
import socketio from "socket.io-client";
import config from "@/utils/config";
import { ICareOrder, ICareOrderModel, ISitter, IUser } from "@/types/types";



export type UserContextType = {
    user: IUser | null;
    setUser: Dispatch<IUser | null>;
    // socket: any;
    sitter: ISitter | null 
    setSitter: Dispatch<ISitter | null>
    receiver: any;
    setReceiver: any;
    setAuthJWT:any;
    authJWT: any;
    careOrder: ICareOrderModel;
    setCareOrder: Dispatch<ICareOrderModel>
}


const CARE_ORDER_INITIAL_STATE = {
    dates: [],
    pets: []
}


type UserContextProviderType = {
    children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType)



export const UserContextProvider = ({children}: UserContextProviderType) => {

    // const socket = useRef<any>(socketio(`${config.backendUrl}`, {
    //     withCredentials:true,
    //     reconnection:false
    // }))
    
    const [user, setUser] = useState<IUser |null>(null);
    const [sitter, setSitter] = useState<ISitter |null>(null);
    const [careOrder, setCareOrder] = useState<ICareOrderModel>(CARE_ORDER_INITIAL_STATE)
    const [authJWT, setAuthJWT] = useState<string | null>(null)
    const [receiver, setReceiver] = useState<any | null>(null)

    useEffect(()=> {
        const storedUser = localStorage.getItem("psf-user");
        const initialUser:IUser | null = storedUser !== 'undefined' && storedUser !== null ? JSON.parse(storedUser) : null;
        setUser(initialUser)
    }, [])

    useEffect(()=> {
        localStorage.setItem("psf-user", JSON.stringify(user))
    }, [user])


     
    
    return <UserContext.Provider value={{
        user,
        setUser,
        // socket,
        sitter,
        setSitter,
        receiver,
        setReceiver,
        setAuthJWT,
        authJWT,
        careOrder,
        setCareOrder
    }}>{children}</UserContext.Provider>
}