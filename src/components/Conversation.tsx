"use client"
import { UserContext } from '@/hooks/auth/authContext'
import { ConversationPropsType, ConversationType } from '@/types/types'
import { getConversationInfo } from '@/utils/axiosRequests'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'




const Conversation = ({type, conv, selectedConv, setSelectedConv, receiverID, setSelectedReceiver}:ConversationPropsType) => {
    
    const {setReceiver} = useContext(UserContext)
    const [convInfo, setConvInfo] = useState<any>(null)
    const fetchSitterInfo = async(url:string) => {
        try {
            const jwt = localStorage.getItem('psf-jwt')
            const data = await getConversationInfo(jwt, url, receiverID)
            setConvInfo(data)   
        } catch (error) {
            throw new Error()
        }
    }
    useEffect(()=> {
        if (type==='sitter') {
            fetchSitterInfo('/sitter/user/')
            return
        }
        fetchSitterInfo('/user/sitter/')
    }, [])


  return (
    <div 
        onClick={()=>{
            setSelectedConv(conv?._id);
            setSelectedReceiver(convInfo);
            setReceiver(convInfo)
            }} 
        className={`p-5 w-[91%] sm:w-full bg-white/20 sm:bg-transparent
        ${conv._id === selectedConv ? 

        `${type==='sitter' ? 
                'bg-white/80 sm:bg-transparent lg:bg-white text-black' 
                : 'lg:bg-violet-700 text-white'} scale-110 text-lg font-bold` 

        : `${type==='sitter' ? 
                'lg:bg-green-800/80' 
                : 'lg:bg-violet-300'} text-black `}  

        hover:scale-110 flex gap-4 justify-start sm:justify-center lg:justify-start sm:rounded-2xl items-center font-semibold duration-100 cursor-pointer `}>
                <div className='relative min-w-[80px] min-h-[80px] flex justify-center items-center'>
                    {
                        !convInfo?.profileImg && <FontAwesomeIcon icon={faUser} size='xl' 
                        className={`
                        ${conv._id === selectedConv ? 
                            'p-4 border-violet-800 border-4 scale-110 lg:border-none lg:scale-100' 
                            : ' p-4 border-violet-300 border-4 lg:border-none '}
                            text-center  rounded-[100px] object-cover`}/>
                    }
                    {
                        convInfo?.profileImg && 
                    <Image src={convInfo?.profileImg} fill={true}   alt='img' className={`${conv._id === selectedConv ? ' border-violet-800 border-4 scale-110 lg:border-none lg:scale-100' : 'border-violet-300 border-4 lg:border-none '}text-center  lg:border-none rounded-[100px] object-cover`}/>  
                     }
                </div>
                <h2 className='block sm:hidden lg:block  break-all' >{convInfo?.username}</h2>
                <br />
    </div>
  )
}

export default Conversation