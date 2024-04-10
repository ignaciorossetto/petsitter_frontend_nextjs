"use client"
import { UserContext } from '@/hooks/auth/authContext'
import React, { SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
// import socketio from "socket.io-client";


const Sitters = () => {
  const searchParams = useSearchParams();
  const { setUser} = useContext(UserContext) 
  const [msg, setMsg] = useState('') 
  // const socket = useRef<any>()
  // Reginald Lebsack
  const [sitterId, setSitterId] = useState<any>()
  const [ownerId, setOwnerId] = useState<any>()
  const [messages, setMessages] = useState<any>([])
  const [input, setInput] = useState('')

    const handleSendBtn = () => {
      const obj = {
        senderId: sitterId,
        otherUserId: ownerId,
        message: input
    }
    const socketObj = {
      senderId: sitterId,
      otherUserId: ownerId,
      message: input
  }
        // socket.current.emit('sendMessage', socketObj)
        setMessages([...messages, input])
        setInput('')
    }

  // useEffect(()=> {
  //   socket.current= socketio(`http://localhost:5000`, {withCredentials:true})
  //   socket.current.on('getMessage', (data:any)=> {
  //     setMessages([...messages, data.message])
  // })
  // },[messages])

  useEffect(()=> {
    const sid = searchParams.get("sid")
    const ownerid = searchParams.get("oid")
    setSitterId(sid!)
    setOwnerId(ownerid)
    // socket.current.emit('identity', sid)
  }, [])
  return (
    <>
        <h1 className='text-2xl p-10'>sitterID: {sitterId}</h1>
        <h1 className='text-2xl p-10'>ownerID: {ownerId}</h1>
        <input value={input} className='border-2 border-black p-2 m-5' onChange={(e:any)=> setInput(e.target.value)}type='text'/>
        <button onClick={handleSendBtn}>enviar</button>
        <div className='min-h-[300px] w-full bg-slate-300'>
        {
          messages.map((e:any, index:any)=> 
            <div  key={index}>Message: {e}</div> 
          )
        }
        </div>
    </>
  )
}

export default Sitters