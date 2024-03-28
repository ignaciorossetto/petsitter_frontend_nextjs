"use client"
import { createContext, useEffect, useRef, useState } from "react";
import socketio from "socket.io-client";
import config from "@/utils/config";
import { IUser } from "@/types/types";



export type UserContextType = {
    user: IUser | null | undefined;
    setUser: any;
    socket: any;
    receiver: any;
    setReceiver: any;
    setAuthJWT:any;
    authJWT:any
}

type UserContextProviderType = {
    children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType)



export const UserContextProvider = ({children}: UserContextProviderType) => {

    const socket = useRef<any>(socketio(`${config.backendUrl}`, {
        withCredentials:true,
        reconnection:false
    }))
    
    const [user, setUser] = useState<IUser | null | undefined>();
    const [authJWT, setAuthJWT] = useState<string | null>(null)
    const [receiver, setReceiver] = useState<any | null>(null)

    useEffect(()=> {
        const storedUser = localStorage.getItem("psf-user");
        const initialUser = storedUser !== 'undefined' && storedUser !== null ? JSON.parse(storedUser) : null;
        setUser(initialUser)
    }, [])

    useEffect(()=> {
        localStorage.setItem("psf-user", JSON.stringify(user))
    }, [user])


    
    return <UserContext.Provider value={{user, setUser, socket, receiver, setReceiver, setAuthJWT, authJWT}}>{children}</UserContext.Provider>
}