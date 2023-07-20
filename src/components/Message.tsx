import { UserContext } from '@/hooks/auth/authContext'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useContext } from 'react'
import {format} from 'timeago.js'

const Message = ({message, scrollRef}:any) => {
  const {user, receiver} = useContext(UserContext)
  return (
    

    <>
    <div className={`p-5 ${user?._id === message?.sender ? 'self-end' : 'self-start'} flex ${user?._id === message?.sender && 'flex-row-reverse'} gap-3 items-end`}>          
    
                {
                  user?._id === message?.sender &&
                  
                  <div className='h-[50px] w-[50px] rounded-full relative'>
                    {
                      receiver?.profileImg && 
                    <Image alt='profileImg' src={user?.profileImg} fill className='absolut object-cover rounded-full'/> 
                    }
                    {
                      !receiver?.profileImg && <FontAwesomeIcon icon={faUser} className='h-[35px] w-[35px]'/> 
                    }
                  </div>
                }
                {
                  user?._id !== message?.sender && 
                  <div className={`h-[50px] w-[50px] rounded-full relative ${!receiver?.profileImg && 'bg-violet-300'} flex items-center justify-center `}>
                    {
                      receiver?.profileImg && 
                      <Image alt='profileImg' src={receiver?.profileImg} fill className='absolut object-cover rounded-full'/> 
                    }
                    {
                      !receiver?.profileImg && <FontAwesomeIcon icon={faUser} className='h-[35px] w-[35px]'/> 
                    }
                  
                  </div>
                }
                <div className={`${user?._id === message?.sender ? 'text-end' : 'text-start'} `}
                >{message?.text}.</div>
                
                
                <div ref={scrollRef} />
    
    </div>
    <div className={` px-3 mt-[-7px] ${user?._id === message?.sender ? 'self-end' : 'self-start'} ${user?._id === message?.sender && 'flex-row-reverse'} italic text-slate-400 `}>{format(message?.createdAt)}...</div>
    </>
  )
}

export default Message