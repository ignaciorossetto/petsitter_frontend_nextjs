"use client"
import { createContext, useRef, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";
import socketio from "socket.io-client";





export type UserContextType = {
    user: any;
    setUser: any;
    verifyAuth: any;
    socket: any;
    receiver: any;
    setReceiver: any;
}

type UserContextProviderType = {
    children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType)



export const UserContextProvider = ({children}: UserContextProviderType) => {
    const socket = useRef<any>(socketio(`http://localhost:5000`, {
        withCredentials:true,
        reconnection:false
    }))
    const router = useRouter()
    const [user, setUser] = useState<any | null>(null)
    const [receiver, setReceiver] = useState<any | null>(null)
    const verifyAuth = async() => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/checkauth`, {withCredentials: true})
                return true
            } catch (error) {
                setUser(null)
                document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
                router.push('/error?code=1')
                return false
            }
        } 
    
    return <UserContext.Provider value={{user, setUser, verifyAuth, socket, receiver, setReceiver}}>{children}</UserContext.Provider>
}