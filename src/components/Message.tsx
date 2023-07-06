import { UserContext } from '@/hooks/auth/authContext'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'

const Message = ({message}:any) => {
  const {user} = useContext(UserContext)
  return (
    <div className={`p-5 ${user?._id === message?.sender ? 'self-end' : 'self-start'} flex ${user?._id === message?.sender && 'flex-row-reverse'} gap-3 items-end`}>
                <div className={`h-fit w-fit ${user?._id === message?.sender ? 'bg-white' : 'bg-green-200/75'} rounded-full p-2 sm:p-4`}>IMG</div>
                <div className={`${user?._id === message?.sender ? 'text-end' : 'text-start'} `}
                >{message?.text}.</div>
    </div>
  )
}

export default Message