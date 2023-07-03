"use client"
import Footer from '@/components/Footer'
import Messenger from '@/components/Messenger'
import NavBar from '@/components/NavBar'
import { UserContext } from '@/hooks/auth/authContext'
import { SitterContext } from '@/hooks/auth/sitterContext'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'

const Chat = (prop:any) => {
    

  return (
    <>
    <NavBar />
    <Messenger />
    <Footer />

    </>
  )
}

export default Chat