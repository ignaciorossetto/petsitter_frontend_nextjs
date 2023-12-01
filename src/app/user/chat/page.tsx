import Footer from '@/components/Footer'
import Messenger from '@/components/Messenger'
import NavBar from '@/components/NavBar'
import React from 'react'

const Chat = (prop:any) => {
    

  return (
    <>
    <NavBar />
    <Messenger type='user'/>
    </>
  )
}

export default Chat