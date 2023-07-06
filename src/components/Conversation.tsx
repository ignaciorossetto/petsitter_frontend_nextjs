"use client"
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Conversation = ({conv, selectedConv, setSelectedConv, sitterID}:any) => {
    const [sitterInfo, setSitterInfo] = useState<any>(null)
    const fetchSitterInfo = async() => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conversations/user/friend/${sitterID}`, {withCredentials:true})
            setSitterInfo(response?.data)   
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        fetchSitterInfo()
    }, [])


  return (
    <div onClick={()=>setSelectedConv(conv._id)} className={`md:p-5 md:w-full ${conv._id === selectedConv ? ' md:bg-violet-700 text-white font-bold' : 'md:bg-violet-300 text-black hover:scale-110'} rounded-2xl flex gap-4 items-center font-semibold duration-100 cursor-pointer `}>
                <div className='min-w-[80px] min-h-[80px] relative flex justify-center items-center'>
                    <Image src={'/maria.jpg'} content='cover' fill={true} alt='img' className={`${conv._id === selectedConv ? ' border-violet-700 border-4 scale-110 sm:border-none sm:scale-100' : 'border-violet-300 border-4 sm:border-none '}text-center  md:border-none rounded-[100px]`}/>  
                </div>
                <h2 className='hidden md:block' >{sitterInfo?.username}</h2>
    </div>
  )
}

export default Conversation