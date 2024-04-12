import Footer from '@/components/Footer'
import Messenger from '@/components/Messenger'
import NavBar from '@/components/NavBar'
import React, { Suspense } from 'react'

const Chat = (prop:any) => {
    

  return (
    <Suspense>
    <NavBar />
    <Messenger type='user'/>
    </Suspense>
  )
}

export default Chat