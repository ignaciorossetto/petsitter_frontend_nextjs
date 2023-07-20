"use client"
import { UserContext } from '@/hooks/auth/authContext';
import { faArrowLeft, faPaw, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Conversation from './Conversation';
import Message from './Message';


const SitterMessenger = () => {
    const {user, socket} = useContext(UserContext)
    const searchParams = useSearchParams();
    let [messages, setMessages] = useState<any>([])
    let [arrivalMessage, setArrivalMessage] = useState<any>(null)
    const [selectedConv, setSelectedConv] = useState<any>(null)
    const [selectedReceiver, setSelectedReceiver] = useState<any>(null)
    const router = useRouter()
    const [conversationsArray, setConversationsArray] = useState<any>(null)
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [loadingConversationsMenu, setLoadingConversationsMenu] = useState(false)
    const [msgBox, setMsgBox] = useState('')
    const scrollRef = useRef<any>()

    useEffect(()=> {
        scrollRef.current?.scrollIntoView(
        {
            behavior: 'smooth',
        })
    }, [messages])




    useEffect(()=> {

        socket.current.on('getMessage', (data:any)=>{
            setArrivalMessage({
                sender:data?.senderId,
                text: data?.message,
                createdAt: Date.now()
            })
        })
      },[socket])

      // Conditions to set displayed messages
    useEffect(()=> {
        if (arrivalMessage !== null && arrivalMessage.sender === selectedReceiver?._id) {
            setMessages((prev:any)=> [...prev, arrivalMessage])
        }
    },[arrivalMessage, selectedConv,selectedReceiver])

    const handleSendMsgEnter = async(e:any) => {
        if (e.key !== 'Enter') {
            return
        }
        const obj = {
            conversationId: selectedConv,
            sender: user._id,
            text: msgBox
        }
        const socketObj = {
            senderId: user._id,
            otherUserId: selectedReceiver?._id,
            message: msgBox
        }
        try {
            socket.current.emit('sendMessage', socketObj)
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`, obj, {withCredentials:true})
            setMessages([...messages, obj])
        } catch (error) {
            console.log(error)
        }
        setMsgBox('')
    }

    const handleSendMsg = async(e:any) => {
        const obj = {
            conversationId: selectedConv,
            sender: user._id,
            text: msgBox
        }
        const socketObj = {
            senderId: user._id,
            otherUserId: selectedReceiver?._id,
            message: msgBox
        }
        try {
            socket.current.emit('sendMessage', socketObj)
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`, obj, {withCredentials:true})
            setMessages([...messages, obj])
        } catch (error) {
            console.log(error)
        }
        setMsgBox('')
    }

    const fetchConversations = async() => {
        setLoadingConversationsMenu(true)
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conversations/user/current/${user._id}`, {withCredentials:true})
                setConversationsArray(response.data)
                setLoadingConversationsMenu(false)
            } catch (error) {
                router.push('/error?code=1')
                setLoadingConversationsMenu(false)
            }

    }

    const fetchMessages = async() => {
        setLoadingMessages(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/${selectedConv}`, {withCredentials:true})
            setMessages(response.data)
            setLoadingMessages(false)
        } catch (error) {
            router.push('/error?code=1')
            setLoadingMessages(false)
        }
    }
    useEffect(()=> {
        const cid = searchParams.get("cid") || null
        const sid = searchParams.get("sid") || null
        fetchConversations()
        setSelectedReceiver({_id:sid})
        setSelectedConv(cid)
    }, [])

    useEffect(()=> {
        if(selectedConv){
            console.log('here')
            fetchMessages() 
        }

    },[selectedConv])




  return (
    <section className='w-full h-[80vh] flex justify-center'>
    <div className={`${!selectedConv ? 'flex' : 'hidden'} w-full sm:w-[35%] h-full bg-gradient-to-tr from-lime-500 to-emerald-700  py-3 sm:p-10 sm:flex flex-col items-center gap-4`}>
        <h1 className='text-3xl text-center font-medium mb-5 text-white'>Últimos chats</h1>

        {
         !loadingConversationsMenu ?
        conversationsArray?.map((e:any, index:any)=>
             <Conversation type='sitter' key={index} conv={e}  setSelectedReceiver={setSelectedReceiver} selectedConv={selectedConv} setSelectedConv={setSelectedConv} receiverID={e?.members.filter((e:any)=> e !== user?._id)}/>
        ) : 
        <div className='flex justify-center items-center'>
            <FontAwesomeIcon icon={faSpinner} size='2xl' spin className='h-16 w-16 mt-20'/>
        </div>
    }
    </div>

    <div className={`${selectedConv ? 'flex' : 'hidden'} sm:flex w-full sm:w-[65%] sm:bg-gradient-to-tr from-lime-400 to-emerald-300 sm:p-10 flex-col gap-4 `}>
        <div className='flex sm:hidden gap-5 justify-between pb-5'>
            <FontAwesomeIcon icon={faArrowLeft} size='xl' className='hover:scale-110 duration-200 cursor-pointer' onClick={()=>setSelectedConv(null)}/> 
            <h1 className='font-bold text-xl'>{selectedReceiver?.username}</h1>

        </div>
        <div className='w-full h-[85%] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-scroll overflow-x-hidden'>

        { !loadingMessages ? 
            messages?.map((element:any, index:any)=> 
                <Message key={index} message={element} scrollRef={scrollRef} selectedReceiver={selectedReceiver}/>
            )
            :
            <div className='flex mt-20 justify-center items-center'>

            <FontAwesomeIcon icon={faSpinner} size='2xl' spin className='w-16 h-16'/>
            </div>
        }

        </div>
        <div className='w-full h-[15%] flex gap-3 relative '>
            <input value={msgBox} onKeyDown={handleSendMsgEnter} placeholder='Escribe aqui....' onChange={(e)=>setMsgBox(e.target.value)} type='text' name='message' className='w-full sm:w-[80%] p-2 bg-white sm:rounded-2xl shadow-2xl sm:p-5 text-lg font-medium'  />
            <div onClick={handleSendMsg} className='absolute top-5 right-0 sm:relative sm:top-auto sm:right-auto sm:flex w-[50px] sm:w-[20%] sm:h-full bg-white rounded-full mr-2 mb-2 sm:m-0 shadow-2xl p-2 sm:p-5 justify-center items-center hover:scale-105 sm:hover:scale-110 duration-200 cursor-pointer'>
                <FontAwesomeIcon icon={faPaw} className='text-orange-800 w-8 h-8 absolut '/>
            </div>
        </div>
    </div>
</section>
  )
}

export default SitterMessenger