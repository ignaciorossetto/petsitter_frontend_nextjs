"use client"
import { createContext, useEffect, useRef, useState } from "react";
import socketio from "socket.io-client";
import config from "@/utils/config";



export type AdminContextType = {
    admin: any;
    setAdmin: any;
    // socket: any;
    receiver: any;
    setReceiver: any;
    setAuthJWT:any;
    authJWT:any
}

type AdminContextProviderType = {
    children: React.ReactNode
}

export const AdminContext = createContext({} as AdminContextType)



export const AdminContextProvider = ({children}: AdminContextProviderType) => {

    // const socket = useRef<any>(socketio(`${config.backendUrl}`, {
    //     withCredentials:true,
    //     reconnection:false
    // }))
    
    const [admin, setAdmin] = useState();
    const [authJWT, setAuthJWT] = useState<string | null>(null)
    const [receiver, setReceiver] = useState<any | null>(null)

    useEffect(()=> {
        const storedAdmin = localStorage.getItem("psf-admin");
        const initialAdmin = storedAdmin !== 'undefined' && storedAdmin !== null ? JSON.parse(storedAdmin) : null;
        setAdmin(initialAdmin)
    }, [])

    useEffect(()=> {
        localStorage.setItem("psf-admin", JSON.stringify(admin))
    }, [admin])


    
    return <AdminContext.Provider value={{admin, setAdmin, receiver, setReceiver, setAuthJWT, authJWT}}>{children}</AdminContext.Provider>
}