"use client"
import { createContext, useState } from "react";

export type SitterContextType = {
    sitterSelected: any;
    setSitterSelected: any;
}

type SitterContextProviderType = {
    children: React.ReactNode
}

export const SitterContext = createContext({} as SitterContextType)

export const SitterContextProvider = ({children}: SitterContextProviderType) => {
    const [sitterSelected, setSitterSelected] = useState<any | null>(null)

    return <SitterContext.Provider value={{sitterSelected, setSitterSelected}}>{children}</SitterContext.Provider>
}