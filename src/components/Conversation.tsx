"use client"
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Conversation = ({conv, selectedConv, setSelectedConv, sitterID}:any) => {
    const [sitterInfo, setSitterInfo] = useState<any>(null)
    const fetchSitterInfo = async() => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conversations/user/friend/${sitterID}`, {withCredentials:true})
            console.log(response.data)
            setSitterInfo(response?.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        fetchSitterInfo()
    }, [])


  return (
    <div onClick={()=>setSelectedConv(conv._id)} className={`p-5 ${conv._id === selectedConv ? 'bg-violet-700 text-white font-bold' : 'bg-violet-300 text-black hover:scale-110'} rounded-2xl flex gap-4 items-center font-semibold duration-100 cursor-pointer `}>
                <Image src={'/maria.jpg'} width={80} height={80} content='cover' alt='img' className='rounded-[100px]'/>  
                <h2>{sitterInfo?.username}</h2>
    </div>
  )
}

export default Conversation