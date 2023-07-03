"use client"
import { createContext, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";



export type UserContextType = {
    user: any;
    setUser: any;
    verifyAuth: any;
}

type UserContextProviderType = {
    children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({children}: UserContextProviderType) => {
    const router = useRouter()
    const [user, setUser] = useState<any | null>(null)
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

    return <UserContext.Provider value={{user, setUser, verifyAuth}}>{children}</UserContext.Provider>
}