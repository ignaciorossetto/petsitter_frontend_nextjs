"use client"
import { UserContext } from '@/hooks/auth/authContext';
import { faPaw, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Conversation from './Conversation';
import Message from './Message';
import { io } from 'socket.io-client';

const Messenger = () => {
    const {user} = useContext(UserContext)
    const searchParams = useSearchParams();
    const [messages, setMessages] = useState<any>(null)
    const [selectedConv, setSelectedConv] = useState<any>(null)
    const router = useRouter()
    const [conversationsArray, setConversationsArray] = useState<any>(null)
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [loadingConversationsMenu, setLoadingConversationsMenu] = useState(false)
    const [msgBox, setMsgBox] = useState('')
    const handleSendMsg = async() => {
        const obj = {
            conversationId: selectedConv,
            sender: user._id,
            text: msgBox
        }
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`, obj, {withCredentials:true})
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
        setSelectedConv(cid)
        fetchConversations()
    }, [])

    useEffect(()=> {
        if(selectedConv){
            fetchMessages()
        }

    },[selectedConv])







  return (
    <section className='w-full h-[80vh] flex'>
    <div className='w-[35%] h-full bg-violet-200 p-10 flex flex-col gap-4'>
        <h1 className='text-2xl text-center font-medium mb-5'>Últimos chats</h1>

        {
         !loadingConversationsMenu ?
        conversationsArray?.map((e:any)=>
             <Conversation key={e._id} conv={e} selectedConv={selectedConv} setSelectedConv={setSelectedConv} sitterID={e?.members.filter((e:any)=> e !== user._id)}/>
        ) : 
        <div className='flex justify-center items-center'>
            <FontAwesomeIcon icon={faSpinner} spin className='h-16 w-16 mt-20'/>
        </div>
    }
    </div>
    <div className='w-[65%] bg-violet-300 p-10 flex flex-col gap-4'>
        <div className='w-full h-[85%] bg-violet-100 rounded-2xl shadow-2xl flex flex-col overflow-scroll overflow-x-hidden'>

        { !loadingMessages ? 
            messages?.map((element:any, index:any)=> 
                <Message key={element._id} message={element}/>
            )
            :
            <div className='flex mt-20 justify-center items-center'>

            <FontAwesomeIcon icon={faSpinner} spin className='w-16 h-16'/>
            </div>
        }

        </div>
        <div className='w-full h-[15%] flex gap-3'>
            <input value={msgBox} onChange={(e)=>setMsgBox(e.target.value)} type='text' name='message' className='w-[80%] bg-white rounded-2xl shadow-2xl p-5 text-lg font-medium'/>
            <div onClick={handleSendMsg} className='flex w-[20%] h-full bg-lime-300/75 rounded-2xl shadow-2xl p-5 justify-center items-center hover:scale-110 duration-200 cursor-pointer'>
                <FontAwesomeIcon icon={faPaw} className='text-orange-800 w-8 h-8'/>
            </div>
        </div>
    </div>
</section>
  )
}

export default Messenger